import angular from 'angular';

import templateDiretive from './templateDirective';
import secondDirective from './secondDirective';
import thirdDirective from './thirdDirective';

angular
    .module('testDirectives', [])
    .directive('sivTemplate', templateDiretive)
    .directive('sivSecond', secondDirective)
    .directive('sivThird', thirdDirective);
