define(function (require) {
    'use strict';

    var angular = require('common-ui/angular'),
        configModule = require('horizontal/config/config-module');

    /**
     * @ngdoc overview
     * @name all-ages.footerPages
     * @requires ui.router
     * @requires configModule
     */
    var module = angular.module('footerPages', ['ui.router', 'ui.router.metatags', configModule.name]);

    module.config(function ($stateProvider, configService, $controllerProvider, $urlRouterProvider) {

        // Literals / i18n
        var i18n = configService.getLiterals();

        $urlRouterProvider.when('/about-tool','about-the-system');
        $urlRouterProvider.when('/about-tool-detail-page', 'about-the-system/methodology');
        $urlRouterProvider.when('/about-tool-detail-page/{path:.*}', 'about-the-system/methodology');
        $urlRouterProvider.otherwise("/404");
        $stateProvider.state('legal-notice', {
            url: "/legal-notice",
            views: {
                "content-main": {
                    templateUrl: configService.getVerticalTplPath("footer-pages", "legal-notice"),
                    controller: 'FooterPagesController',
                    resolve: configService.dynamicallyRegisterController($controllerProvider,'vertical/footer-pages/FooterPagesController', 'footer-pages', 'FooterPagesController')
                }
            },
            metaTags: {
                title: i18n.L360 +  " - " + i18n.L22020 + " - " + i18n.L363/*,
                description: i18n.L9,*/
            }
        });

        $stateProvider.state('accessibility', {
            url: "/accessibility",
            views: {
                "content-main": {
                    templateUrl: configService.getVerticalTplPath("footer-pages", "accessibility"),
                    controller: 'FooterPagesController',
                    resolve: configService.dynamicallyRegisterController($controllerProvider, 'vertical/footer-pages/FooterPagesController', 'footer-pages', 'FooterPagesController')
                }
            },
            metaTags: {
                title: i18n.L358 +  " - " + i18n.L22020 + " - " + i18n.L363/*,
                description: i18n.L10,*/
            }
        });

        $stateProvider.state('privacy-policy', {
            url: "/privacy-notice",
            views: {
                "content-main": {
                    templateUrl: configService.getVerticalTplPath("footer-pages", "privacy-policy"),
                    controller: 'FooterPagesController',
                    resolve: configService.dynamicallyRegisterController($controllerProvider, 'vertical/footer-pages/FooterPagesController', 'footer-pages', 'FooterPagesController')
                }
            },
            metaTags: {
                title: i18n.L359 +  " - " + i18n.L22020 + " - " + i18n.L363 /*,
                description: i18n.L8,*/
            }
        });

        $stateProvider.state('site-map', {
            url: "/site-map",
            views: {
                "content-main": {
                    templateUrl: configService.getVerticalTplPath("footer-pages", "sitemap"),
                    controller: 'FooterPagesController',
                    resolve: configService.dynamicallyRegisterController($controllerProvider, 'vertical/footer-pages/FooterPagesController', 'footer-pages', 'FooterPagesController')
                }
            },
            metaTags: {
                title: i18n.L356 +  " - " + i18n.L22020 + " - " + i18n.L363/*,
                description: i18n.L7,*/
            }
        });

        $stateProvider.state('404', {
            url: "/404",
            views: {
                "content-main": {
                    templateUrl: configService.getVerticalTplPath("footer-pages", "404")
                }
            },
            metaTags: {
                title: "Page not found " +  " - " + i18n.L22020 + " - " + i18n.L363/*,
                description: i18n.L135,*/
            }
        });

    });

    return module;
});
