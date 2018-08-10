import angular from 'angular';
import '@uirouter/angularjs';
import './providers';
import controllers from './controllers';
import services from './services';

angular
    .module('page.userSearch', ['userSearchVariables'])
    .service('userDataCache', services.userDataCache)
    .service('userDataService', services.userDataService)
    .controller('tabData', controllers.tabData)
    .controller('userData', controllers.userData)
    .controller('userSearch', controllers.userSearch)
    .config(($stateProvider) => {
        $stateProvider
            .state({
                name: 'usersSearch',
                url: '/usersSearch',
                templateUrl: './views/view.html',
                controller: 'userSearch',
            })
            .state({
                name: 'usersSearch.result',
                url: '/:login',
                templateUrl: './views/resultView.html',
                controller: 'userData',
            })
            .state({
                name: 'usersSearch.result.data',
                url: '/:tabName',
                templateUrl: './views/tabData.html',
                controller: 'tabData',
            });
    });
