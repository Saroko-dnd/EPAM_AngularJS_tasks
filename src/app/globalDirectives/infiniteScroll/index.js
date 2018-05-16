import _ from 'lodash';

/* @ngInject */
const infiniteScroll = () => ({
    restrict: 'A',
    link(scope, element, attrs) {
        const breakTime = 250;
        const throttledScrollEventHandler = _.debounce(
            scrollEventHandler,
            breakTime,
            {
                leading: true,
                trailing: true,
            },
        );

        window.addEventListener('scroll', throttledScrollEventHandler);

        element.on('$destroy', () => {
            window.removeEventListener('scroll', throttledScrollEventHandler);
        });

        function scrollEventHandler() {
            const documentScrollHeight = document.documentElement.scrollHeight;
            const documentClientHeight = document.documentElement.clientHeight;
            const documentScrollTop =
                document.body.scrollTop || document.documentElement.scrollTop;
            const bottomDistance = 1000;

            if (
                documentScrollHeight <
                documentClientHeight + documentScrollTop + bottomDistance
            ) {
                scope.$eval(attrs.sivScrollDown);
            }
        }
    },
});

export default infiniteScroll;
