import angular from 'angular';

import header from './header';
import footer from './footer';
import userDataList from './userDataList';

angular
    .module('applicationComponents', [])
    .directive('sivFooter', footer)
    .directive('sivHeader', header)
    .directive('sivUserDataList', userDataList);
