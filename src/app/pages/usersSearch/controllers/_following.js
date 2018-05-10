/* @ngInject */
const following = (
    $state,
    $scope,
    $stateParams,
    userDataCache,
    userDataService,
) => {
    $scope.userData = $stateParams.userData;
    $scope.pageChangedb = pageChanged;

    $scope.pagination = {
        itemsPerPage: $stateParams.itemsPerPage,
        pagesLimit: $stateParams.pagesLimit,
    };

    init();

    function init() {
        $scope.userData.followingPage =
            $stateParams.tabName === 'following' && ($stateParams.page || 1);

        loadFollowing();
    }

    function pageChanged() {
        $state.go('usersSearch.result.userDataLists', {
            login: $stateParams.login,
            tabName: 'following',
            page: $scope.userData.followingPage,
            userData: $scope.userData,
            itemsPerPage: 5,
            pagesLimit: 10,
            '#': 'scrollTarget',
        });
    }

    function loadFollowing() {
        $scope.userData.followingList = userDataCache.getPageData(
            $stateParams.tabName,
            $scope.userData.followingPage,
            $stateParams.login,
        );

        if (!$scope.userData.followingList) {
            userDataService
                .loadUserFollowingList(
                    $stateParams.login,
                    $scope.userData.followingPage,
                    $stateParams.itemsPerPage,
                )
                .then((data) => {
                    $scope.userData.followingList = data;
                });
        }
    }
};

export default following;
