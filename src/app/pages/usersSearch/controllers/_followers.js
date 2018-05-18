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
    }

    function loadFollowers() {
        if (!loadingInProgress) {
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

            $scope.page += 1;
        }
    }
};

export default followers;
