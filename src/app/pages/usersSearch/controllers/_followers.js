/* @ngInject */
const followers = (
    $state,
    $scope,
    $stateParams,
    $anchorScroll,
    userDataCache,
    userDataService,
) => {
    let firstDataLoading = true;
    let loadingInProgress = false;

    $scope.loadFollowers = loadFollowers;
    $scope.itemsPerPage = 20;
    $scope.anchorScroll = anchorScroll;
    $scope.page = 1;

    init();

    function anchorScroll() {
        if (firstDataLoading) {
            $anchorScroll();
            firstDataLoading = false;
        }
    }

    function init() {
        if ($stateParams.userData) {
            $scope.userData = $stateParams.userData;
            $scope.userData.followersList = [];
        } else {
            $scope.userData = userDataCache.getUserData($stateParams.login);

            if (!$scope.userData) {
                userDataService.loadUserData($stateParams.login).then(
                    (newUserData) => {
                        $scope.userData = newUserData;
                        $scope.errorMessage = '';
                        $scope.userData.followersList = [];

                        loadFollowers();
                    },
                    (errorResponse) => {
                        $scope.userData = errorResponse.data;
                    },
                );
            } else {
                $scope.userData.followersList = [];

                loadFollowers();
            }
        }
    }

    function loadFollowers() {
        if (!loadingInProgress) {
            const cachedFollowersData = userDataCache.getPageData(
                'followers',
                $scope.page,
                $stateParams.login,
            );

            if (!cachedFollowersData) {
                loadingInProgress = true;
                userDataService
                    .loadUserFollowers(
                        $stateParams.login,
                        $scope.page,
                        $stateParams.itemsPerPage,
                    )
                    .then((data) => {
                        $scope.userData.followersList.push(...data);
                        loadingInProgress = false;
                    });
            } else {
                $scope.userData.followersList.push(...cachedFollowersData);
            }

            $scope.page += 1;
        }
    }
};

export default followers;
