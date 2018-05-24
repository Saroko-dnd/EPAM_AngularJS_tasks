import angular from 'angular';
import '@uirouter/angularjs';
import './providers';
import controllers from './controllers';
import services from './services';

angular
    .module('page.userSearch', ['userSearchVariables'])
    .service('userDataCache', services.userDataCache)
    .service('userDataService', services.userDataService)
    .config(($stateProvider) => {
        $stateProvider
            .state({
                name: 'usersSearch',
                url: '/usersSearch',
                templateUrl: './views/view.html',
                controller: controllers.userSearch,
            })
            .state({
                name: 'usersSearch.result',
                url: '/:login',
                templateUrl: './views/resultView.html',
                controller: controllers.userData,
            })
            .state({
                name: 'usersSearch.result.data',
                url: '/:tabName',
                templateUrl: './views/tabData.html',
                controller: controllers.tabData,
            });
    });
