import angular from 'angular';
import '@uirouter/angularjs';

angular.module('page.home', ['ui.router']).config(($stateProvider) => {
    $stateProvider.state({
        name: 'home',
        url: '/',
        templateUrl: './view.html',
    });
});
