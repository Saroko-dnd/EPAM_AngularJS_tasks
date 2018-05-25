/* @ngInject */
const repositoriesSearch = (
    $state,
    $scope,
    $transitions,
    KeyCodes,
    reposSortOptions,
    reposSortConfigs,
) => {
    $scope.getRepositoriesInfo = getRepositoriesInfo;
    $scope.keyCodes = KeyCodes;

    $scope.sortOptions = reposSortOptions;
    [$scope.selectedSortOption] = reposSortOptions;

    console.log('repositoriesSearch INIT');

    init();

    function init() {
        setHooksForStateParams();
    }

    function setHooksForStateParams() {
        const unregisterTransitionHook = $transitions.onSuccess(
            {},
            (transition) => {
                const transitionParams = transition.params();

                $scope.reposSearchKeyword = transitionParams.keyword;

                $scope.selectedSortOption = reposSortOptions.find(option =>
                    reposSortConfigs[option].sort ===
                            (transitionParams.sort || null) &&
                        reposSortConfigs[option].order ===
                            (transitionParams.order || null));
            },
        );

        $scope.$on('$destroy', () => {
            unregisterTransitionHook();
        });
    }

    function getRepositoriesInfo() {
        $state.go('repositoriesSearch.result', {
            keyword: $scope.reposSearchKeyword,
            order: reposSortConfigs[$scope.selectedSortOption].order,
            sort: reposSortConfigs[$scope.selectedSortOption].sort,
        });
    }
};

export default repositoriesSearch;
