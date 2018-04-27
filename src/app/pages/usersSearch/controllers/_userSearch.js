/* @ngInject */
const userSearch = ($q, $scope, dataService, userDataCache) => {
    init();

    $scope.getUserInfo = getUserInfo;

    function init() {
        $scope.userData = userDataCache.getData() || {};
    }

    function getUserInfo() {
        $q
            .all([
                dataService.loadUserData($scope.login),
                dataService.loadUserFollowers($scope.login, 1),
                dataService.loadUserFollowingList($scope.login, 1),
                dataService.loadNumberOfStarredRepositories($scope.login),
                dataService.loadListOfRepositories($scope.login),
            ])
            .then((dataArray) => {
                [
                    $scope.userData,
                    $scope.userData.followersList,
                    $scope.userData.followingList,
                    $scope.userData.starredReposCount,
                    $scope.userData.repositoriesList,
                ] = dataArray;

                $scope.errorMessage = '';
            })
            .catch((error) => {
                $scope.errorMessage = error.message;
            });
    }
};

export default userSearch;
