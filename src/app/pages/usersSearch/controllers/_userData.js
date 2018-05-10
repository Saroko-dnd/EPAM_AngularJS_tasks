/* @ngInject */
const userData = (
    $stateParams,
    $scope,
    $state,
    userDataService,
    userDataCache,
    userDataTabsIndexes,
) => {
    $scope.tabChanged = tabChanged;
    $scope.tabDataPage = $stateParams.page;

    init();

    function init() {
        $scope.userData = userDataCache.getUserData($stateParams.login);

        if (!$scope.userData) {
            userDataService.loadUserData($stateParams.login).then(
                (newUserData) => {
                    $scope.userData = newUserData;
                    $scope.errorMessage = '';

                    activateViewForUserData();
                },
                (errorResponse) => {
                    $scope.userData = errorResponse.data;
                },
            );
        } else {
            activateViewForUserData();
        }

        $scope.activeTab = userDataTabsIndexes[$stateParams.tabName];
    }

    function activateViewForUserData() {
        $state.go('usersSearch.result.userDataLists', {
            tabName: $stateParams.tabName || 'followers',
            userData: $scope.userData,
            login: $scope.userData.login,
            page: $stateParams.page,
            '#': 'scrollTarget',
        });
    }

    function tabChanged(tabIndex) {
        switch (tabIndex) {
        case 0:
            loadUserData('followers');
            break;
        case 1:
            loadUserData('following');
            break;
        case 2:
            loadUserData('repositories');
            break;
        default:
            break;
        }
    }

    function loadUserData(tabName) {
        $state.go('usersSearch.result.userDataLists', {
            login: $stateParams.login,
            tabName,
            userData: $scope.userData,
            itemsPerPage: 5,
            page: $scope.tabDataPage,
            pagesLimit: 10,
            '#': 'scrollTarget',
        });

        $scope.tabDataPage = 1;
    }
};

export default userData;
