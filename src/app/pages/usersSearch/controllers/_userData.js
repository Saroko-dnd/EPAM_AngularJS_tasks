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

        if (
            $state.includes('usersSearch.result.data', {
                tabName: 'followers',
            })
        ) {
            $scope.activeTab = userDataTabsIndexes.followers;
        } else if (
            $state.includes('usersSearch.result.data', {
                tabName: 'following',
            })
        ) {
            $scope.activeTab = userDataTabsIndexes.following;
        } else if (
            $state.includes('usersSearch.result.data', {
                tabName: 'repositories',
            })
        ) {
            $scope.activeTab = userDataTabsIndexes.repositories;
        }
    }
};

export default userData;
