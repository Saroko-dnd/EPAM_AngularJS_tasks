import angular from 'angular';
import '@uirouter/angularjs';

angular
    .module('testAngularApplication', ['ui.router'])
    .config(($stateProvider) => {
        $stateProvider.state({
            name: 'welcome',
            url: '',
            templateUrl: './view.html',
        });
    });
