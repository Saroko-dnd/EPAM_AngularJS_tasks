/* @ngInject */
const thirdDirective = () => ({
    scope: {},
    require: '^^sivTemplate',
    transclude: true,
    templateUrl: './view.html',
    replace: true, // If true -> replaces directive with a template
    link(scope, element, attributes, secondDirectiveController) {
        secondDirectiveController.printMessage();
    },
    controller: [
        '$scope',
        function MyTabsController($scope) {
            this.printMessage = function () {
                $scope.message = 'hello from third directive';
            };
        },
    ],
});

export default thirdDirective;
