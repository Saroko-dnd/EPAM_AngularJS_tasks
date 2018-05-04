import angular from 'angular';

import onRepeatEnd from './_onRepeatEnd';

angular
    .module('globalCustomDirectives', [])
    .directive('repeatEnd', onRepeatEnd);
