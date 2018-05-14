import angular from 'angular';

import onRepeatEnd from './_onRepeatEnd';
import infiniteScroll from './_infiniteScroll';

angular
    .module('globalCustomDirectives', [])
    .directive('sivRepeatEnd', onRepeatEnd)
    .directive('sivInfiniteScroll', infiniteScroll);
