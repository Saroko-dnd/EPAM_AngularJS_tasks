/* @ngInject */
const userSearch = ($scope, dataService) => {
    $scope.avatarUrl = null;
    $scope.login = null;
    $scope.username = null;
    $scope.errorMessage = null;
    $scope.followers = null;
    $scope.followersCount = null;
    $scope.followingCount = null;
    $scope.followingList = null;
    $scope.repositoriesCount = null;
    $scope.starredReposCount = null;
    $scope.userFound = false;

    $scope.isUserFound = () => !$scope.userFound;

    $scope.getUserInfo = () => {
        dataService
            .getUserData($scope.login)
            .then((userData) => {
                $scope.username = userData.name;
                $scope.avatarUrl = userData.avatar_url;
                $scope.followersCount = userData.followers;
                $scope.followingCount = userData.following;
                $scope.repositoriesCount = userData.public_repos;
                $scope.userFound = true;
                // console.log(userData);
            })
            .then(() => dataService.getUserFollowers($scope.login, 1))
            .then((followers) => {
                $scope.followers = followers;
            })
            .then(() => dataService.getUserFollowingList($scope.login, 1))
            .then((users) => {
                $scope.followingList = users;
            })
            .then(() =>
                dataService.getStarredRepositories($scope.login, 1, 10000))
            .then((repositories) => {
                $scope.starredReposCount = repositories.length;
                // console.log(repositories);
            })
            .then(() => {
                $scope.errorMessage = '';
            })
            .catch((error) => {
                $scope.errorMessage = error.message;
                $scope.userFound = false;
            });
    };
};

export default userSearch;
