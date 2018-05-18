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
    }

    function anchorScroll() {
        if (firstDataLoading) {
            $anchorScroll();
            firstDataLoading = false;
        }
    }

    function loadFollowing() {
        if (!loadingInProgress) {
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

            $scope.page += 1;
        }
    }
};

export default following;
