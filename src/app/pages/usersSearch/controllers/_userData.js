/* @ngInject */
const userData = (
    $timeout,
    $stateParams,
    $location,
    $anchorScroll,
    $q,
    $scope,
    $state,
    dataService,
    userDataCache,
) => {
    // $scope.getUserInfo = getUserInfo;
    $scope.tabChanged = tabChanged;
    $scope.loadFollowers = loadFollowers;
    $scope.loadFollowing = loadFollowing;
    $scope.loadRepositories = loadRepositories;

    $scope.pagination = {
        itemsPerPage: 5,
        pagesLimit: 10,
    };

    init();

    function init() {
        $scope.userData = userDataCache.getData();

        if (
            !$scope.userData ||
            ($scope.login &&
                $scope.login.toLowerCase() !== $stateParams.login.toLowerCase())
        ) {
            dataService.loadUserData($scope.login).then(
                (newUserData) => {
                    $scope.userData = newUserData;
                    $scope.errorMessage = '';

                    selectUserDataByParams($scope.login);
                },
                (errorResponse) => {
                    $scope.userData = errorResponse.data;
                },
            );
        } else {
            selectUserDataByParams($stateParams.login);
        }

        scrollDown();

        // activatePaging();
    }

    function scrollDown() {
        $timeout(
            () => {
                $location.hash('bottom');
                $anchorScroll();
            },
            0,
            false,
        );
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
            page,
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
        switch ($stateParams.tabName) {
        case 'followers':
            $scope.activeTab = 0;
            $scope.userData.followersPage = $stateParams.page;
            dataService
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
            $scope.activeTab = 1;
            $scope.userData.followingPage = $stateParams.page;
            dataService
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
            $scope.activeTab = 2;
            $scope.userData.repositoriesPage = $stateParams.page;
            $q
                .all([
                    dataService.loadNumberOfStarredRepositories($stateParams.login),
                    dataService.loadListOfRepositories(
                        userLogin,
                        $stateParams.page,
                        $scope.pagination.itemsPerPage,
                    ),
                ])
                .then((dataArray) => {
                    [
                        $scope.userData.starredReposCount,
                        $scope.userData.repositoriesList,
                    ] = dataArray;

                    $scope.errorMessage = '';
                });
            break;
        default:
            break;
        }
    }
};

export default userData;
