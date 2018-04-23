import angular from 'angular';
import '@uirouter/angularjs';
import controllers from './controllers/controllers';

angular.module('page.secret', ['ui.router']).config(($stateProvider) => {
    $stateProvider.state({
        name: 'secret',
        url: '/secret',
        templateUrl: './view.html',
        params: {
            avatarUrl: null,
        },
        controller: controllers.getInfoFromGithub,
    });
});
