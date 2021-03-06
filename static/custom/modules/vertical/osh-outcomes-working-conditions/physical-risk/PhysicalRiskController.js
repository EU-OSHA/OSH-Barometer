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


  function controller($scope, $stateParams, $state, configService, $log, $document,dataService, $window, $sce, $compile, $timeout, dvtUtils, PhysicalRiskService, exportService, $rootScope) {


    // CDA
    $scope.cdaOSHOutcomes = configService.getOshOutcomesWorkingConditionsCda();

    var i18nLiterals = configService.getLiterals();
    $scope.i18nLiterals = i18nLiterals;

    // Datasets
    $scope.datasetList = configService.getDatasets();
    $scope.datasetEurofound = $scope.datasetList.Eurofound;
    $scope.datasetESENER = $scope.datasetList.ESENER;

    $scope.countriesDataFor = [];
    $scope.countriesCompareWith = [];    

    $scope.indicators = [{
      anchor: 'vibrations-loud-noise-and-temperature', 
      text: '20654'
    },
    {
      anchor: 'exposure-to-dangerous-substances',
      text: '20655'
    },
    {
      anchor: 'risks-involve-with-work',
      text: '20656'
    }];

    $scope.subIndicators = [{
      anchor: 'smoke-powder-or-dust', 
      text: '328'
    },
    {
      anchor: 'vapours',
      text: '329'
    },
    {
      anchor: 'chemical-products',
      text: '330'
    }, {
      anchor: 'infectious-materials',
      text: '331'
    }];
  
    $scope.pIndicator = $stateParams.pIndicator;
    $scope.pSubIndicator = $stateParams.pSubIndicator;
    $scope.pCountry1 = $stateParams.pCountry1 != "UK" ? $stateParams.pCountry1 : $rootScope.defaultCountry.code;
    $scope.pCountry2 = $stateParams.pCountry2 != "UK" ? $stateParams.pCountry2 : 0;
    $scope.pFilter = $stateParams.pFilter;

    var resolution = window.resolution;
    $scope.resolution = resolution;

    $scope.angle = resolution > 768 ? 1 : 0;
    $scope.horizontalHeight = resolution > 768 ? 470 : 770;
    $scope.orientation = resolution > 768 ? "vertical" : "horizontal";
    $scope.axisSize = resolution > 768 ? 150 : 110;
    $scope.query = resolution > 768 ? 'getPhysicalRiskVerticalData' : 'getPhysicalRiskHorizontalData';
    $scope.color1 = resolution > 768 ? dvtUtils.getColorCountry(22) : dvtUtils.getColorCountry(1);
    $scope.color2 = resolution > 768 ? dvtUtils.getColorCountry(1) : dvtUtils.getColorCountry(22);

    $scope.selectCountryQuery = $scope.pSubIndicator=='ewcs'?"getEurofoundRisksCountries":"getESENERRisksCountries";
    $scope.selectCountryDataset = $scope.pSubIndicator=='ewcs'?$scope.datasetEurofound:$scope.datasetESENER;

    $(window).on("resize",function(e){
      if( window.outerWidth != resolution){
        resolution = window.resolution;
        $state.reload();
      }
    });

    $scope.dashboard = {};
    $scope.dashboard = {
      parameters: {
          "pCountry1": $scope.pCountry1,
          "pCountry2": $scope.pCountry2
      }
    };

    $scope.relatedItems = {
      "exposure-to-dangerous-substances":[{
          title: "L320",
          text: "L22054",
          link: "osh-culture({pIndicator:'use-of-personal-protective-equipment'})",
          icon: "culture"
        }]
    };

    // Conditional criteria
    var normalModeCriteriaText = function (dataset) {
      return dataset.datum.atoms.category2.value != -1?
        dataset.datum.atoms.category2.value.split("~")[0]
        : dataset.datum.atoms.category.value;        }

    var maxModeCriteriaText =  function(dataset) {
      return dataset.datum.atoms.category.value
    }

    $scope.stories = [
      //0 - Vibrations, loud noise and temperature and Exposure to dangerous substances
      {
        plots: PhysicalRiskService.getInfoAboutRisksData(),
        promises: {
          story1: [
            dataService.getCountry1VibrationData(20049, $scope.pCountry1), 
            dataService.getCountry2VibrationData(20049, $scope.pCountry2),
            dataService.getEU28VibrationData(20049)           
          ]
        },
        dimensions: {
          value: {
            format: {
              number: "0.#",
              percent: "#%"
            }
          }
        }
      },
      //1 -  Risks Involved in work
      {
        promises: {
          story1: [
            dataService.getCountryRisksInvolvedEurofoundData(20080, $scope.pCountry1), 
            dataService.getCountryRisksInvolvedEurofoundData(20080, $scope.pCountry2),
            dataService.getEU28RisksInvolvedEurofoundData(20080)           
          ],
          story2: [
            dataService.getCountryRisksInvolvedESENERData($scope.datasetESENER, $scope.pCountry1), 
            dataService.getCountryRisksInvolvedESENERData($scope.datasetESENER, $scope.pCountry2),
            dataService.getEU28RisksInvolvedESENERData($scope.datasetESENER)            
          ]
        }
      }
    ];

    $scope.step = 20;

    // Show/hide the Countries Filter List
    angular.element('div.countries-filters').css( "display",'none' );
    angular.element('#filter2 h2').addClass('showChallenges');
    $scope.toggleFilters = function() {
      if ($window.outerWidth < 768) {
            angular.element('#filter2 h2').toggleClass('showChallenges');
            angular.element('div.countries-filters').slideToggle( "slow" );
        }
    };

    // Show/hide the Countries Filter List
    angular.element('div.countries-filters').css( "display",'none' );
    angular.element('#filter2 h2').addClass('showChallenges');
    $scope.toggleFilters = function() {
      if ($window.outerWidth < 768) {
            angular.element('#filter2 h2').toggleClass('showChallenges');
            angular.element('div.countries-filters').slideToggle( "slow" );
        }
    }

    // Open indicators list like a select element

    $(window).on("resize",function(e){
      resolution = $(window).width();
    });
      resolution = $(window).width();

    $scope.openIndicatorsList = function(e) {    
      if( resolution < 990 ){
        //var parentTag = e.target.offsetParent.nextSibling.parentNode.className;          
        var parentNode = e.target.parentElement.nodeName;  
     
        if( parentNode == "LI"){
          var parentTag = e.target.parentElement.parentElement.className;
        } else {
          var parentTag = e.target.parentElement.className;
        }

        if( parentTag.indexOf('open-list') < 0 ){

          if(parentTag.indexOf('level2') < 0){
            angular.element('.level1').addClass('open-list');
          } else {
            angular.element('.level2').addClass('open-list');
          }

        } else {
          if(parentTag.indexOf('level2') < 0){
            angular.element('.level1').removeClass('open-list');
          } else {
            angular.element('.level2').removeClass('open-list');
          }            
        }
      }
    }

    $('body').on('click touchstart', function(e) {
      var container = angular.element('.submenu--items--wrapper');
      if (!container.is(e.target) && container.has(e.target).length === 0){
        angular.element('.submenu--items--wrapper').removeClass('open-list'); 
      }
    });


    $scope.changeIndicator = function(e,indicator, subIndicator, pChangeRoot) {
      //$scope.openIndicatorsList(e);
      if ($state.current.name !== undefined) {

        if (pChangeRoot)
        {
          if (!$rootScope.defaultCountry.isCookie)
          {
            $rootScope.defaultCountry.code = $scope.pCountry1;
          }

          if ($scope.pCountry2 != "0")
          {
            $rootScope.defaultCountry2 = {
              code: $scope.pCountry2,
              isCookie: 0
            }
          }  
        }          

        if(indicator == 'exposure-to-dangerous-substances'){
          $state.go('physical-risk-exposure-to-dangerous-substances', {
            pIndicator: indicator,
            pSubIndicator: subIndicator,
            pFilter: $scope.pFilter,
            pCountry1: $scope.pCountry1, 
            pCountry2: $scope.pCountry2
          });
        }else if(indicator == 'vibrations-loud-noise-and-temperature'){
          $state.go('physical-risk-vibrations-loud-noise-and-temperature', {
            pIndicator: indicator,
            pSubIndicator: subIndicator,
            pFilter: $scope.pFilter,
            pCountry1: $scope.pCountry1, 
            pCountry2: $scope.pCountry2
          });
        }else{
          $state.go('physical-risk-risks-involved-with-work', {
            pIndicator: indicator,
            pSubIndicator: subIndicator,
            pFilter: $scope.pFilter,
            pCountry1: $scope.pCountry1, 
            pCountry2: $scope.pCountry2
          });
        }
      }
    }

    $scope.changeSplit = function(){
      $('.card--block--chart--wrapper').css('visibility','hidden');
      if ($state.current.name !== undefined) {
        $state.transitionTo('physical-risk-risks-involved-with-work', {
          pIndicator: $scope.pIndicator,
          pSubIndicator: $scope.pSubIndicator,
          pFilter: $scope.pFilter,
          pCountry1: $scope.pCountry1, 
          pCountry2: $scope.pCountry2,
        }, {reload: true});
      }
    }

    $scope.exportData = function(promises, title, id){
      exportService.exportRadarData(promises, title, id);
    }

    $scope.datasetMethodology = function()
    {
      if ($scope.pIndicator == "risks-involve-with-work")
      {
        if ($scope.pFilter == "esener")
        {
          return 'ESENER';
        }
        else
        {
          return 'European Working Conditions Survey (EWCS)';
        }
      }
    }
  }

controller.$inject = ['$scope', '$stateParams', '$state', 'configService', '$log', '$document','dataService', '$window', '$sce', '$compile', '$timeout', 'dvtUtils', 'PhysicalRiskService', 'exportService', '$rootScope'];
  return controller;


});
