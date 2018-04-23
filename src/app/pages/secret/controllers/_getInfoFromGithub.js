/* @ngInject */
const getInfoFromGithub = ($state, $scope) => {
    $scope.avatarUrl = $state.params.avatarUrl;
    // $scope.avatarUrl = $rootScope.response.avatarUrl;
    /* $http.get('https://avatars1.githubusercontent.com/u/9930283?v=4').then(
        (response) => {
            $log.log('Img found SUCCESS');
            $log.log(response);
        },
        (response) => {
            $log.log('Img not found ERROR');
            $log.log(response);
        },
    ); */
};

export default getInfoFromGithub;
