const onRepeatEnd = () => ({
    restrict: 'A',
    link(scope, element, attrs) {
        if (scope.$last) {
            scope.$eval(attrs.sivRepeatEnd);
        }
    },
});

export default onRepeatEnd;
