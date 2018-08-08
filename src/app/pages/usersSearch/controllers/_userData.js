/* @ngInject */
const userData = (
    $stateParams,
    $scope,
    $state,
    $location,
    userDataService,
    userDataTabsIndexes,
) => {
    $scope.$state = $state;
    $scope.$stateParams = $stateParams;
    $scope.$location = $location;
    $scope.$stateParams = $stateParams;
    $scope.loadingInProgress = true;

    $scope.userDataTabsIndexes = userDataTabsIndexes;
    $scope.activeTab = -1;

    init();

    function init() {
        userDataService.loadUserData($stateParams.login).then(
            (newUserData) => {
                $scope.userData = newUserData;
                $scope.errorMessage = '';
                $scope.loadingInProgress = false;
            },
            (errorResponse) => {
                $scope.userData = errorResponse.data;
                $scope.loadingInProgress = false;
            },
        );
    }
};

export default userData;
