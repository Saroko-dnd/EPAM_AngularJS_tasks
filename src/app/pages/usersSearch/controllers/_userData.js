/* @ngInject */
const userData = ($stateParams, $q, $scope, dataService, userDataCache) => {
    $scope.getUserInfo = getUserInfo;

    $scope.pagination = {
        itemsPerPage: 5,
        pagesLimit: 10,
    };

    init();

    function init() {
        $scope.userData = userDataCache.getData();

        if (!$scope.userData || $scope.userData.login !== $stateParams.login) {
            getUserInfo();
        }

        $scope.$watch('userData.followersPage', () => {
            if ($scope.userData) {
                setPagingData(
                    $scope.userData.followersPage,
                    $scope.userData.followersList,
                    'loadUserFollowers',
                );
            }
        });

        $scope.$watch('userData.followingPage', () => {
            if ($scope.userData) {
                setPagingData(
                    $scope.userData.followingPage,
                    $scope.userData.followingList,
                    'loadUserFollowingList',
                );
            }
        });

        $scope.$watch('userData.repositoriesPage', () => {
            if ($scope.userData) {
                setPagingData(
                    $scope.userData.repositoriesPage,
                    $scope.userData.repositoriesList,
                    'loadListOfRepositories',
                );
            }
        });
    }

    function setPagingData(page, pageDataArray, loadDataFunctionName) {
        if (pageDataArray) {
            pageDataArray.length = 0;
            dataService[loadDataFunctionName](
                $stateParams.login,
                page,
                $scope.pagination.itemsPerPage,
            ).then((data) => {
                pageDataArray.push(...data);
            });
        }
    }

    function getUserInfo() {
        $q
            .all([
                dataService.loadUserData($stateParams.login),
                dataService.loadUserFollowers(
                    $stateParams.login,
                    1,
                    $scope.pagination.itemsPerPage,
                ),
                dataService.loadUserFollowingList(
                    $stateParams.login,
                    1,
                    $scope.pagination.itemsPerPage,
                ),
                dataService.loadNumberOfStarredRepositories($stateParams.login),
                dataService.loadListOfRepositories(
                    $stateParams.login,
                    1,
                    $scope.pagination.itemsPerPage,
                ),
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
