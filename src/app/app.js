import angular from 'angular';
import './globalProviders';

import './pages/pages';

angular.module('testAngularApplication', ['pages', 'globalVariables']);
