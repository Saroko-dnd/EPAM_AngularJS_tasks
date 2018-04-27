import angular from 'angular';
import '@uirouter/angularjs';

import './globalProviders';
import './pages/pages';

angular
    .module('testAngularApplication', ['pages', 'globalVariables', 'ui.router'])
    .config(($httpProvider, apiToken) => {
        $httpProvider.defaults.headers.common.Authorization = `token ${apiToken}`;
    });
