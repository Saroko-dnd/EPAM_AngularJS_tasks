/* @ngInject */
const repositories = (
    $state,
    $scope,
    $stateParams,
    $anchorScroll,
    userDataCache,
    userDataService,
) => {
    let firstDataLoading = true;
    let loadingInProgress = false;

    $scope.loadRepositories = loadRepositories;
    $scope.itemsPerPage = 20;
    $scope.anchorScroll = anchorScroll;
    $scope.page = 1;

    init();

    function init() {
        userDataService.loadUserData($stateParams.login).then(
            (newUserData) => {
                $scope.userData = newUserData;
                $scope.errorMessage = '';
                $scope.userData.repositoriesList = [];

                loadRepositories();
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

    function loadRepositories() {
        if (!loadingInProgress) {
            loadingInProgress = true;
            userDataService
                .loadListOfRepositories(
                    $stateParams.login,
                    $scope.page,
                    $scope.itemsPerPage,
                )
                .then((data) => {
                    $scope.userData.repositoriesList.push(...data);
                    loadingInProgress = false;
                });

            $scope.page += 1;
        }
    }
};

export default repositories;
