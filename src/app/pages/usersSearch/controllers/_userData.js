/* @ngInject */
const userData = (
    $stateParams,
    $scope,
    $state,
    userDataService,
    userDataCache,
) => {
    $scope.activeTab = -1;
    $scope.$state = $state;

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
    }

    function loadUserData(tabName = $stateParams.tabName) {
        if ($scope.userData) {
            $state.go(`usersSearch.result.${tabName}List`, {
                '#': 'userDataTabs',
            });
        }
    }
};

export default userData;
