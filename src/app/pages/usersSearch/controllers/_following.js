/* @ngInject */
const following = (
    $state,
    $scope,
    $stateParams,
    $anchorScroll,
    userDataCache,
    userDataService,
) => {
    let firstDataLoading = true;
    let loadingInProgress = false;

    $scope.loadFollowing = loadFollowing;
    $scope.itemsPerPage = 20;
    $scope.anchorScroll = anchorScroll;
    $scope.page = 1;

    init();

    function init() {
        if ($stateParams.userData) {
            $scope.userData = $stateParams.userData;
            $scope.userData.followingList = [];
        } else {
            $scope.userData = userDataCache.getUserData($stateParams.login);

            if (!$scope.userData) {
                userDataService.loadUserData($stateParams.login).then(
                    (newUserData) => {
                        $scope.userData = newUserData;
                        $scope.errorMessage = '';
                        $scope.userData.followingList = [];

                        loadFollowing();
                    },
                    (errorResponse) => {
                        $scope.userData = errorResponse.data;
                    },
                );
            } else {
                $scope.userData.followingList = [];

                loadFollowing();
            }
        }
    }

    function anchorScroll() {
        if (firstDataLoading) {
            $anchorScroll();
            firstDataLoading = false;
        }
    }

    function loadFollowing() {
        if (!loadingInProgress) {
            console.log('loadFollowing');
            const cachedFollowingData = userDataCache.getPageData(
                'following',
                $scope.page,
                $stateParams.login,
            );

            if (!cachedFollowingData) {
                loadingInProgress = true;

                userDataService
                    .loadUserFollowingList(
                        $stateParams.login,
                        $scope.page,
                        $scope.itemsPerPage,
                    )
                    .then((data) => {
                        $scope.userData.followingList.push(...data);
                        loadingInProgress = false;
                    });
            } else {
                $scope.userData.followingList.push(...cachedFollowingData);
            }

            $scope.page += 1;
        }
    }
};

export default following;
