/* @ngInject */
const repositories = (
    $state,
    $scope,
    $stateParams,
    userDataCache,
    userDataService,
) => {
    $scope.userData = $stateParams.userData;
    $scope.pageChangedc = pageChanged;

    $scope.pagination = {
        itemsPerPage: $stateParams.itemsPerPage,
        pagesLimit: $stateParams.pagesLimit,
    };

    init();

    function init() {
        $scope.userData.repositoriesPage =
            $stateParams.tabName === 'repositories' && ($stateParams.page || 1);

        loadRepositories();
    }

    function pageChanged() {
        $state.go('usersSearch.result.userDataLists', {
            login: $stateParams.login,
            tabName: 'repositories',
            page: $scope.userData.repositoriesPage,
            userData: $scope.userData,
            itemsPerPage: 5,
            pagesLimit: 10,
            '#': 'scrollTarget',
        });
    }

    function loadRepositories() {
        $scope.userData.repositoriesList = userDataCache.getPageData(
            $stateParams.tabName,
            $scope.userData.repositoriesPage,
            $stateParams.login,
        );

        if (!$scope.userData.repositoriesList) {
            userDataService
                .loadListOfRepositories(
                    $stateParams.login,
                    $scope.userData.repositoriesPage,
                    $stateParams.itemsPerPage,
                )
                .then((data) => {
                    $scope.userData.repositoriesList = data;
                });
        }
    }
};

export default repositories;
