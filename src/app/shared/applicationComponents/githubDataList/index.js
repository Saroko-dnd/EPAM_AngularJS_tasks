/* @ngInject */
const githubDataList = () => ({
    restrict: 'E',
    replace: true,
    scope: {
        loadDataCallback: '<sivLoadDataCallback',
    },
    /* @ngInject */
    controller: function MyTabsController($scope, $anchorScroll, $stateParams) {
        const itemsPerPage = 20;
        let firstDataLoading = true;
        let currentPage = 1;

        $scope.loadingInProgress = false;
        $scope.anchorScroll = anchorScroll;
        $scope.githubDataList = [];
        $scope.loadData = loadData;

        init();

        function init() {
            loadData();
        }

        function anchorScroll() {
            if (firstDataLoading) {
                $anchorScroll();
                firstDataLoading = false;
            }
        }

        function loadData() {
            if (!$scope.loadingInProgress) {
                $scope.loadingInProgress = true;
                $scope
                    .loadDataCallback(
                        $stateParams.login,
                        currentPage,
                        itemsPerPage,
                    )
                    .then((data) => {
                        $scope.githubDataList.push(...data);
                        console.log($scope.githubDataList[0]);
                        $scope.loadingInProgress = false;
                    });

                currentPage += 1;
            }
        }
    },
    templateUrl: './view.html',
});

export default githubDataList;
