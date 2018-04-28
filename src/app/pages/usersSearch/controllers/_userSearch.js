/* @ngInject */
const userSearch = ($state, $scope, userDataCache) => {
    $scope.getUserInfo = getUserInfo;

    init();

    function init() {
        const userData = userDataCache.getData();

        if (userData) {
            $state.go('usersSearch.result', {
                login: userDataCache.getData().login,
            });
        }
    }

    function getUserInfo() {
        $state.go('usersSearch.result', { login: $scope.login });
    }
};

export default userSearch;
