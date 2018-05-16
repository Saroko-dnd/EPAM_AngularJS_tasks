import angular from 'angular';
import '@uirouter/angularjs';

import './directives';

angular
    .module('page.directiveTests', ['testDirectives'])
    .config(($stateProvider) => {
        $stateProvider.state({
            name: 'directiveTests',
            url: '/directiveTests',
            templateUrl: './view.html',
        });
    });
