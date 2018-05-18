/* @ngInject */
const secondDirective = $rootScope => ({
    scope: {},
    transclude: true,
    templateUrl: './view.html',
    replace: true, // If true -> replaces directive with a template
    link(scope) {
        scope.sendInfoToOthers = () => {
            $rootScope.$emit('I_AM_HERE', 123321);
        };
    },
    controller: [
        '$scope',
        function MyTabsController($scope) {
            this.printMessage = function () {
                $scope.message = 'hello from second directive';
            };

            $scope.sendInfoToOthers = () => {
                $rootScope.$emit('I_AM_HERE', 123321);
            };
        },
    ],
    /* controler: function MyTabsController() {
        $scope.sendInfoToOthers = () => {
            $rootScope.$emit('I_AM_HERE', 123321);
        };
    }, */
});

export default secondDirective;
