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
                params: {
                    itemsPerPage: null,
                    pagesLimit: null,
                    tabName: null,
                    page: null,
                    search: null,
                },
                controller: controllers.userData,
            })
            .state({
                name: 'usersSearch.result.userDataLists',
                url: '/:tabName?page',
                params: {
                    userData: null,
                },
                // controller: controllers.userData,
                views: {
                    followers: {
                        templateUrl: './views/followers.html',
                        controller: controllers.followers,
                    },
                    following: {
                        templateUrl: './views/following.html',
                        controller: controllers.following,
                    },
                    repositories: {
                        templateUrl: './views/repositories.html',
                        controller: controllers.repositories,
                    },
                },
            });
    });
