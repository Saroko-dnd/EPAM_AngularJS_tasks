import angular from 'angular';

import onRepeatEnd from './onRepeatEnd';
import infiniteScroll from './infiniteScroll';

angular
    .module('reusableCustomDirectives', [])
    .directive('sivRepeatEnd', onRepeatEnd)
    .directive('sivInfiniteScroll', infiniteScroll);
