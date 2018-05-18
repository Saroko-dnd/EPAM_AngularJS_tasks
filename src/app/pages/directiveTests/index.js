import angular from 'angular';
import '@uirouter/angularjs';

import './directives';
import controllers from './controllers';

angular
    .module('page.directiveTests', ['testDirectives'])
    .controller('', () => {})
    .config(($stateProvider) => {
        $stateProvider.state({
            name: 'directiveTests',
            url: '/directiveTests',
            templateUrl: './view.html',
            controller: controllers.testController,
        });
    });
