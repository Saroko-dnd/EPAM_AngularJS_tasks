/* @ngInject */
const followers = (
    $state,
    $scope,
    $stateParams,
    userDataCache,
    userDataService,
) => {
    $scope.userData = $stateParams.userData;
    $scope.pageChangeda = pageChanged;

    $scope.pagination = {
        itemsPerPage: $stateParams.itemsPerPage,
        pagesLimit: $stateParams.pagesLimit,
    };

    init();

    function init() {
        $scope.userData.followersPage =
            $stateParams.tabName === 'followers' && ($stateParams.page || 1);

        loadFollowers();
    }

    function pageChanged() {
        $state.go('usersSearch.result.userDataLists', {
            login: $stateParams.login,
            tabName: 'followers',
            page: $scope.userData.followersPage,
            userData: $scope.userData,
            itemsPerPage: 5,
            pagesLimit: 10,
            '#': 'scrollTarget',
        });
    }

    function loadFollowers() {
        $scope.userData.followersList = userDataCache.getPageData(
            $stateParams.tabName,
            $scope.userData.followersPage,
            $stateParams.login,
        );

        if (!$scope.userData.followersList) {
            userDataService
                .loadUserFollowers(
                    $stateParams.login,
                    $scope.userData.followersPage,
                    $stateParams.itemsPerPage,
                )
                .then((data) => {
                    $scope.userData.followersList = data;
                });
        }
    }
};

export default followers;
