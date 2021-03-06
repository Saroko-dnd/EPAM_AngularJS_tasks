import angular from 'angular';
import 'angular-cookies';

import '@uirouter/angularjs';
import 'angular-ui-bootstrap';

import './shared/applicationComponents';
import './shared/providers';
import './shared/reusableDirectives';
import './pages';

angular
    .module('testAngularApplication', [
        'ngCookies',
        'applicationComponents',
        'globalVariables',
        'reusableCustomDirectives',
        'ui.bootstrap',
        'pages',
        'ui.router',
    ])
    .config(($uiViewScrollProvider, $httpProvider, $locationProvider, apiToken) => {
        $httpProvider.defaults.headers.common.Authorization = `token ${apiToken}`;
        $locationProvider.html5Mode(true);
        $uiViewScrollProvider.useAnchorScroll();
    });
