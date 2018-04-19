import angular from 'angular';
import 'angular-route';

angular.module('testAngularApplication', ['ngRoute']).config(($routeProvider) => {
    $routeProvider.when('/', {
        templateUrl: './view.html',
    });
});
