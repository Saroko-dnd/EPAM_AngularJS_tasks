/* @ngInject */
const repositoriesData = (
    $state,
    $scope,
    $stateParams,
    repositoriesDataService,
) => {
    const repositoriesPerPage = 100;
    let currentRepositoriesPage = 1;
    let loadingInProgress = false;

    $scope.Date = Date;
    $scope.loadRepositories = loadRepositories;

    init();
    console.log('repositoriesData init');
    function init() {
        loadRepositories();
    }

    function loadRepositories() {
        console.log('repositoriesData loading');
        if (!loadingInProgress) {
            loadingInProgress = true;

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
                        } else {
                            $scope.repositoriesData.items.push(...newRepositoriesData.items);
                        }
                        $scope.errorMessage = '';
                        loadingInProgress = false;

                        currentRepositoriesPage += 1;
                    },
                    (errorResponse) => {
                        $scope.errorMessage = errorResponse.message;
                        loadingInProgress = false;
                    },
                );
        }
    }
};

export default repositoriesData;
