import angular from 'angular';
import '@uirouter/angularjs';
import controllers from './controllers/controllers';

import './_variables';

angular
    .module('page.signin', ['ui.router', 'page.signin.variables'])
    .controller('')
    .config(($stateProvider, $locationProvider) => {
        $stateProvider.state({
            name: 'signin',
            url: '/signin?code',
            templateUrl: './view.html',
            controller: controllers.OAuthDataController,
        });

        $locationProvider.html5Mode(true);
    });
