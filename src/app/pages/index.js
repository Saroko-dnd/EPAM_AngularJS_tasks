import angular from 'angular';
import '@uirouter/angularjs';

import './home';
import './repositoriesSearch';
import './usersSearch';
import './directiveTests';

angular.module('pages', [
    'ui.router',
    'page.userSearch',
    'page.repositoriesSearch',
    'page.home',
    'page.directiveTests',
]);
