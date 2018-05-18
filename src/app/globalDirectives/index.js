import angular from 'angular';

import onRepeatEnd from './onRepeatEnd';
import infiniteScroll from './infiniteScroll';

angular
    .module('globalCustomDirectives', [])
    .directive('sivRepeatEnd', onRepeatEnd)
    .directive('sivInfiniteScroll', infiniteScroll);
