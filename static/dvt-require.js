(function () {
    /*if (null === requireCfg){ var requireCfg = {waitSeconds: 30, paths: {}, shim: {}, map: {"*": {}}, bundles: {}, config: {service: {}}, packages: []};}*/

    var requirePaths = requireCfg['paths'];
    var requireConfig = requireCfg['config'];
    var amdShim = requireConfig['amd']['shim'];
    var shim = requireCfg['shim'];
    var systemPath = CONTEXT_PATH + 'plugin/pentaho-cdf-dd/api/resources/system';
    var staticCustom = CONTEXT_PATH + 'plugin/pentaho-cdf-dd/api/resources/system/osha-dvt-barometer/static/custom';
    var componentsPath = CONTEXT_PATH + 'plugin/pentaho-cdf-dd/api/resources/system/osha-dvt-barometer/static/system/components';
    var horizontalModules = CONTEXT_PATH + 'plugin/pentaho-cdf-dd/api/resources/system/osha-dvt-barometer/static/custom/modules/horizontal';
    var verticalModules = CONTEXT_PATH + 'plugin/pentaho-cdf-dd/api/resources/system/osha-dvt-barometer/static/custom/modules/vertical';


    /*
     * if you want to debug just put ?isDebug=true&debugLevel=5 in browser params
     */
    var isDebug = typeof document == "undefined" || document.location.href.indexOf("debug=true") > 0 || environment.packed === false;
    var suffix = (isDebug) ? "" : ".min";


    //requireCfg.urlArgs = "ts=" + (new Date()).getTime();
    requireCfg.urlArgs = "";


    /* OPTIMIZATION */

    requirePaths["common-ui/angular"] = componentsPath + "/angular/angular" + suffix;
    // requirePaths["common-ui/angular-ui-bootstrap"] = componentsPath + "/angular-bootstrap/ui-bootstrap-tpls.min";
    // shim["common-ui/angular-ui-bootstrap"] = ["common-ui/angular"];

    requirePaths["horizontal/templates"] = horizontalModules + '/templates';
    shim['horizontal/templates'] = ['common-ui/angular'];
    requirePaths["vertical/templates"] = verticalModules + '/templates';
    shim['vertical/templates'] = ['common-ui/angular'];

    /* LIBRARIES */

    requirePaths['common-ui/angular-ui-router'] = componentsPath + '/angular-ui-router/release/angular-ui-router.min';
    shim['common-ui/angular-ui-router'] = ['common-ui/angular'];

    requirePaths['common-ui/ui-router-metatags'] = componentsPath + '/ui-router-metatags/dist/ui-router-metatags.min';
    shim['common-ui/ui-router-metatags'] = ["common-ui/angular", "common-ui/angular-ui-router"];

    requirePaths['dvt/angulartics'] = componentsPath + '/angulartics/dist/angulartics.min';
    shim['dvt/angulartics'] = ["common-ui/angular", "common-ui/angular-ui-router"];
    requirePaths['dvt/angulartics-piwik'] = componentsPath + '/angulartics/dist/angulartics-piwik.min';
    shim['dvt/angulartics-piwik'] = ["common-ui/angular", "common-ui/angular-ui-router"];

    requirePaths['common-ui/angular-jquery'] = componentsPath + '/angular-jquery/dist/angular-jquery' + suffix;
    shim['common-ui/angular-jquery'] = ["common-ui/angular", "common-ui/angular-ui-router"];

    requirePaths['common-ui/angular-bootstrap-affix'] = componentsPath +  '/angular-bootstrap-affix/dist/angular-bootstrap-affix' + suffix;
    shim['common-ui/angular-bootstrap-affix'] = ["common-ui/angular", "common-ui/angular-ui-router", "common-ui/angular-jquery"];

    requirePaths['dvt/directives/scroll'] = componentsPath + '/angular-scroll/angular-scroll' + suffix;
    shim['dvt/directives/scroll'] = ["common-ui/angular", "common-ui/angular-ui-router"];

    requirePaths['dvt/directives/tooltip'] = componentsPath + '/angular-tooltips/dist/angular-tooltips' + suffix;
    shim['dvt/directives/tooltip'] = ["common-ui/angular"];

    requirePaths['dvt/directives/angular-cookies'] = componentsPath + '/angular-cookies/angular-cookies'+ suffix;
    shim['dvt/directives/angular-cookies'] = ['common-ui/angular'];

    requirePaths['dvt/directives/angular-consent'] = componentsPath + '/angular-consent/dist/angular-consent'+ suffix;
    shim['dvt/directives/angular-consent'] = ['common-ui/angular','dvt/directives/angular-cookies'];

    requirePaths['common-ui/angularjs-socialshare'] = componentsPath + '/angularjs-socialshare/dist/angular-socialshare' + suffix;
    shim['common-ui/angularjs-socialshare'] = ["common-ui/angular"];


    // =====================
    //  3rd party libraries
    // =====================
    if (isDebug){
        requirePaths['common-exporting/dom-to-image'] = componentsPath + '/dom-to-image/src/dom-to-image';
    }else{
       requirePaths['common-exporting/dom-to-image'] = componentsPath + '/dom-to-image/dist/dom-to-image.min';
    }

    // exporting
    requirePaths['common-exporting/html2canvas'] = componentsPath  + '/html2canvas/dist/html2canvas' + suffix;
    requirePaths['common-exporting/file-saver'] = componentsPath + '/file-saver/FileSaver' + suffix;

    /* HORIZONTAL ****************************************************************/

    /* CONFIG */
    requirePaths['horizontal/config/config-module'] = horizontalModules + '/config/config-module' + suffix;
    requirePaths['horizontal/config/configService'] = horizontalModules + '/config/configService' + suffix;
    requirePaths['horizontal/config/configuration'] = horizontalModules + '/config/configuration' + suffix + '.json';
    requirePaths['horizontal/config/environment'] = horizontalModules + '/config/environment' + suffix + '.json';

    /* SERVICES */
    /* DATA */
    requirePaths['horizontal/services/dataService'] = horizontalModules + '/services/DataService' + suffix;
    /* UTILS */
    requirePaths['horizontal/services/utils'] = horizontalModules + '/services/Utils' + suffix;
    /* CHARTING */
    requirePaths['horizontal/services/mapProvider'] = horizontalModules + '/services/MapProvider' + suffix;
    requirePaths['horizontal/services/plotsProvider'] = horizontalModules + '/services/PlotsProvider' + suffix;
    /* ACTIONS */
    requirePaths['horizontal/graphic/services/exportService'] = horizontalModules + '/directives/graphic/services/ExportService' + suffix;
    requirePaths['horizontal/graphic/services/maximizeService'] = horizontalModules + '/directives/graphic/services/MaximizeService' + suffix;

    /* MODEL */
    /* LITERALS */
    requirePaths['horizontal/model/literals'] = horizontalModules + '/model/Literals' + suffix + '.json';

    /* DATASETS */ 
    requirePaths['horizontal/model/datasets'] = horizontalModules + '/model/Datasets' + suffix + '.json';

    /* COLORS */
    requirePaths['horizontal/model/colors'] = horizontalModules + '/model/Colors' + suffix + '.json';

    /* DIRECTIVES */
    requirePaths['horizontal/directives/directives-module'] = horizontalModules + '/directives/directives-module' + suffix;
    requirePaths['horizontal/directives/charting-module'] = horizontalModules + '/directives/charting-module' + suffix;

    requirePaths['dvt/directives/dashboard'] = horizontalModules + '/directives/dashboard/DvtDashboardDirective' + suffix;
    requirePaths['dvt/directives/select'] = horizontalModules + '/directives/select/DvtSelectDirective' + suffix;
    requirePaths['dvt/directives/radio'] = horizontalModules + '/directives/radio/DvtRadioDirective' + suffix;
    requirePaths['dvt/directives/search'] = horizontalModules + '/directives/search/dvtSearchDirective' + suffix;
    requirePaths['horizontal/search/i18n'] = horizontalModules + '/directives/search/search-i18n' + suffix + '.json';
    requirePaths['dvt/directives/social'] = horizontalModules + '/directives/social/DvtSocialDirective' + suffix;
    requirePaths['dvt/directives/header'] = horizontalModules + '/directives/header/DvtHeaderDirective' + suffix;
    requirePaths['dvt/directives/footer'] = horizontalModules + '/directives/footer/DvtFooterDirective' + suffix;
    requirePaths['dvt/directives/main-menu'] = horizontalModules + '/directives/main-menu/DvtMainMenuDirective' + suffix;
    requirePaths['dvt/directives/breadcrumb-items'] = horizontalModules + '/directives/main-menu/breadcrumb' + suffix + '.json';
    requirePaths['dvt/directives/title-items'] = horizontalModules + '/directives/main-menu/titles' + suffix + '.json';

    requirePaths['dvt/directives/methodology'] = horizontalModules + '/directives/methodology/DvtMethodologyDirective' + suffix;
    requirePaths['dvt/directives/related'] = horizontalModules + '/directives/related/DvtRelatedDirective' + suffix;


    /* CUSTOM CHARTS */
    requirePaths['dvt/directives/barchart'] = horizontalModules + '/directives/graphic/DvtBarChartDirective' + suffix;
    requirePaths['dvt/directives/pyramidchart'] = horizontalModules + '/directives/graphic/DvtPyramidChartDirective' + suffix;
    requirePaths['dvt/graphic/MaximizeController'] = horizontalModules + '/directives/graphic/maximize/MaximizeController' + suffix;
    requirePaths['dvt/graphic/HistoricalController'] = horizontalModules + '/directives/graphic/historical/HistoricalController' + suffix;

    requirePaths['dvt/directives/radar'] = horizontalModules + '/directives/graphic/DvtRadarChartDirective' + suffix;
    requirePaths['dvt/directives/map'] = horizontalModules + '/directives/map/DvtShapeDirective' + suffix;

    requirePaths['dvt/directives/paging'] = horizontalModules + '/directives/paging/paging' + suffix;
    requirePaths['dvt/cookies-disclaimer/CookiesController'] = horizontalModules + '/includes/general/CookiesController' + suffix;
    requirePaths['dvt/cookies-disclaimer/i18n'] = horizontalModules + '/includes/general/cookies' + suffix + '.json';

    /* VERTICAL *****************************************************************/

    /* HOME */
    requirePaths['vertical/home/home-module'] = verticalModules + '/home/home-module' + suffix;
    requirePaths['vertical/home/HomeController'] = verticalModules + '/home/HomeController' + suffix;
    requirePaths['vertical/home/i18n'] = verticalModules + '/home/HP-i18n' + suffix + '.json';

    /* GENERIC INFORMATION */
    requirePaths['vertical/generic-information/generic-information-module'] = verticalModules + '/generic-information/generic-information-module' + suffix;

    /* OSH AUTHORITIES */
    requirePaths['vertical/osh-authorities/OSHAuthoritiesController'] = verticalModules + '/generic-information/osh-authorities/OSHAuthoritiesController' + suffix;
    requirePaths['vertical/osh-authorities/i18n'] = verticalModules + '/generic-information/osh-authorities/osh-authorities-i18n' + suffix +'.json';

    /* ECONOMIC AND SECTOR PROFILE */
    requirePaths['vertical/economic-sector-profile/EconomicSectorProfileController'] = verticalModules + '/generic-information/economic-sector-profile/EconomicSectorProfileController' + suffix;
    requirePaths['vertical/economic-sector-profile/services/EconomicSectorProfileService'] = verticalModules + '/generic-information/economic-sector-profile/services/EconomicSectorProfileService' + suffix;
    requirePaths['vertical/economic-sector-profile/selector'] = verticalModules + '/generic-information/economic-sector-profile/directives/SelectorDirective' + suffix;

    /* WORKFORCE PROFILE */
    requirePaths['vertical/workforce-profile/WorkforceProfileController'] = verticalModules + '/generic-information/workforce-profile/WorkforceProfileController' + suffix;
    requirePaths['vertical/workforce-profile/services/WorkforceProfileService'] = verticalModules + '/generic-information/workforce-profile/services/WorkforceProfileService' + suffix;

    /*STEERING OF OSH*/
    requirePaths['vertical/osh-steering/osh-steering-module'] = verticalModules + '/osh-steering/osh-steering-module' + suffix;

    /*REGULATION*/
    requirePaths['vertical/regulation/RegulationController'] = verticalModules + '/osh-steering/regulation/RegulationController' + suffix;

    /*NATIONAL STRATEGIES*/
    requirePaths['vertical/national-strategies/NationalStrategiesController'] = verticalModules + '/osh-steering/national-strategies/NationalStrategiesController' + suffix;
    requirePaths['vertical/country-profile/CountryProfileController'] = verticalModules + '/osh-steering/country-profile/CountryProfileController' + suffix;
    requirePaths['vertical/EU-challenges-response/EUChallengesResponseController'] = verticalModules + '/osh-steering/EU-challenges-response/EUChallengesResponseController' + suffix;

    /*SOCIAL DIALOGUE*/
    requirePaths['vertical/social-dialogue/SocialDialogueController'] = verticalModules + '/osh-steering/social-dialogue/SocialDialogueController' + suffix;

    /* OSH OUTCOMES AND WORKING CONDITIONS */
    requirePaths['vertical/osh-outcomes-working-conditions/osh-outcomes-working-conditions-module'] = verticalModules + '/osh-outcomes-working-conditions/osh-outcomes-working-conditions-module' + suffix;

    /* WORK ACCIDENTS */
    requirePaths['vertical/work-accidents/WorkAccidentsController'] = verticalModules + '/osh-outcomes-working-conditions/work-accidents/WorkAccidentsController' + suffix;
    requirePaths['vertical/work-accidents/services/WorkAccidentsService'] = verticalModules + '/osh-outcomes-working-conditions/work-accidents/services/WorkAccidentsService' + suffix;

    /* HEALTH PERCEPTION OF WORKERS */
    requirePaths['vertical/health-perception-of-workers/HealthPerceptionOfWorkersController'] = verticalModules + '/osh-outcomes-working-conditions/health-perception-of-workers/HealthPerceptionOfWorkersController' + suffix;

    /* OSH CULTURE AND HEALTH AWARENESS */
    requirePaths['vertical/osh-culture/OshCultureController'] = verticalModules + '/osh-outcomes-working-conditions/osh-culture/OshCultureController' + suffix;
    requirePaths['vertical/osh-culture/services/OshCultureService'] = verticalModules + '/osh-outcomes-working-conditions/osh-culture/services/OshCultureService' + suffix;
    
    /* WORKING CONDITIONS */
    requirePaths['vertical/working-conditions/WorkingConditionsController'] = verticalModules + '/osh-outcomes-working-conditions/working-conditions/WorkingConditionsController' + suffix;

    /* OVERALL OPINION */
    requirePaths['vertical/overall-opinion/OverallOpinionController'] = verticalModules + '/osh-outcomes-working-conditions/overall-opinion/OverallOpinionController' + suffix;
    requirePaths['vertical/overall-opinion/services/OverallOpinionService'] = verticalModules + '/osh-outcomes-working-conditions/overall-opinion/services/OverallOpinionService' + suffix;
    
    /* MENTAL RISK */
    requirePaths['vertical/mental-risk/MentalRiskController'] = verticalModules + '/osh-outcomes-working-conditions/mental-risk/MentalRiskController' + suffix;
    requirePaths['vertical/mental-risk/services/MentalRiskService'] = verticalModules + '/osh-outcomes-working-conditions/mental-risk/services/MentalRiskService' + suffix;
    
    /* PHYSICAL RISK */
    requirePaths['vertical/physical-risk/PhysicalRiskController'] = verticalModules + '/osh-outcomes-working-conditions/physical-risk/PhysicalRiskController' + suffix;
    requirePaths['vertical/physical-risk/services/PhysicalRiskService'] = verticalModules + '/osh-outcomes-working-conditions/physical-risk/services/PhysicalRiskService' + suffix;

    /* PREVENTION COMPANIES */
    requirePaths['vertical/prevention-companies/PreventionCompaniesController'] = verticalModules + '/osh-outcomes-working-conditions/prevention-companies/PreventionCompaniesController' + suffix;
    requirePaths['vertical/prevention-companies/services/PreventionCompaniesService'] = verticalModules + '/osh-outcomes-working-conditions/prevention-companies/services/PreventionCompaniesService' + suffix;

    /* WORKER INVOLVEMENT */
    requirePaths['vertical/worker-involvement/WorkerInvolvementController'] = verticalModules + '/osh-outcomes-working-conditions/worker-involvement/WorkerInvolvementController' + suffix;

    /* OSH INFRASTRUCTURE */
    requirePaths['vertical/osh-infrastructure/osh-infrastructure-module'] = verticalModules + '/osh-infrastructure/osh-infrastructure-module' + suffix;

    /* ENFORCEMENT CAPACITY */
    requirePaths['vertical/enforcement-capacity/EnforcementCapacityController'] = verticalModules + '/osh-infrastructure/enforcement-capacity/EnforcementCapacityController' + suffix;
    requirePaths['vertical/enforcement-capacity/services/EnforcementCapacityService'] = verticalModules + '/osh-infrastructure/enforcement-capacity/services/EnforcementCapacityService' + suffix;

    /* OSH STATISTICS */
    requirePaths['vertical/osh-statistics/OSHStatisticsController'] = verticalModules + '/osh-infrastructure/osh-statistics/OSHStatisticsController' + suffix;

    /* ABOUT THE VISUALISATION TOOL */
    requirePaths['vertical/about-tool/AboutToolController'] = verticalModules + '/about-tool/AboutToolController' + suffix;
    requirePaths['vertical/about-tool/about-tool-module'] = verticalModules + '/about-tool/about-tool-module' + suffix;

    /* FULL COUNTRY REPORT */
    requirePaths['vertical/about-tool/CountryReportController'] = verticalModules + '/about-tool/country-report/CountryReportController' + suffix;
    requirePaths['vertical/about-tool/services/CountryReportService'] = verticalModules + '/about-tool/country-report/services/CountryReportService' + suffix;

    /* FULL COUNTRY REPORT HOME */
    requirePaths['vertical/about-tool/CountryReportHomeController'] = verticalModules + '/about-tool/country-report-home/CountryReportHomeController' + suffix;

    /* FOOTER */
    requirePaths['vertical/footer-pages/footer-pages-module'] = verticalModules + '/footer-pages/footer-pages-module' + suffix;
    requirePaths['vertical/footer-pages/FooterPagesController'] = verticalModules + '/footer-pages/FooterPagesController' + suffix;
    requirePaths['vertical/footer-pages/i18n'] = verticalModules + '/footer-pages/FP-i18n' + suffix + '.json';

    requireCfg['deps'] = [staticCustom + '/app' + suffix + '.js'];

    require.config(requireCfg);
})();
