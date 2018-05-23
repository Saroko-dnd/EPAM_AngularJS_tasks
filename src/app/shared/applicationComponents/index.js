import angular from 'angular';

import footer from './footer';
import githubDataList from './githubDataList';

angular
    .module('applicationComponents', [])
    .directive('sivFooter', footer)
    .directive('sivGithubDataList', githubDataList);
