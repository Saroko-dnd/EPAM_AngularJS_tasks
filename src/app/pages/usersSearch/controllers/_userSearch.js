/* @ngInject */
const userSearch = ($scope, dataService) => {
    $scope.avatarUrl = '';
    $scope.login = '';
    $scope.username = '';
    $scope.message = '';
    $scope.followers = [];

    $scope.getUserInfo = () => {
        let data = dataService.getUserData($scope.login);

        data.then((userData) => {
            console.log(data);
            if (userData) {
                $scope.username = userData.name;
                $scope.avatarUrl = userData.avatar_url;
                $scope.message = '';

                data = dataService.getUserFollowers($scope.login);

                data.then((followers) => {
                    $scope.followers = followers;
                });
            } else {
                $scope.message = 'USER NOT FOUND';
            }
        });
    };
};

export default userSearch;
