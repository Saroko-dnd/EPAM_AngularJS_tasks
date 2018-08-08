import angular from 'angular';
import '@uirouter/angularjs';
import controllers from './controllers';
import services from './services';
import './providers';

angular
    .module('page.repositoriesSearch', ['repositoriesSearchVariables'])
    .service('repositoriesDataService', services.repositoriesDataService)
    .service('repositoriesDataCache', services.repositoriesDataCache)
    .config(($stateProvider) => {
        $stateProvider
            .state({
                name: 'repositoriesSearch',
                url: '/repositoriesSearch',
                templateUrl: './views/view.html',
                controller: controllers.repositoriesSearch,
            })
            .state({
                name: 'repositoriesSearch.result',
                url: '/:keyword?order&sort',
                templateUrl: './views/resultView.html',
                controller: controllers.repositoriesData,
            });
    });
