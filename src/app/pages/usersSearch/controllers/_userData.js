/* @ngInject */
const userData = (
    $stateParams,
    $scope,
    $state,
    userDataService,
    userDataCache,
    // userDataTabsIndexes,
) => {
    // $scope.tabChanged = tabChanged;
    // $scope.tabs = { activeTab: -1 };
    console.log('userData INIT');
    console.log($stateParams);
    $scope.activeTab = -1;

    init();

    function init() {
        $scope.userData = userDataCache.getUserData($stateParams.login);

        if (!$scope.userData) {
            userDataService.loadUserData($stateParams.login).then(
                (newUserData) => {
                    $scope.userData = newUserData;
                    $scope.errorMessage = '';

                    loadUserData();
                },
                (errorResponse) => {
                    $scope.userData = errorResponse.data;
                },
            );
        } else {
            loadUserData();
        }

        // $scope.tabs.activeTab = userDataTabsIndexes[$stateParams.tabName];
        console.log(`set activeTab ${$scope.activeTab}`);
    }

    /* function tabChanged(tabIndex) {
        console.log('tabChanged');
        console.log(tabIndex);

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
    } */

    function loadUserData(tabName = $stateParams.tabName) {
        if ($scope.userData) {
            console.log('userData LOADING');
            console.log(tabName);
            $state.go(
                `usersSearch.result.${tabName}List`,
                {
                    '#': 'userDataTabs',
                } /* ,
                { location: false } */,
            );
        }
    }
};

export default userData;
