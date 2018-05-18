import angular from 'angular';
import '@uirouter/angularjs';
import controllers from './controllers';
import services from './services';

angular
    .module('page.repositoriesSearch', [])
    .service('repositoriesDataService', services.repositoriesDataService)
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
                url: '/:keyword',
                templateUrl: './views/resultView.html',
                controller: controllers.repositoriesData,
            });
    });
