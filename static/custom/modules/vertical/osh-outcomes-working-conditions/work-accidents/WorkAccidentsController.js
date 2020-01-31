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

var resolution = screen.width;

define(function (require) {
  'use strict';


  function controller($scope, $stateParams, $state, configService, $log, $document,dataService, $window, $sce, $compile, $timeout, dvtUtils, WorkAccidentsService) {


    // CDA
    $scope.cdaOSHOutcomes = configService.getOshOutcomesWorkingConditionsCda();
    $scope.cdaGenericInformation = configService.getGenericInformationCda();

    var i18n = require('json!vertical/osh-authorities/i18n');
    var i18nLiterals = configService.getLiterals();
    $scope.i18n = i18n;
    $scope.i18nLiterals = i18nLiterals;

    // Datasets
    $scope.datasetList = configService.getDatasets();
    $scope.datasetEurostat = $scope.datasetList.EUROSTAT;
    $scope.datasetEurostat2016 = $scope.datasetList.EUROSTAT2016; 
    $scope.datasetEurostatBetweenDates = $scope.datasetList.EUROSTATBetweenDates;

    $scope.countriesDataFor = [];
    $scope.countriesCompareWith = [];

    $scope.indicators = [];

    $scope.country1Data = {};
    $scope.country2Data = {};

    // Country parameters
    $scope.pCountry1 = ($stateParams.pCountry1 != null)?$stateParams.pCountry1:'AT';
    $scope.pCountry2 = ($stateParams.pCountry2 != null)?$stateParams.pCountry2:'BE';
    $scope.pIndicator = $stateParams.pIndicator;

    var resolution = window.resolution;

    $scope.orientation = resolution > 768 ? "vertical" : "horizontal";
    $scope.axisSize = resolution > 768 ? 150 : (resolution > 480 ? 160 : 120);
    $scope.axisSizeSmaller = resolution > 768 ? 150 : (resolution > 480 ? 110 : 100);

    /*$(window).on("resize",function(e){
      e.preventDefault();
      $log.warn(resolution);
      if(resolution != screen.width){
        $log.warn('Resolución ha cambiado!');
        resolution = screen.width;
        $state.reload();
      }
    });*/

    /*$(window).on("resize",function(e){
      if(screen.width != resolution){
        resolution = screen.width;
        $state.reload();
      }
    });*/

    $(window).on("resize",function(e){
      if( window.outerWidth != resolution){
        resolution = window.resolution;
        //$log.warn('Resolucion ha cambiado');
        //$log.warn(window);
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

    // Conditional criteria
    var normalModeCriteriaText = function (dataset) {
      return dataset.datum.atoms.category2.value != -1?
        dataset.datum.atoms.category2.value.split("~")[0]
        : dataset.datum.atoms.category.value;        }

    var maxModeCriteriaText =  function(dataset) {
      return dataset.datum.atoms.category.value
    }

    $scope.getMin = function f(cdaData) {
      var minTrunc = 0;

      for (var i = 0; i < cdaData.resultset.length; i++)
      {
        var value = cdaData.resultset[i][2];
        if (minTrunc == 0)
        {
          minTrunc = Math.trunc(value/20);
        }
        else if (Math.trunc(value/20) < minTrunc)
        {
          minTrunc = Math.trunc(value/20);
        }
      }

      // The CCC chart options object
      var options = this.chartDefinition;

      // Don't force _0_ to be added to the domain
      options.orthoAxisOriginIsZero = false;

      // Whatever are the real domain bounds, 
      // show this extent in the ortho axis.
      // You _can_ set these to any values calculated from _cdaData_.
      options.orthoAxisFixedMin = minTrunc*20 < 60 ? minTrunc*20 : 60;

      return cdaData;
    }

    $scope.stories = [
      //0 - Non-fatal work accidents first chart
      {
        color1: dvtUtils.getColorCountry(1),
        color2: dvtUtils.getColorCountry(2),
        color3: dvtUtils.getEUColor(),
        plots: WorkAccidentsService.getNonFatalAccidentsMainPlots($scope.pCountry1),
        dimensions: {
          value: {
            format: {
              number: "0.#",
              percent: "#%"
            }
          }
        }
        //labelTextAlign: 'left'
      },
      //1 - Non-fatal work accidents second chart
      {
        color1: dvtUtils.getColorCountry(2),
        color2: dvtUtils.getEUColor(),
        plots: WorkAccidentsService.getNonFatalAccidentsMainPlots($scope.pCountry2),
        //labelTextAlign: 'left'
        dimensions: {
          value: {
            format: {
              number: "0.#",
              percent: "#%"
            }
          }
        }
      },
      //2 - Fatal work accidents and level of reporting of non-fatal
      {
        color1: dvtUtils.getColorCountry(2),
        color2: dvtUtils.getEUColor(),
        plots: WorkAccidentsService.getFatalAccidentsMainPlots(),
        dimensions: {
          value: {
            format: {
              number: "0.#"
            }
          }
        }
      },
      //3 - Non-fatal accidents per workers
      {
        color1: dvtUtils.getColorCountry(2),
        color2: dvtUtils.getAccidentsColors(4),
        plots: WorkAccidentsService.getEstimationNonFatalAccidentsPlots(),
        calculations: WorkAccidentsService.getBarDotCalculations(),
        dimensions: {
          value: {
            format: {
              number: "0.#"
            }
          }
        }
      }
    ];

    $scope.step = {
      chart1: 20,
      chart2: 20,
      chart3: 1,
      chart4: 1000,
      chart5: 20
    }

    /******************************************************************************|
    |                                DATA LOAD                                     |
    |******************************************************************************/
      dataService.getNonFatalAccidentsCountries().then(function (data) {
        data.data.resultset.map(function (elem) {
          if(elem[1] != $scope.pCountry2){
              $scope.countriesDataFor.push({
              country: elem[0],
              country_code: elem[1]
            });
          }

          if(elem[1] != $scope.pCountry1){
            $scope.countriesCompareWith.push({
              country: elem[0],
              country_code: elem[1]
            });
          }
        });
      }).catch(function (err) {
          throw err;
      });

      dataService.getWorkAccidentsIndicators().then(function (data) {
        data.data.resultset.map(function (elem) {
          if(elem[0] == 55){
            $scope.indicators.push({
              id: elem[0],
              anchor: i18nLiterals['L20707'].toLowerCase().replace(/[\,\ ]/g, '-'),
              text: '20707'
            });
          }else{
            $scope.indicators.push({
              id: elem[0],
              anchor: i18nLiterals['L'+elem[1]].toLowerCase().replace(/[\,\ ]/g, '-'),
              text: elem[1]
            });
          }
        });
        //$log.warn($scope.indicators);
      }).catch(function (err) {
          throw err;
      });

    /******************************END DATA LOAD***********************************/

    /******************************************************************************|
    |                                 FILTERS                                      |
    |******************************************************************************/
      $scope.countryChange = function () {
        if ($state.current.name !== undefined) {
          $scope.dashboard.parameters = {
            "pCountry1": $scope.pCountry1,
            "pCountry2": $scope.pCountry2
          };

          $state.transitionTo('work-accidents', {
            pCountry1: $scope.pCountry1, 
            pCountry2: $scope.pCountry2
          }, {reload: true});


          //$state.go($state.current.name, {
            //pCountry1: $scope.pCountry1,
            //pCountry2: $scope.pCountry2,
            /*pIndicator: $scope.pIndicator
          });*/
        }
      };

    /******************************END FILTERS************************************/

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
            angular.element('.submenu--items--wrapper').addClass('open-list');
          } else {

            angular.element('.submenu--items--wrapper').removeClass('open-list');
          }
        }
      }

      $('body').on('click touchstart', function(e) {
        var container = angular.element('.submenu--items--wrapper');
        if (!container.is(e.target) && container.has(e.target).length === 0){
          angular.element('.submenu--items--wrapper').removeClass('open-list'); 
        }
      });


      $scope.changeIndicator = function(e,indicator) {
        //$scope.openIndicatorsList(e);
        if ($state.current.name !== undefined) {
          $state.go($state.current.name, {
            pIndicator: indicator,
            pCountry1: null,
            pCountry2: null
          });
        }
      }

  }

controller.$inject = ['$scope', '$stateParams', '$state', 'configService', '$log', '$document','dataService', '$window', '$sce', '$compile', '$timeout', 'dvtUtils', 'WorkAccidentsService'];
  return controller;


});
