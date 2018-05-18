import _ from 'lodash';

/* @ngInject */
const infiniteScroll = $document => ({
    restrict: 'A',
    link(scope, element, attrs) {
        const breakTime = 250;
        const bottomDistance = scope.$eval(attrs.sivInfiniteScrollBottomDistance);
        const smartScrollEventHandler = _.debounce(
            scrollEventHandler,
            breakTime,
            {
                leading: true,
                trailing: true,
            },
        );
        console.log('infiniteScroll LINK');
        $document.on('scroll', smartScrollEventHandler);
        // window.addEventListener('scroll', smartScrollEventHandler);

        element.on('$destroy', () => {
            $document.off('scroll', smartScrollEventHandler);
            // window.removeEventListener('scroll', smartScrollEventHandler);
        });

        function scrollEventHandler() {
            const documentScrollHeight = document.documentElement.scrollHeight;
            const documentClientHeight = document.documentElement.clientHeight;
            const documentScrollTop =
                document.body.scrollTop || document.documentElement.scrollTop;
            console.log('scrollEventHandler');
            if (
                documentScrollHeight <
                documentClientHeight + documentScrollTop + bottomDistance
            ) {
                scope.$eval(attrs.sivInfiniteScrollCallback);
            }
        }
    },
});

export default infiniteScroll;
