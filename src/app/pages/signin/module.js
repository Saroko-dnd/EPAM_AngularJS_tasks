import angular from 'angular';
import '@uirouter/angularjs';
import controllers from './controllers/controllers';

import './_variables';

angular
    .module('page.signin', ['ui.router', 'page.signin.variables'])
    .config(($stateProvider, $locationProvider) => {
        $stateProvider.state({
            name: 'signin',
            url: '/signin?code',
            templateUrl: './view.html',
            controller: controllers.OAuthDataController,
            controllerAs: 'OAuthDataController',
            onEnter: ($stateParams, $http, $log, clientId, clientSecret) => {
                if ($stateParams.code) {
                    $http
                        .post('https://github.com/login/oauth/access_token', {
                            code: $stateParams.code,
                            client_id: clientId,
                            client_secret: clientSecret,
                        })
                        .then(
                            (response) => {
                                $log.log('OAuth Success');
                                $log.log(response);
                            },
                            (response) => {
                                $log.log('OAuth Failure');
                                $log.log(response);
                            },
                        );
                }
            },
        });

        $locationProvider.html5Mode(true);
    });
