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
        if ($stateParams.userData) {
            $scope.userData = $stateParams.userData;
            $scope.userData.repositoriesList = [];
        } else {
            $scope.userData = userDataCache.getUserData($stateParams.login);

            if (!$scope.userData) {
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
            } else {
                $scope.userData.repositoriesList = [];

                loadRepositories();
            }
        }
    }

    function anchorScroll() {
        if (firstDataLoading) {
            $anchorScroll();
            firstDataLoading = false;
        }
    }

    function loadRepositories() {
        if (!loadingInProgress) {
            const cachedRepositoriesData = userDataCache.getPageData(
                'repositories',
                $scope.page,
                $stateParams.login,
            );

            if (!cachedRepositoriesData) {
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
            } else {
                $scope.userData.repositoriesList.push(...cachedRepositoriesData);
            }

            $scope.page += 1;
        }
    }
};

export default repositories;
