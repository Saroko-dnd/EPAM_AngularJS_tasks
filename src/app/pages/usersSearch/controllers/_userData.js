/* @ngInject */
const userData = ($stateParams, $q, $scope, dataService, userDataCache) => {
    $scope.getUserInfo = getUserInfo;

    init();

    function init() {
        $scope.userData = userDataCache.getData();

        if (!$scope.userData || $scope.userData.login !== $stateParams.login) {
            getUserInfo();
        }
    }

    function getUserInfo() {
        $q
            .all([
                dataService.loadUserData($stateParams.login),
                dataService.loadUserFollowers($stateParams.login, 1),
                dataService.loadUserFollowingList($stateParams.login, 1),
                dataService.loadNumberOfStarredRepositories($stateParams.login),
                dataService.loadListOfRepositories($stateParams.login),
            ])
            .then(
                (dataArray) => {
                    [
                        $scope.userData,
                        $scope.userData.followersList,
                        $scope.userData.followingList,
                        $scope.userData.starredReposCount,
                        $scope.userData.repositoriesList,
                    ] = dataArray;

                    $scope.errorMessage = '';
                },
                (errorResponse) => {
                    $scope.userData = errorResponse.data;
                },
            );
    }
};

export default userData;
