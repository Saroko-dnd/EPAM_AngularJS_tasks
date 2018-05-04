const onRepeatEnd = () => ({
    restrict: 'A',
    link(scope, element, attrs) {
        if (scope.$last) {
            scope.$eval(attrs.repeatEnd);
        }
    },
});

export default onRepeatEnd;
