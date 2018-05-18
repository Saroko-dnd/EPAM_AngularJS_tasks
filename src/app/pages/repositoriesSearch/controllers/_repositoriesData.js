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
                console.log($scope.repositoriesData);
                $scope.errorMessage = '';
            },
            (errorResponse) => {
                $scope.errorMessage = errorResponse.message;
            },
        );
    }
};

export default repositoriesData;
