/* @ngInject */
const repositoriesSearch = (
    $state,
    $scope,
    KeyCodes,
    reposSortOptions,
    reposSortConfigs,
) => {
    $scope.getRepositoriesInfo = getRepositoriesInfo;
    $scope.keyCodes = KeyCodes;

    $scope.sortOptions = reposSortOptions;
    [$scope.selectedSortOption] = reposSortOptions;

    function getRepositoriesInfo() {
        $state.go('repositoriesSearch.result', {
            keyword: $scope.reposSearchKeyword,
            sortOptions: reposSortConfigs[$scope.selectedSortOption],
        });
    }
};

export default repositoriesSearch;
