import angular from 'angular';
import '@uirouter/angularjs';
import './providers';
import controllers from './controllers';
import services from './services';

angular
    .module('page.userSearch', ['userSearchVariables'])
    .service('userDataCache', services.userDataCache)
    .service('dataService', services.database)
    .config(($stateProvider) => {
        $stateProvider
            .state({
                name: 'usersSearch',
                url: '/usersSearch',
                templateUrl: './view.html',
                controller: controllers.userSearch,
            })
            .state({
                name: 'usersSearch.result',
                url: '/:login',
                templateUrl: './resultView.html',
                controller: controllers.userData,
            });
    });
