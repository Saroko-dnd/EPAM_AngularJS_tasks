/* @ngInject */
const userSearch = ($scope, dataService, userDataCache) => {
    init();

    $scope.getUserInfo = getUserInfo;

    function init() {
        $scope.userData = userDataCache.getData() || {};
    }

    function getUserInfo() {
        dataService
            .loadUserData($scope.login)
            .then((data) => {
                $scope.userData = data;
            })
            .then(() => dataService.loadUserFollowers($scope.login, 1))
            .then((followersList) => {
                $scope.userData.followersList = followersList;
            })
            .then(() => dataService.loadUserFollowingList($scope.login, 1))
            .then((followingList) => {
                $scope.userData.followingList = followingList;
            })
            .then(() =>
                dataService.loadNumberOfStarredRepositories($scope.login))
            .then((starredReposCount) => {
                $scope.userData.starredReposCount = starredReposCount;
            })
            .then(() => dataService.loadListOfRepositories($scope.login))
            .then((repositoriesList) => {
                $scope.userData.repositoriesList = repositoriesList;
            })
            .then(() => {
                $scope.errorMessage = '';
            })
            .catch((error) => {
                $scope.errorMessage = error.message;
            });
    }
};

export default userSearch;
