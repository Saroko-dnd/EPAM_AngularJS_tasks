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
