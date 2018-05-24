/* @ngInject */
const repositoriesData = (
    $state,
    $scope,
    $stateParams,
    repositoriesDataService,
) => {
    const repositoriesPerPage = 100;
    let currentRepositoriesPage = 1;

    $scope.allDataIsLoaded = false;
    $scope.loadingInProgress = false;
    $scope.Date = Date;
    $scope.loadRepositories = loadRepositories;

    init();

    function init() {
        loadRepositories();
    }

    function loadRepositories() {
        if (!$scope.loadingInProgress && !$scope.allDataIsLoaded) {
            $scope.loadingInProgress = true;

            repositoriesDataService
                .loadRepositoriesData(
                    $stateParams.keyword,
                    currentRepositoriesPage,
                    repositoriesPerPage,
                    $stateParams.sort,
                    $stateParams.order,
                )
                .then(
                    (newRepositoriesData) => {
                        if (!$scope.repositoriesData) {
                            $scope.repositoriesData = newRepositoriesData;
                        } else if (!newRepositoriesData.items.length) {
                            $scope.allDataIsLoaded = true;
                        } else {
                            $scope.repositoriesData.items.push(...newRepositoriesData.items);
                        }

                        $scope.errorMessage = '';
                        $scope.loadingInProgress = false;

                        currentRepositoriesPage += 1;
                    },
                    (errorResponse) => {
                        $scope.errorMessage = errorResponse.message;
                        $scope.loadingInProgress = false;
                    },
                );
        }
    }
};

export default repositoriesData;
