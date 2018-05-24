/* @ngInject */
const tabData = ($scope, $stateParams, userDataService) => {
    $scope.metaDataList = $stateParams.metaDataList;
    $scope.title = $stateParams.title;

    init();

    function init() {
        switch ($stateParams.tabName) {
        case 'followers':
            $scope.loadDataCallback = userDataService.loadUserFollowers.bind(userDataService);
            break;
        case 'following':
            $scope.loadDataCallback = userDataService.loadUserFollowingList.bind(userDataService);
            break;
        case 'repositories':
            $scope.loadDataCallback = userDataService.loadListOfRepositories.bind(userDataService);
            break;
        default:
            $scope.loadDataCallback = userDataService.loadUserFollowers.bind(userDataService);
        }
    }
};

export default tabData;
