import 'angular';
import 'angular-mocks';
import '../../../app';

const { angular } = window;

describe('tabData controller', () => {
    let userDataService;
    let $controller;
    let $rootScope;

    beforeEach(() => {
        userDataService = {
            loadUserFollowers: jest.fn(),
            loadUserFollowingList: jest.fn(),
            loadListOfRepositories: jest.fn(),
        };
    });

    beforeEach(angular.mock.module('testAngularApplication'));

    beforeEach(angular.mock.inject((_$controller_, _$rootScope_) => {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
    }));

    it('If tab "followers" is selected, callback in $scope should be able to download info about followers', () => {
        const $scope = $rootScope.$new();
        /* eslint-disable no-unused-vars */
        const controller = $controller('tabData', {
            $scope,
            $stateParams: {
                tabName: 'followers',
            },
            userDataService,
        });
        /* eslint-enable no-unused-vars  */
        $scope.loadDataCallback();
        expect(userDataService.loadUserFollowers).toBeCalled();
    });

    it('If tab "following" is selected, callback in $scope should be able to download info about following', () => {
        const $scope = $rootScope.$new();
        /* eslint-disable no-unused-vars */
        const controller = $controller('tabData', {
            $scope,
            $stateParams: {
                tabName: 'following',
            },
            userDataService,
        });
        /* eslint-enable no-unused-vars  */
        $scope.loadDataCallback();
        expect(userDataService.loadUserFollowingList).toBeCalled();
    });

    it('If tab "repositories" is selected, callback in $scope should be able to download info about repositories', () => {
        const $scope = $rootScope.$new();
        /* eslint-disable no-unused-vars */
        const controller = $controller('tabData', {
            $scope,
            $stateParams: {
                tabName: 'repositories',
            },
            userDataService,
        });
        /* eslint-enable no-unused-vars  */
        $scope.loadDataCallback();
        expect(userDataService.loadListOfRepositories).toBeCalled();
    });

    it('If no tabs are selected, callback in $scope should be able to download info about followers', () => {
        const $scope = $rootScope.$new();
        /* eslint-disable no-unused-vars */
        const controller = $controller('tabData', {
            $scope,
            $stateParams: {},
            userDataService,
        });
        /* eslint-enable no-unused-vars  */
        $scope.loadDataCallback();
        expect(userDataService.loadUserFollowers).toBeCalled();
    });
});
