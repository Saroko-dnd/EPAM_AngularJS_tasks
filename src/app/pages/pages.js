import angular from 'angular';

import './home/module';
import './repositoriesSearch/module';
import './usersSearch/module';

angular.module('pages', ['page.userSearch', 'page.secret', 'page.home']);
