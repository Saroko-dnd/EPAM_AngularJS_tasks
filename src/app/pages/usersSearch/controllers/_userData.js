/* @ngInject */
const userData = ($stateParams, $scope, $state, userDataService) => {
    $scope.activeTab = -1;
    $scope.$state = $state;

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
