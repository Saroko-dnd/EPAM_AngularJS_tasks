/* @ngInject */
const repositoriesData = (
    $state,
    $scope,
    $stateParams,
    repositoriesDataService,
) => {
    init();

    function init() {
        repositoriesDataService.loadRepositoriesData($stateParams.keyword).then(
            (newRepositoriesData) => {
                $scope.repositoriesData = newRepositoriesData;
                $scope.errorMessage = '';
            },
            (errorResponse) => {
                $scope.repositoriesData = errorResponse;
            },
        );
    }
};

export default repositoriesData;
