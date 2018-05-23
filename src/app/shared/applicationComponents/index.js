import angular from 'angular';

import header from './header';
import footer from './footer';
import githubDataList from './githubDataList';

angular
    .module('applicationComponents', [])
    .directive('sivFooter', footer)
    .directive('sivHeader', header)
    .directive('sivGithubDataList', githubDataList);
