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
            order: reposSortConfigs[$scope.selectedSortOption].order,
            sort: reposSortConfigs[$scope.selectedSortOption].sort,
        });
    }
};

export default repositoriesSearch;
