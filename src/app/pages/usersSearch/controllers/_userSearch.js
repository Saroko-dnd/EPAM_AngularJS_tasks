/* @ngInject */
const userSearch = (
    $state,
    $rootScope,
    $scope,
    $cookies,
    $location,
    $stateParams,
    $transitions,
    userDataService,
    userDataTabsIndexes,
    userDataCache,
    KeyCodes,
) => {
    $scope.getUserInfo = getUserInfo;
    $scope.login = $stateParams.login || '';
    $scope.KeyCodes = KeyCodes;
    $rootScope.$state = $state;

    init();

    function init() {
        setHooksForStateParams();
    }

    function setHooksForStateParams() {
        const unregisterTransitionHook = $transitions.onSuccess(
            {},
            (transition) => {
                $scope.login = transition.params().login;
            },
        );

        $scope.$on('$destroy', () => {
            unregisterTransitionHook();
        });
    }

    function getUserInfo() {
        // $cookies.put($location.absUrl(), $scope.login);
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
