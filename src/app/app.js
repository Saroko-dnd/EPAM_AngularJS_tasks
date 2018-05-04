import angular from 'angular';
import '@uirouter/angularjs';
import 'angular-ui-bootstrap';

import './globalProviders';
import './pages/pages';

angular
    .module('testAngularApplication', [
        'ui.bootstrap',
        'pages',
        'globalVariables',
        'ui.router',
    ])
    .config((
        /* $uiViewScrollProvider, */
        $anchorScrollProvider,
        $httpProvider,
        $locationProvider,
        apiToken,
    ) => {
        $httpProvider.defaults.headers.common.Authorization = `token ${apiToken}`;
        $locationProvider.html5Mode(true);
        // $uiViewScrollProvider.useAnchorScroll();
        $anchorScrollProvider.disableAutoScrolling();
    });
