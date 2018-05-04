/* @ngInject */
const userSearch = ($state, $scope, userDataCache, KeyCodes) => {
    $scope.getUserInfo = getUserInfo;
    $scope.login = '';
    $scope.KeyCodes = KeyCodes;

    init();

    function init() {
        const userData = userDataCache.getData();

        if (userData) {
            $state.go('usersSearch.result', {
                login: userData.login,
                tabName: userData.lastOpenedCategory,
                page: userData[`${userData.lastOpenedCategory}Page`],
            });
        }
    }

    function getUserInfo() {
        $state.go('usersSearch.result', {
            login: $scope.login,
            tabName: 'followers',
            page: 1,
        });
    }
};

export default userSearch;
