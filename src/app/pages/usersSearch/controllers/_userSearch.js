/* @ngInject */
const userSearch = ($scope, dataService, $cacheFactory, userDataCache) => {
    const cache =
        $cacheFactory.get(userDataCache) || $cacheFactory(userDataCache);

    $scope.avatarUrl = cache.get('avatarUrl');
    $scope.login = cache.get('login');
    $scope.username = cache.get('username');
    $scope.errorMessage = cache.get('errorMessage');

    $scope.followers = cache.get('followers');
    $scope.followersCount = cache.get('followersCount');

    $scope.followingCount = cache.get('followingCount');
    $scope.followingList = cache.get('followingList');

    $scope.repositoriesCount = cache.get('repositoriesCount');
    $scope.starredReposCount = cache.get('starredReposCount');
    $scope.repositories = cache.get('repositories');

    if ($scope.avatarUrl) {
        $scope.userFound = true;
    } else {
        $scope.userFound = false;
    }

    $scope.isUserFound = () => !$scope.userFound;

    $scope.getUserInfo = () => {
        dataService
            .getUserData($scope.login)
            .then((userData) => {
                $scope.username = userData.name;
                $scope.avatarUrl = userData.avatar_url;
                $scope.followersCount = userData.followers;
                $scope.followingCount = userData.following;
                $scope.repositoriesCount = userData.public_repos;

                cache.put('username', $scope.username);
                cache.put('avatarUrl', $scope.avatarUrl);
                cache.put('followersCount', $scope.followersCount);
                cache.put('followingCount', $scope.followingCount);
                cache.put('repositoriesCount', $scope.repositoriesCount);
                $scope.userFound = true;
            })
            .then(() => dataService.getUserFollowers($scope.login, 1))
            .then((followers) => {
                $scope.followers = followers;

                cache.put('followers', $scope.followers);
            })
            .then(() => dataService.getUserFollowingList($scope.login, 1))
            .then((users) => {
                $scope.followingList = users;

                cache.put('followingList', $scope.followingList);
            })
            .then(() =>
                dataService.getNumberOfStarredRepositories($scope.login))
            .then((starredReposCount) => {
                $scope.starredReposCount = starredReposCount;
                cache.put('starredReposCount', $scope.starredReposCount);
            })
            .then(() => dataService.getListOfRepositories($scope.login))
            .then((repositoriesInfo) => {
                $scope.repositories = repositoriesInfo;
                cache.put('repositories', $scope.repositories);
            })
            .then(() => {
                $scope.errorMessage = '';
            })
            .catch((error) => {
                $scope.errorMessage = error.message;
                $scope.userFound = false;
            });
    };
};

export default userSearch;
