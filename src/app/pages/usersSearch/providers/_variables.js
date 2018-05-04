import angular from 'angular';

angular
    .module('userSearchVariables', [])
    .constant('userDataCacheID', '123456789')
    .constant('usersLink', 'https://api.github.com/users/');
