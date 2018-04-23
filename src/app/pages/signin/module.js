import angular from 'angular';
import '@uirouter/angularjs';
import controllers from './controllers';

angular
    .module('page.signin', ['ui.router'])
    .config(($stateProvider, $locationProvider) => {
        $stateProvider.state({
            name: 'signin',
            url: '/signin',
            templateUrl: './view.html',
            controller: controllers.authorization,
        });

        $locationProvider.html5Mode(true);
    });

// 15a6c26b4814391d67aa4c7dba10d8d6cb3c111c
