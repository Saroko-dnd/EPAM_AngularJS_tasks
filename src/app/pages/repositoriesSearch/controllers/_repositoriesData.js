/* @ngInject */
const repositoriesData = (
    $state,
    $scope,
    $stateParams,
    repositoriesDataService,
) => {
    const repositoriesPerPage = 100;
    let currentRepositoriesPage = 1;
    let loadingInProgress = true;

    $scope.loadRepositories = loadRepositories;

    init();

    function init() {
        repositoriesDataService
            .loadRepositoriesData($stateParams.keyword, 0, repositoriesPerPage)
            .then(
                (newRepositoriesData) => {
                    $scope.repositoriesData = newRepositoriesData;
                    $scope.errorMessage = '';
                    loadingInProgress = false;
                },
                (errorResponse) => {
                    $scope.errorMessage = errorResponse.message;
                    loadingInProgress = false;
                },
            );
    }

    function loadRepositories(page = currentRepositoriesPage) {
        if (!loadingInProgress) {
            loadingInProgress = true;

            repositoriesDataService
                .loadRepositoriesData(
                    $stateParams.keyword,
                    page,
                    repositoriesPerPage,
                )
                .then((newRepositoriesData) => {
                    $scope.repositoriesData.items.push(...newRepositoriesData.items);
                    loadingInProgress = false;
                });

            currentRepositoriesPage += 1;
        }
    }
};

export default repositoriesData;
