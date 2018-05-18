import angular from 'angular';

angular
    .module('userSearchVariables', [])
    .constant('userDataCacheID', '123456789')
    .constant('userDataPagesCacheID', '987654321')
    .constant('usersLink', 'https://api.github.com/users/')
    .constant('userDataTabsIndexes', {
        followers: 0,
        following: 1,
        repositories: 2,
    });
