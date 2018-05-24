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

    $scope.userDataTabsIndexes = userDataTabsIndexes;
    $scope.activeTab = -1;

    init();

    function init() {
        userDataService.loadUserData($stateParams.login).then(
            (newUserData) => {
                $scope.userData = newUserData;
                $scope.errorMessage = '';
            },
            (errorResponse) => {
                $scope.userData = errorResponse.data;
            },
        );
    }
};

export default userData;
