/* @ngInject */
const authorization = ($scope, $http, $log, $state) => {
    $scope.username = '';
    $scope.message = '';
    $scope.token = '';

    $scope.trySignIn = () => {
        $http
            /* .get('https://15a6c26b4814391d67aa4c7dba10d8d6cb3c111c:x-oauth-basic@api.github.com/user') */
            .get('https://api.github.com/users/saroko-dnd', {
                headers: {
                    Authorization:
                        'token 15a6c26b4814391d67aa4c7dba10d8d6cb3c111c',
                },
            })
            .then(
                (response) => {
                    $log.log('User checked');
                    $log.log(response);
                    $state.go('secret', {
                        avatarUrl: response.data.avatar_url,
                    });
                },
                (response) => {
                    $log.error('Github error');
                    $log.log(response);
                    $scope.message = response.data.message;
                },
            );
    };
};

export default authorization;
