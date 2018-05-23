/* @ngInject */
const userData = ($stateParams, $scope, $state, $location, userDataService) => {
    $scope.$state = $state;
    $scope.$stateParams = $stateParams;
    $scope.$location = $location;

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
