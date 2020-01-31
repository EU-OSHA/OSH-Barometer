/**
 * @ngdoc controller
 * @name barometer.about-tool.controller:AboutToolController
 * @requires $scope
 * @requires $stateParams
 * @requires $state
 * @requires dataService
 * @requires mapProvider
 * @requires $log
 * @requires configService
 * @requires $document
 * @requires $compile
 * @description
 * ############################################
 */
define(function (require) {
    'use strict';
    
    function controller($scope, $window, $stateParams, $state, $log, dvtUtils, dataService, plotsProvider, $document, configService, $http) {
        $scope.title ="About the Visualisation Tool";

        // CDA
        $scope.cda =  configService.getBarometerCda();

        // Literals
        var i18nLiterals = configService.getLiterals();
        $scope.i18nLiterals = i18nLiterals;

        $scope.currentState = $state.current.name;

        //Parameters
        $scope.pSection = $stateParams.pSection;
        $scope.pSubsection = $stateParams.pSubsection;
        $scope.pIndicator = $stateParams.pIndicator;

        $scope.sections = [
            {
                id: 'generic-information', 
                name: 'L22001',
                firstSubsection: 'osh_authorities',
                firstIndicatorId: '27'
            },
            {
                id: 'osh-steering', 
                name: 'L22005',
                firstSubsection: 'structure_strategy',
                firstIndicatorId: '46'
            },
            {
                id: 'osh-outcomes-working-conditions', 
                name: 'L22009',
                firstSubsection: 'workacc',
                firstIndicatorId: '53'
            },
            {
                id: 'osh-infrastructure', 
                name: 'L22016',
                firstSubsection: 'enforcement_capacity',
                firstIndicatorId: '126'
        }];

        //Lists
        $scope.subsections = [];
        $scope.indicators = [];
        $scope.data = undefined;

        /******************************************* DATA LOAD **************************************************/

            if($scope.currentState == 'about-tool-detail-page'){
                var path = configService.getHorizontalDirectiveDataPath("main-menu", "menu");
                $http.get(path, { data: "", headers: {"Content-Type": "application/json"}}).success(function (menuStructure) {
                    $scope.structure = menuStructure;
                    for(var i=0;i<$scope.structure.length;i++){
                        if($scope.structure[i].id == $scope.pSection){
                            $scope.subsections = $scope.structure[i].levels;
                            $log.warn($scope.subsections);
                            for(var j=0;j<$scope.subsections.length;j++){
                                $log.warn($scope.subsections[j].database_name);
                                if($scope.subsections[j].database_name != undefined){
                                    $scope.subsections[j].database_name = $scope.subsections[j].database_name.toLowerCase();
                                }                                
                                $log.warn($scope.subsections[j].database_name);
                                if($scope.subsections[j].database_name == "" || $scope.subsections[j].database_name == undefined){
                                    $scope.subsections.splice(j, 1);
                                    j = j-1;
                                }
                            }
                            break;
                        }
                    }
                });

                dataService.getMethodologyIndicators($scope.pSubsection.toUpperCase()).then(function (data) {
                    data.data.resultset.map(function (elem) {
                      var param = (!!$stateParams.filter) ? $stateParams.filter : undefined;
                      $scope.indicators.push({
                        id: elem[0],
                        anchor: i18nLiterals['L'+elem[1]].toLowerCase().replace(/ /g, '-'),
                        text: elem[1]
                      });
                    });
                    //$log.warn($scope.indicators);
                    //$scope.pIndicator = $scope.indicators[0].id;
                    //$log.warn($scope.pIndicator);
                }).catch(function (err) {
                    throw err;
                });

                dataService.getMethodologyData($scope.pIndicator, $scope.pSubsection.toUpperCase()).then(function (data) {
                    data.data.resultset.map(function (elem) {
                        $scope.data = {
                            diagram: elem[0],
                            description: elem[1],
                            datasource: elem[2],
                            specific_table: elem[3],
                            url: elem[4],
                            options_applied: elem[5],
                            reference_year: elem[6],
                            last_update: elem[7],
                            coverage: elem[8],
                            unit_measure: elem[9],
                            calculations: elem[10],
                            visualisation: elem[11],
                            additional_comments: elem[12]
                        };
                    });
                //$log.warn($scope.data);
                }).catch(function (err) {
                    throw err;
                });
            }

        /****************************************** END DATA LOAD **********************************************/
        
        /****************************************** DATA FILTERS *********************************************/

            $scope.changeSection = function(id){
                
               // $('html,body').animate({scrollTop: $("#indicatorsSubmenu").offset().top},'3000'); 

                for(var i=0;i<$scope.structure.length;i++){
                    if($scope.structure[i].id == id){
                        $scope.subsections = $scope.structure[i].levels;
                        for(var j=0;j<$scope.subsections.length;j++){
                            if($scope.subsections[j].database_name == ""){
                                $scope.subsections.splice(j, 1);
                            }
                        }
                    }
                }
                $log.warn($scope.subsections);
            }

            $scope.getIndicators = function(subsection){
                //$scope.indicators = [];
                dataService.getMethodologyIndicators(subsection.database_name).then(function (data) {
                    data.data.resultset.map(function (elem) {
                      var param = (!!$stateParams.filter) ? $stateParams.filter : undefined;
                      $scope.indicators.push({
                        id: elem[0],
                        anchor: i18nLiterals['L'+elem[1]].toLowerCase().replace(/ /g, '-'),
                        text: elem[1]
                      });
                    });
                    $log.warn($scope.indicators);
                }).catch(function (err) {
                    throw err;
                });
            }

            $scope.changeIndicator = function(indicator){
                $log.warn(indicator);
                $state.transitionTo($scope.currentState, {
                    pSection: $scope.pSection,
                    pSubsection: $scope.pSubsection,
                    pIndicator: indicator
                }, 
                {
                    reload: true
                });
            }

            $scope.indicatorIcons = function(subsection){
                subsection = subsection.toLowerCase();
                switch(subsection) {
                // GENERIC INFORMATION  
                  case 'osh_authorities':
                    return 'forum-icon';
                    break;
                  case 'economic_sector_profile':
                    return 'economic-chart-icon';
                    break;
                  case 'workforce_profile':
                    return 'people-group-icon';
                    break;

                // STEERING OF OSH 
                  case 'regulation':
                    return 'regulation-icon';
                    break;
                  case 'structure_strategy':
                    return 'national-icon';
                    break;
                  case 'response_strategy':
                    return 'national-icon';
                    break;
                  case 'social_dialogue':
                    return 'dialogue-icon';
                    break;

                // OSH OUTCOMES AND WORKING CONDITIONS
                  case 'workacc':
                    return 'work-accidents-icon';
                    break;
                  case 'health_perception':
                    return 'health-icon';
                    break;
                  case 'osh_culture_health_awareness':
                    return 'culture-icon';
                    break;
                  case 'overall_opinion':
                    return 'overall-opinion-icon';
                    break;
                  case 'mental_risks':
                    return 'mental-risk-icon';
                    break;
                  case 'physical_risks':
                    return 'physical-risk-icon';
                    break;
                  case 'prevention_in_companies':
                    return 'prevention-icon';
                    break;
                  case 'worker_involvement':
                    return 'workers-icon';
                    break;

                // OSH INFRASTRUCTURE
                  case 'enforcement_capacity':
                    return 'enforcement-icon';
                    break;
                  case 'osh_statistics':
                    return 'statistics-icon';
                    break;

                  default:
                    // code block

                }    
            }


            // Open indicators list like a select element
            // 
                $(window).on("resize",function(e){
                resolution = $(window).width();
                });
                resolution = $(window).width();

                $scope.openIndicatorsList = function(e) {  

                    if( resolution < 990 ){
                          //var parentTag = e.target.offsetParent.nextSibling.parentNode.className;          
                        var parentTag = e.currentTarget;
                         angular.element('.indicators--submenu--wrapper').toggleClass('open-list');
                    }
                }

                $('body').on('click touchstart', function(e) {
                var container = angular.element('.indicators--submenu--wrapper');
                if (!container.is(e.target) && container.has(e.target).length === 0){
                  angular.element('.indicators--submenu--wrapper').removeClass('open-list'); 
                }
                });

        /**************************************** END DATA FILTERS *******************************************/

        $scope.status = 'ready';
    }
    
    controller.$inject = ['$scope', '$window', '$stateParams', '$state', '$log', 'dvtUtils', 'dataService', 'plotsProvider', '$document', 'configService', '$http'];
    return controller;
    
});


