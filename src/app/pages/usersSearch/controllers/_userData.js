/* @ngInject */
const userData = (
    $timeout,
    $stateParams,
    $location,
    $q,
    $anchorScroll,
    $scope,
    $state,
    userDataService,
    userDataCache,
    userDataTabsIndexes,
) => {
    $scope.tabChanged = tabChanged;
    $scope.loadFollowers = loadFollowers;
    $scope.loadFollowing = loadFollowing;
    $scope.loadRepositories = loadRepositories;
    $scope.$anchorScroll = $anchorScroll;

    $scope.pagination = {
        itemsPerPage: 5,
        pagesLimit: 10,
    };

    init();

    function init() {
        $scope.userData = userDataCache.getUserData($stateParams.login);

        if ($scope.userData) {
            selectUserDataByParams($stateParams.login);
        } else {
            userDataService.loadUserData($stateParams.login).then(
                (newUserData) => {
                    $scope.userData = newUserData;
                    $scope.errorMessage = '';

                    selectUserDataByParams($stateParams.login);
                },
                (errorResponse) => {
                    $scope.userData = errorResponse.data;
                },
            );
        }
    }

    function loadFollowers() {
        loadUserData('followers', $scope.userData.followersPage);
    }

    function loadFollowing() {
        loadUserData('following', $scope.userData.followingPage);
    }

    function loadRepositories() {
        loadUserData('repositories', $scope.userData.repositoriesPage);
    }

    function loadUserData(tabName, page) {
        $state.go('usersSearch.result', {
            login: $scope.userData.login,
            tabName,
            page: page || 1,
            '#': 'scrollTarget',
        });
    }

    function tabChanged(tabIndex) {
        switch (tabIndex) {
        case 0:
            loadFollowers();
            break;
        case 1:
            loadFollowing();
            break;
        case 2:
            loadRepositories();
            break;
        default:
            break;
        }
    }

    function selectUserDataByParams(userLogin) {
        $scope.userData[
            `${$stateParams.tabName}List`
        ] = userDataCache.getPageData(
            $stateParams.tabName,
            $stateParams.page,
            $stateParams.login,
        );
        $scope.userData[`${$stateParams.tabName}Page`] = $stateParams.page;
        $scope.activeTab = userDataTabsIndexes[$stateParams.tabName];

        if (!$scope.userData[`${$stateParams.tabName}List`]) {
            switch ($stateParams.tabName) {
            case 'followers':
                userDataService
                    .loadUserFollowers(
                        userLogin,
                        $stateParams.page,
                        $scope.pagination.itemsPerPage,
                    )
                    .then((data) => {
                        $scope.userData.followersList = data;
                    });
                break;
            case 'following':
                userDataService
                    .loadUserFollowingList(
                        userLogin,
                        $stateParams.page,
                        $scope.pagination.itemsPerPage,
                    )
                    .then((data) => {
                        $scope.userData.followingList = data;
                    });
                break;
            case 'repositories':
                userDataService
                    .loadListOfRepositories(
                        userLogin,
                        $stateParams.page,
                        $scope.pagination.itemsPerPage,
                    )
                    .then((dataArray) => {
                        $scope.userData.repositoriesList = dataArray;
                        $scope.errorMessage = '';
                    });
                break;
            default:
                break;
            }
        }
    }
};

export default userData;
