import angular from 'angular';
import '@uirouter/angularjs';
import './providers';
import controllers from './controllers';
import services from './services';

angular
    .module('page.userSearch', ['userSearchVariables'])
    .service('userDataCache', services.userDataCache)
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
