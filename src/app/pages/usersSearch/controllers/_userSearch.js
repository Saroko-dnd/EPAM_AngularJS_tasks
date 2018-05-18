/* @ngInject */
const userSearch = (
    $state,
    $rootScope,
    $scope,
    userDataService,
    userDataCache,
    KeyCodes,
) => {
    $scope.getUserInfo = getUserInfo;
    $scope.login = '';
    $scope.KeyCodes = KeyCodes;
    $rootScope.$state = $state;

    init();

    function init() {}

    function getUserInfo() {
        $state.go(
            'usersSearch.result',
            {
                login: $scope.login,
                '#': 'userDataTabs',
            },
            { location: true },
        );
    }
};

export default userSearch;
