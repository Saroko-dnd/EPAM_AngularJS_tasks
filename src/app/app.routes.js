import angular from 'angular';

const ngRouteESLintIgnore = require('angular-route');

angular
    .module('testAngularApplication', ['ngRoute'])
    .config(($routeProvider, $locationProvider) => {
        $routeProvider
            .when('/', {
                templateUrl: './pages/main/view.html',
            })
            .when('/two', {
                templateUrl: './pages/second/view.html',
            })
            .when('/three', {
                templateUrl: './pages/third/view.html',
            })
            .when('/four', {
                templateUrl: './pages/fourth/view.html',
            });

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('');
    });
