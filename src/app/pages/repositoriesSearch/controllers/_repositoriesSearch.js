/* @ngInject */
const repositoriesSearch = ($state, $scope, KeyCodes) => {
    $scope.getRepositoriesInfo = getRepositoriesInfo;
    $scope.keyCodes = KeyCodes;

    init();

    function init() {}

    function getRepositoriesInfo() {
        $state.go('repositoriesSearch.result', {
            keyword: $scope.reposSearchKeyword,
        });
    }
};

export default repositoriesSearch;
