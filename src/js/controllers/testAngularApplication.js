import angular from 'angular';

const app = angular.module('testAngularApplication', []);
app.controller('testController', ($scope) => {
    $scope.var_1 = 'HELLO';
    $scope.var_2 = 'FROM';
    $scope.var_3 = 'CONTROLLER';
});

export default app;
