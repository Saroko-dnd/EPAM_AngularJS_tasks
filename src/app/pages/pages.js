import angular from 'angular';
import '@uirouter/angularjs';

import './home/module';
import './repositoriesSearch/module';
import './usersSearch/module';

angular.module('pages', [
    'ui.router',
    'page.userSearch',
    'page.secret',
    'page.home',
]);
