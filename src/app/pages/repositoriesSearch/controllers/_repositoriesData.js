/* @ngInject */
const repositoriesData = (
    $state,
    $scope,
    $stateParams,
    repositoriesDataService,
) => {
    init();

    function init() {
        console.log('repositoriesData INIT');
        repositoriesDataService.loadRepositoriesData($stateParams.keyword).then(
            (newRepositoriesData) => {
                $scope.repositoriesData = newRepositoriesData;
                $scope.errorMessage = '';
                console.log('repositoriesData SUCCESS');
                console.log(newRepositoriesData);
            },
            (errorResponse) => {
                $scope.repositoriesData = errorResponse;
                console.log('repositoriesData FAIL');
            },
        );
    }
};

export default repositoriesData;
