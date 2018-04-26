import angular from 'angular';
import '@uirouter/angularjs';
import controllers from './controllers';
import services from './services';

angular
    .module('page.userSearch', ['ui.router'])
    .service('dataService', services.database)
    .config(($stateProvider, $locationProvider) => {
        $stateProvider.state({
            name: 'usersSearch',
            url: '/usersSearch',
            cache: true,
            templateUrl: './view.html',
            controller: controllers.userSearch,
        });

        $locationProvider.html5Mode(true);
    });
