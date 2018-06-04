import angular from 'angular';

import onRepeatEnd from './onRepeatEnd';
import infiniteScroll from './infiniteScroll';
import loader from './loadingIndicator';

angular
    .module('reusableCustomDirectives', [])
    .directive('sivRepeatEnd', onRepeatEnd)
    .directive('sivInfiniteScroll', infiniteScroll)
    .directive('sivLoadingIndicator', loader);
