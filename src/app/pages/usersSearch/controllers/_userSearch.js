/* @ngInject */
const userSearch = (
    $state,
    $scope,
    userDataService,
    userDataCache,
    KeyCodes,
) => {
    $scope.getUserInfo = getUserInfo;
    $scope.login = '';
    $scope.KeyCodes = KeyCodes;

    init();

    function init() {}

    function getUserInfo() {
        $state.go(
            'usersSearch.result',
            {
                tabName: 'followers',
                login: $scope.login,
                itemsPerPage: 5,
                pagesLimit: 10,
                '#': 'scrollTarget',
                page: 1,
                search: true,
            },
            { location: false },
        );
    }
};

export default userSearch;
