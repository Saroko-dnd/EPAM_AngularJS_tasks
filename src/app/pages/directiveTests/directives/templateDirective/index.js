/* @ngInject */
const templateDirective = $rootScope => ({
    scope: {
        name: '@',
        secondName: '@',
    },
    transclude: true,
    templateUrl: './view.html',
    replace: true, // If true -> replaces directive with a template
    link(/* scope, element, attributes */) {},
    controller: [
        '$scope',
        function MyTabsController($scope) {
            this.printMessage = function () {
                $scope.message = 'hello from template directive';
            };

            $rootScope.$on('I_AM_HERE', (e, data) => {
                $scope.eventData = data;
            });
        },
    ],
});

export default templateDirective;
