import _ from 'lodash';

/* @ngInject */
const infiniteScroll = () => ({
    restrict: 'A',
    link(scope, element, attrs) {
        const throttledScrollEventHandler = _.throttle(
            scrollEventHandler,
            1000,
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

            if (
                documentScrollHeight <
                documentClientHeight + documentScrollTop + 1000
            ) {
                scope.$eval(attrs.sivOnScroll);
            }
        }
    },
});

export default infiniteScroll;
