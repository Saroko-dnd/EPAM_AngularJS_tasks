import angular from 'angular';
import '@uirouter/angularjs';
import 'angular-ui-bootstrap';

import './globalProviders';
import './globalDirectives';
import './pages';

angular
    .module('testAngularApplication', [
        'globalVariables',
        'globalCustomDirectives',
        'ui.bootstrap',
        'pages',
        'ui.router',
    ])
    .config(($uiViewScrollProvider, $httpProvider, $locationProvider, apiToken) => {
        $httpProvider.defaults.headers.common.Authorization = `token ${apiToken}`;
        $locationProvider.html5Mode(true);
        $uiViewScrollProvider.useAnchorScroll();
    });
