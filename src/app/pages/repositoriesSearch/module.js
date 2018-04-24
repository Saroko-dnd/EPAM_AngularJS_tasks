import angular from 'angular';
import '@uirouter/angularjs';
import controllers from './controllers';

angular.module('page.secret', ['ui.router']).config(($stateProvider) => {
    $stateProvider.state({
        name: 'repositoriesSearch',
        url: '/repositoriesSearch',
        templateUrl: './view.html',
        params: {
            avatarUrl: null,
        },
        controller: controllers.getInfoFromGithub,
    });
});