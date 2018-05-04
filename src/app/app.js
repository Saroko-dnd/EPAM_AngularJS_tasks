import angular from 'angular';
import '@uirouter/angularjs';
import 'angular-ui-bootstrap';

import './globalProviders';
import './globalDirectives';
import './pages/pages';

angular
    .module('testAngularApplication', [
        'globalCustomDirectives',
        'ui.bootstrap',
        'pages',
        'globalVariables',
        'ui.router',
    ])
    .config((
        /* $anchorScrollProvider, $uiViewScrollProvider, */
        $httpProvider,
        $locationProvider,
        apiToken,
    ) => {
        $httpProvider.defaults.headers.common.Authorization = `token ${apiToken}`;
        $locationProvider.html5Mode(true);
        // $anchorScrollProvider.disableAutoScrolling();
        // $uiViewScrollProvider.useAnchorScroll();
    });
