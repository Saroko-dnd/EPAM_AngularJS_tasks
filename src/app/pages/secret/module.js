import angular from 'angular';
import '@uirouter/angularjs';

angular.module('page.secret', ['ui.router']).config(($stateProvider) => {
    $stateProvider.state({
        name: 'secret',
        url: '/secret',
        templateUrl: './view.html',
    });
});
