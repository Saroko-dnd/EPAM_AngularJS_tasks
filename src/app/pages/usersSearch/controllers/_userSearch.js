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

    console.log('userSearch init');

    init();

    function init() {}

    function getUserInfo() {
        console.log('userSearch LOADING');

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
