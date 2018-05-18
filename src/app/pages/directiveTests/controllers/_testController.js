/* @ngInject */
const testController = ($scope) => {
    $scope.name = 'Igor';
    $scope.secondName = 'Saroko';
    $scope.change = () => {
        $scope.name = 'dygfyhdghfgd';
        $scope.secondName = 'fdfdfdfdf';
    };
};

export default testController;
