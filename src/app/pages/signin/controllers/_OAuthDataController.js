/* @ngInject */
const OAuthDataController = (
    $scope,
    $stateParams,
    $http,
    $log,
    clientId,
    clientSecret,
) => {
    $scope.client_id = clientId;

    if ($stateParams.code) {
        $http
            .post('https://github.com/login/oauth/access_token', {
                code: $stateParams.code,
                client_id: clientId,
                client_secret: clientSecret,
            })
            .then(
                (response) => {
                    $log.log('OAuth Success');
                    $log.log(response);
                },
                (response) => {
                    $log.log('OAuth Failure');
                    $log.log(response);
                },
            );
    }
};

export default OAuthDataController;
