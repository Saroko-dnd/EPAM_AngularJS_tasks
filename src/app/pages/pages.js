import angular from 'angular';

import './home/module';
import './secret/module';
import './signin/module';

angular.module('pages', ['page.signin', 'page.secret', 'page.home']);
