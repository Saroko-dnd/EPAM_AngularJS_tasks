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
    console.log('repositories INIT');
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
        console.log('loadRepositories');

        const cachedRepositoriesData = userDataCache.getPageData(
            'repositories',
            $scope.page,
            $stateParams.login,
        );

        if (!cachedRepositoriesData) {
            userDataService
                .loadListOfRepositories(
                    $stateParams.login,
                    $scope.page,
                    $scope.itemsPerPage,
                )
                .then((data) => {
                    $scope.userData.repositoriesList.push(...data);
                });
        } else {
            $scope.userData.repositoriesList.push(...cachedRepositoriesData);
        }

        $scope.page += 1;
    }
};

export default repositories;
