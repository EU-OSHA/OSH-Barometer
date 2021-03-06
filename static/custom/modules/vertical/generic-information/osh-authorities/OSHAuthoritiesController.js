/**
 * @ngdoc controller
 * @name barometer.generic-information-osh-authorities.controller:OSHAuthoritiesController
 * @requires $scope
 * @requires $stateParams
 * @requires $state
 * @requires $document
 * @description
 * ############################################
 */
define(function (require) {
  	'use strict';

 	function controller($scope, $stateParams, $state, configService, $log, $document,dataService, $window, $sce, $compile, $timeout, $rootScope) 
 	{

		var i18n = require('json!vertical/osh-authorities/i18n');
		var i18nLiterals = configService.getLiterals();
		$scope.i18n = i18n;
		$scope.i18nLiterals = i18nLiterals;

		var i18nSearch = require('json!horizontal/search/i18n');
		$scope.i18nSearch = i18nSearch;
		$scope.i18nSearchPlaceholder = i18nSearch['authorities-search-placeholder'];

		$scope.countries = [];
		$scope.amatrix = [];
		$scope.searchParams = {
	  		institutions:{
				filter1:0,
				filter2:0,
				filter3:0,
				filter4:0
	  		},
	  		countries: [] //countries
		};

		$scope.searchText = '';
		$scope.selectedCountries = [];
		$scope.deleteCountryTags = [];

		//Variables pagination
		$scope.currentPage = 0;
		$scope.pageSize = 5;
		$scope.elementsStart=0;
		$scope.elementsEnd=$scope.pageSize;

		if ($rootScope.defaultCountry.code != undefined && $rootScope.defaultCountry.selectedByUser == true && $rootScope.defaultCountry.code != "UK")
		{
			$scope.pCountry = $rootScope.defaultCountry.code;
		}
		else if ($stateParams.pCountry != "UK")
		{
			$scope.pCountry = $stateParams.pCountry;
		}
				
		$scope.pInstitution = $stateParams.pInstitution;

		/*if ($scope.pCountry != null)
		{
			$scope.searchParams.countries.push($scope.pCountry);
		}*/

		// Pagination Text
		$scope.paginationText = 'Displaying ' + ($scope.elementsStart+1)+'-'+$scope.elementsEnd + ' of ' + $scope.amatrix.length;

		var updateText = function() {
	  		$scope.paginationText = 'Displaying ' + ($scope.elementsStart+1)+'-'+$scope.elementsEnd + ' of ' + $scope.amatrix.length;
		}

		// Open/Hide checkbox dropdown list
		$scope.openSelect = function($event){
	  		var currentSelect = $event.target; 
	  		var nodename = currentSelect.nodeName;
	  		if( nodename == 'LABEL' || nodename == 'INPUT' ){
				currentSelect = $event.target.offsetParent.offsetParent; 
				angular.element(currentSelect).addClass('viewOptions');
		
	  		} else {
				currentSelect = $event.target.offsetParent.offsetParent;
				$scope.checkSelect(currentSelect); 
	  		}
		};

		$scope.checkSelect = function(elem){
	  		if( elem.className.indexOf('viewOptions') > 0 ){
				angular.element(elem).removeClass('viewOptions'); 
	  		} else {
				angular.element('.filter--dropdown--wrapper').removeClass('viewOptions');         
				angular.element(elem).addClass('viewOptions');
	  		}
		};

		$scope.closeSelect = function($event){      
	  		angular.element('.filter--dropdown--wrapper').removeClass('viewOptions');     
		};
		// End Open/Hide checkbox dropdown list

		// Read more
		$scope.trimtext = function(pVal, pNumCharacters)
		{
	  		var shortText = pVal;
		  	var finalHtml = '';
		  	var text = 0;
		  	var newMaxCharacter = pNumCharacters;

		  	if(shortText != null){
				var firstSplit =  shortText.substring(0, newMaxCharacter);

				if(firstSplit.match('<a')){
			  		newMaxCharacter += 150;
				}

				if (shortText.length > pNumCharacters) {

			  		shortText = $.trim(shortText).substring(0, newMaxCharacter).split(" ").slice(0, -1).join(" ") + "<span class='dots'>...</span>";
				}
				return $sce.trustAsHtml(shortText);
		  	}      
		}

		$scope.longText = function(pVal, pNumCharacters) {
	  		var longText = "<samp style='display:none'> " + pVal.split(" ").slice($.trim(pVal).substring(0, pNumCharacters).split(" ").slice(0, -1).length).join(" ") + '</samp>';
	  		return longText;
		}

		$scope.toggleText = function($event) {
	  		if ($(this).is(':visible')) {

				if($event.target.nodeName == "A"){
		  			angular.element('div.complete-text', angular.element($event.target).parent().parent()).toggle();
		  			angular.element('div.partial-text', angular.element($event.target).parent().parent()).toggle();

				  	//Para ocultar los puntos suspensivos del recorte
				  	angular.element(' span.dots', angular.element($event.target).parent().parent()).toggle();
				  	//Para cambiar del boton see more al boton see less
				  	angular.element(' a', angular.element($event.target).parent()).toggle();
				} 				
				else if($event.target.nodeName == "FONT")
				{
			  		angular.element('div.complete-text', angular.element($event.target).parent().parent().parent().parent()).toggle();
			  		angular.element('div.partial-text', angular.element($event.target).parent().parent().parent().parent()).toggle();

			  		//Para ocultar los puntos suspensivos del recorte
			  		angular.element(' span.dots', angular.element($event.target).parent().parent().parent().parent()).toggle();
			  		//Para cambiar del boton see more al boton see less
			  		angular.element(' a', angular.element($event.target).parent().parent().parent()).toggle();

				}
				else if($event.target.nodeName == "I")
				{
				  	angular.element('div.complete-text', angular.element($event.target).parent().parent().parent()).toggle();
				  	angular.element('div.partial-text', angular.element($event.target).parent().parent().parent()).toggle();

			  		//Para ocultar los puntos suspensivos del recorte
			  		angular.element(' span.dots', angular.element($event.target).parent().parent().parent()).toggle();
			  		//Para cambiar del boton see more al boton see less
			  		angular.element(' a', angular.element($event.target).parent().parent()).toggle();
				}
	  		}
		}

		// Show/hide the Countries Filter List

		angular.element('div.countries-filters').css( "display",'none' );
		angular.element('#filter2 h2').addClass('showChallenges');
		$scope.toggleFilters = function() {
		  	if ($window.outerWidth < 768) {
				angular.element('#filter2 h2').toggleClass('showChallenges');
				angular.element('div.countries-filters').slideToggle( "slow" );
			}
		}

		/******************************************************************************|
		|                               PAGINATION                                     |
		|******************************************************************************/
	  	$scope.numberOfPages = function () {
			return Math.ceil($scope.amatrix.length / $scope.pageSize);
	  	};

	  	/**
	   	* @ngdoc method
	   	* @name ng.controller:OSHAuthoritiesController#pagination
	   	* @methodOf barometer.osh-authorities.controller:OSHAuthoritiesController
	   	* @description
	   	* Get an array of all pages to paginate
	  	*/
	  	$scope.pagination = function() {
			$scope.arrayNumPages = [];
			$scope.filterPages = [];
			for(var i=0; i<$scope.numberOfPages();i++){
		  		$scope.arrayNumPages.push(i);
		  		if(i<$scope.maxPageButtons){
					$scope.filterPages.push(i);
		  		}
			}
			return $scope.arrayNumPages;
	  	}

	  	/**
	   	* @ngdoc method
	   	* @name ng.controller:OSHAuthoritiesController#goToPage
	   	* @methodOf barometer.osh-authorities.controller:OSHAuthoritiesController
	   	* @description
	   	* Navigates to a specific page given the pagination index
	  	*/
	  	$scope.goToPage = function($index) {
			$scope.currentPage = $index;
			$scope.elementsStart = $scope.currentPage * $scope.pageSize;
			$scope.elementsEnd= $scope.elementsStart + $scope.pageSize;
	  	}

	  	/**
	   	* @ngdoc method
	   	* @name ng.controller:OSHAuthoritiesController#firstPage
	   	* @methodOf barometer.osh-authorities.controller:OSHAuthoritiesController
	   	* @description
	   	* Go to the first page of the pagination
	   	*/
	  	$scope.firstPage = function () {
			$scope.currentPage = 0;
			$scope.elementsStart=0;
			$scope.pageStart = 0;
			$scope.elementsEnd=$scope.pageSize;
			$scope.pagestart = 10;

			if($scope.elementsEnd>$scope.amatrix.length) {
		  		$scope.elementsEnd=$scope.amatrix.length;
			}
			updateText();
	  	};

	  	/**
	   	* @ngdoc method
	   	* @name ng.controller:OSHAuthoritiesController#previousPage
	   	* @methodOf barometer.osh-authorities.controller:OSHAuthoritiesController
	   	* @description
	   	* Go to the previous page of the pagination
	   	*/
	  	$scope.previousPage = function () {
			$scope.currentPage--;
			$scope.elementsStart=$scope.currentPage * $scope.pageSize;
			$scope.elementsEnd= $scope.elementsStart + $scope.pageSize;
			$scope.pageStart = $scope.elementsStart;
			if($scope.elementsEnd>$scope.amatrix.length) {
		  		$scope.elementsEnd=$scope.amatrix.length;
			}
			updateText();

			//Scroll to top
			$document.scrollTo(0, 0, 0);
	  	};

	  	/**
	   	* @ngdoc method
	   	* @name ng.controller:OSHAuthoritiesController#nextPage
	   	* @methodOf barometer.osh-authorities.controller:OSHAuthoritiesController
	   	* @description
	   	* Go to the next page of the pagination
	   	*/
	  	$scope.nextPage = function () {
			if ($scope.currentPage < $scope.amatrix.length / $scope.pageSize - 1) {
		  		$scope.currentPage++;
		  		$scope.elementsStart=$scope.currentPage * $scope.pageSize;
		  		if($scope.elementsStart + $scope.pageSize<=$scope.amatrix.length) {
					$scope.elementsEnd = $scope.elementsStart + $scope.pageSize;
		  		} else {
					$scope.elementsEnd=$scope.amatrix.length;
		  		}

		  		if($scope.elementsEnd>$scope.amatrix.length) {
					$scope.elementsEnd=$scope.amatrix.length;
		  		}
				$scope.pageStart = $scope.elementsStart;
			}
			updateText();

			//Scroll to top
			$document.scrollTo(0, 0, 0);
	  	};

  		/**
   		* @ngdoc method
   		* @name ng.controller:OSHAuthoritiesController#lastPage
   		* @methodOf barometer.osh-authorities.controller:OSHAuthoritiesController
   		* @description
   		* Go to the last page of the pagination
   		*/
	  	$scope.lastPage = function () {
			var resto= Math.floor($scope.amatrix.length / $scope.pageSize);
			$scope.currentPage=resto;
			if ($scope.currentPage == $scope.numberOfPages()) {
		  		$scope.currentPage --;
			}
			$scope.elementsStart=$scope.currentPage * $scope.pageSize;
			if($scope.elementsStart + $scope.pageSize<=$scope.amatrix.length) {
		  		$scope.elementsEnd = $scope.elementsStart + $scope.pageSize;
			} else {
		  		$scope.elementsEnd=$scope.amatrix.length;
			}

			if($scope.elementsEnd>$scope.amatrix.length) {
		  		$scope.elementsEnd=$scope.amatrix.length;
			}

			$scope.pageStart = $scope.elementsStart;

			updateText();
	  	};

		/*******************************END PAGINATION*********************************/


		/******************************************************************************|
		|                                DATA LOAD                                     |
		|******************************************************************************/
	  	dataService.getMatrixAuthsCountries().then(function (data) {
	  		var countryHasData = false;
			data.data.resultset.map(function (elem) {
		  		var param = (!!$stateParams.filter) ? $stateParams.filter : undefined;
		  		$scope.countries.push({
					country: elem[0],
					country_code: elem[1]
		  		});
		  		if (elem[1] == $scope.pCountry)
		  		{
		  			countryHasData = true;
		  		}
		  		if($scope.pCountry == elem[1]){
					var tags = angular.element('div.selected--tags-wrapper');
					var html = '<span class="selected-tag" id="country'+elem[0] +'" data-ng-click="deleteTag($event)">' + '('+$scope.pCountry+') ' + $scope.i18nLiterals['L'+elem[0]] +'</span>';
					tags.append( $compile(html)($scope) );
		  		}
			});
			if (countryHasData == false && $scope.pCountry != null)
			{
				var index = $scope.searchParams.countries.indexOf($scope.pCountry);
				$scope.searchParams.countries.splice(index, 1);
				$scope.pCountry = "AT";
				$scope.searchParams.countries.push($scope.pCountry);
				var html = '<span class="selected-tag" id="country'+$scope.pCountry+'" data-ng-click="deleteTag($event)">' + '('+$scope.pCountry+') ' + $scope.i18nLiterals['L39'] +'</span>';				
				var tags = angular.element('div.selected--tags-wrapper');
		  		tags.append($compile(html)($scope));
				search(null, 'countries');
			}
	  	}).catch(function (err) {
			throw err;
	  	});

	  	if($scope.pCountry != null){
			$scope.searchParams.countries.push($scope.pCountry);
	  	}

		if($scope.pInstitution != null){
			var tags = angular.element('div.selected--tags-wrapper');
			if($scope.pInstitution == 'osh-authority'){
		  		$scope.searchParams.institutions.filter1 = 1;
		  		var html = '<span class="selected-tag" id="institutionFilter1" data-ng-click="deleteTag($event)" data-ng-bind="i18nLiterals.L20614"></span>';
		  		tags.append( $compile(html)($scope) );
			}else if($scope.pInstitution == 'compensation-and-insurance-body'){
		  		$scope.searchParams.institutions.filter2 = 1;
		  		var html = '<span class="selected-tag" id="institutionFilter2" data-ng-click="deleteTag($event)" data-ng-bind="i18nLiterals.L20611"></span>';
		  		tags.append( $compile(html)($scope) );
			}else if($scope.pInstitution == 'prevention-institute'){
		  		$scope.searchParams.institutions.filter3 = 1;
		  		var html = '<span class="selected-tag" id="institutionFilter3" data-ng-click="deleteTag($event)" data-ng-bind="i18nLiterals.L20612"></span>';
		  		tags.append( $compile(html)($scope) );
			}else if($scope.pInstitution == 'standardisation-body'){
		  		$scope.searchParams.institutions.filter4 = 1;
		  		var html = '<span class="selected-tag" id="institutionFilter4" data-ng-click="deleteTag($event)" data-ng-bind="i18nLiterals.L20613"></span>';
		  		tags.append( $compile(html)($scope) );
			}
	  	}

	  	dataService.getAllMatrixAuthorities($scope.searchParams.countries, $scope.searchParams.institutions).then(function (data) {
			$log.debug('getAllMatrixAuthorities');


			data.data.resultset.map(function (elem) {
		  		var param = (!!$stateParams.filter) ? $stateParams.filter : undefined;
		  		$scope.amatrix.push({
			  		id: elem[0],
			  		country_name: elem[1],
			  		country_code: elem[2],
			  		osh_authority: elem[3],
			  		compensation: elem[4],
			  		prevention: elem[5],
			  		standardisation: elem[6],
			  		name_authority: elem[7],
			  		link_authority: elem[8],
			  		detail_authority: elem[9],
			  		param: param
		  		});

			});

			updateText();

			$scope.readMore = function (pMatrix) {
		  		if (angular.element('div.'+pMatrix).length) {
					if (angular.element('div.'+pMatrix).height() > angular.element('div.'+pMatrix).parent().height()) {
			  			return true;
					} else {
			  			return false;
					}
		  		}
			}
	  	}).catch(function (err) {
		  	throw err;
	  	});

		/******************************END DATA LOAD***********************************/

		/******************************************************************************|
		|                                 FILTERS                                      |
		|******************************************************************************/
	  	/**
   		* @ngdoc method
	   	* @name ng.controller:OSHAuthoritiesController#toogleCountryClick
	   	* @param {$event} $event from the browser
	   	* @param {$index} $index track by ng-repeat
	   	* @methodOf barometer.osh-authorities.controller:OSHAuthoritiesController
	   	* @description
	   	* Function launched after clicking on Country Filter
	   	*/
	  	$scope.toggleCountryClick = function ($event, $index) {
			var element = angular.element($event.currentTarget);
			var tags = angular.element('div.selected--tags-wrapper');
			var valueToJson = JSON.parse(element.attr('value'));
		
			if (element.prop('checked')) {
		  		$scope.searchParams.countries.push(valueToJson.country_code);
		  		if(valueToJson.country_code == 'EU28'){
					var html = '<span class="selected-tag" id="country'+valueToJson.country +'" data-ng-click="deleteTag($event)">'+ $scope.i18nLiterals['L'+valueToJson.country] +'</span>';
		  		}else{
					var html = '<span class="selected-tag" id="country'+valueToJson.country +'" data-ng-click="deleteTag($event)">' + '('+valueToJson.country_code+') ' + $scope.i18nLiterals['L'+valueToJson.country] +'</span>';
				}
		  		tags.append( $compile(html)($scope) );
			} else {
		  		$scope.searchParams.countries.splice($scope.searchParams.countries.indexOf(valueToJson.country_code), 1);
		  		angular.element('span#country'+valueToJson.country).remove();
			}

			search($event,'countries');
	  	};

	  	/**
	   	* @ngdoc method
	   	* @name ng.controller:OSHAuthoritiesController#toggleInstitutionClick
	   	* @methodOf barometer.osh-authorities.controller:OSHAuthoritiesController
	   	* @description
	   	* Function launched when clicking an Institution Filter
	   	*/
	  	$scope.toggleInstitutionClick = function ($event) {

			var check1 = $('#institution-filter-1:checked').length > 0;
			var check2 = $('#institution-filter-2:checked').length > 0;
			var check3 = $('#institution-filter-3:checked').length > 0;
			var check4 = $('#institution-filter-4:checked').length > 0;

			var tags = angular.element('div.selected--tags-wrapper');

			if(check1) {
		  		$scope.searchParams.institutions.filter1=1;
		  		if(angular.element('span#institutionFilter1').length<=0){
					var html = '<span class="selected-tag" id="institutionFilter1" data-ng-click="deleteTag($event)" data-ng-bind="i18nLiterals.L20614"></span>';
					tags.append( $compile(html)($scope) );
		  		}		  
			}else{
		  		$scope.searchParams.institutions.filter1=0;
		  		angular.element('span#institutionFilter1').remove();
			}

			if(check2) {
		  		$scope.searchParams.institutions.filter2=1;
		  		if(angular.element('span#institutionFilter2').length<=0){
					var html = '<span class="selected-tag" id="institutionFilter2" data-ng-click="deleteTag($event)" data-ng-bind="i18nLiterals.L20611"></span>';
					tags.append( $compile(html)($scope) );
		  		}
			}else{
		  		angular.element('span#institutionFilter2').remove();
		  		$scope.searchParams.institutions.filter2=0;
			}

			if(check3) {
		  		$scope.searchParams.institutions.filter3=1;
		  		if(angular.element('span#institutionFilter3').length<=0){
					var html = '<span class="selected-tag" id="institutionFilter3" data-ng-click="deleteTag($event)" data-ng-bind="i18nLiterals.L20612"></span>';
					tags.append( $compile(html)($scope) );
		  		}
			}else{
		  		angular.element('span#institutionFilter3').remove();
	 			$scope.searchParams.institutions.filter3=0;
			}

			if(check4) {
		  		$scope.searchParams.institutions.filter4=1;
		  		if(angular.element('span#institutionFilter4').length<=0){
					var html = '<span class="selected-tag" id="institutionFilter4" data-ng-click="deleteTag($event)" data-ng-bind="i18nLiterals.L20613"></span>';
					tags.append( $compile(html)($scope) );
		  		}
			}else{
		  		angular.element('span#institutionFilter4').remove();
		  		$scope.searchParams.institutions.filter4=0;
			}

			search($event,'institution'); 
	  	};

	  	/**
	   	* @ngdoc method
	   	* @name ng.controller:OSHAuthoritiesController#deleteTag
	   	* @param {$event} $event from the browser
	   	* @methodOf barometer.osh-authorities.controller:OSHAuthoritiesController
	   	* @description
	   	* Deletes the clicked tag and applies the new filters
	   	*/
	  	$scope.deleteTag = function($event){
			var element = angular.element($event.currentTarget);
			var countryName = element[0].id.slice(7,9);
			if (element[0].id.indexOf("country") > -1)
			{
		  		countryName = element[0].id.replace("country","");
			}
			var countryCode = element[0].innerHTML.slice(1,3);

			if(countryCode == 'U2'){
		  		countryCode = 'EU28';
		  		countryName = 264;
			}

			//buscar en el value del input correspondiente al id de literal        
			var quitChecked;
			if($event.target.id.indexOf('country') != -1){
		  		$scope.searchParams.countries.splice($scope.searchParams.countries.indexOf(countryCode), 1);
		  		quitChecked = angular.element('.filter--dropdown--options #country-filter-'+countryName);
			}else if($event.target.id == 'institutionFilter1'){
		  		quitChecked = angular.element('.filter--dropdown--options #institution-filter-1');
		  		$scope.searchParams.institutions.filter1=0;
			}else if($event.target.id == 'institutionFilter2'){
		  		quitChecked = angular.element('.filter--dropdown--options #institution-filter-2');
		  		$scope.searchParams.institutions.filter2=0;
			}else if($event.target.id == 'institutionFilter3'){
		  		quitChecked = angular.element('.filter--dropdown--options #institution-filter-3');
		  		$scope.searchParams.institutions.filter3=0;
			}else if($event.target.id == 'institutionFilter4'){
		  		quitChecked = angular.element('.filter--dropdown--options #institution-filter-4');
		  		$scope.searchParams.institutions.filter4=0;
			}
		
			element.remove();
			quitChecked.prop('checked', false);

			search($event, 'country');		
	  	}

	  	/**
	   	* @ngdoc method
	   	* @name ng.controller:OSHAuthoritiesController#search
	   	* @param {$event} $event from the browser
	   	* @param {filter} type of filter applied
	   	* @methodOf barometer.osh-authorities.controller:OSHAuthoritiesController
	   	* @description
	   	* Apply the filters and load the filtered content
	   	*/
	 	function search($event,filter) {
			dataService.getSearchTerm($scope.searchText, $scope.searchParams.institutions, $scope.searchParams.countries)
		  	 .then(function (data) {
				$scope.amatrix = dataService.dataMapper(data);

				$scope.firstPage();

				$state.transitionTo('osh-authorities', {}, {notify: false});

		  	}).catch(function (err) {
				throw err;
			});
			$scope.currentPage = 0;
	  	}

	    $scope.clickEnter=function($event) {
			if($event.which === 13 || $event.which === 1) {
				search($event, 'country');
		 	}
	  	}

		/******************************END FILTERS************************************/

		/* MODAL FUNCTIONS */
		$scope.openModal = function(matrix){
	  		angular.element('div#modalChart .modal-title').html($scope.i18nLiterals['L'+matrix.country_name]+' infrastructure');
		}

		angular.element('div#modalChart').click(function(text,$index, matrix ) {
	  		angular.element('div#modalChart').modal('hide');
		}).children().click(function(e){
	  		if (!$(e.target).is('a')) {
		  		if (!$(e.target).is('button') && !$(e.target).is('font')) {
			  		if (!$(e.target).parent().is('button') && !$(e.target).parent().hasClass('close')){
				  		return false;
			  		}
	  			}else {
	  				if (!$(e.target).is('button') && !$(e.target).is('font') && !$(e.target).hasClass('close')) {
				  		return false;
			  		}
		  		}
	  		}
		});
  	}

  	controller.$inject = ['$scope', '$stateParams', '$state', 'configService', '$log', '$document','dataService', '$window', '$sce', '$compile', '$timeout', '$rootScope'];
  	return controller;
});