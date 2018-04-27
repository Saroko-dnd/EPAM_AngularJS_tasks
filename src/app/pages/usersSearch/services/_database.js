class Database {
    /* @ngInject */
    constructor($http, apiToken, userDataCache) {
        this.$http = $http;
        this.apiToken = apiToken;
        this.cache = {};
        this.userDataCache = userDataCache;
    }

    static get regexpLastPage() {
        return /\d+(?=>; rel="last")/g;
    }

    static get perPage() {
        return 30;
    }

    loadUserData(login) {
        return this.$http.get(`https://api.github.com/users/${login}`).then(
            response => this.userDataCache.saveData('userData', response.data),
            () => {
                throw new Error('User with such login not found!');
            },
        );
    }

    loadUserFollowers(login, page) {
        return this.$http
            .get(`https://api.github.com/users/${login}/followers?page=${page}`)
            .then(
                response =>
                    this.userDataCache.saveData('followersList', response.data),
                () => [],
            );
    }

    loadUserFollowingList(login, page) {
        return this.$http
            .get(`https://api.github.com/users/${login}/following?page=${page}`)
            .then(
                response =>
                    this.userDataCache.saveData('followingList', response.data),
                () => [],
            );
    }

    loadNumberOfStarredRepositories(login) {
        let starredCount = 0;
        let lastPage = 0;

        return this.$http
            .get(`https://api.github.com/users/${login}/starred`)
            .then((response) => {
                if (response.headers('link')) {
                    [lastPage] = response
                        .headers('link')
                        .match(Database.regexpLastPage)
                        .map(number => +number);

                    starredCount += Database.perPage * (lastPage - 1);

                    return this.$http
                        .get(`https://api.github.com/users/${login}/starred?page=${lastPage}`)
                        .then(serverAnswer =>
                            this.userDataCache.saveData(
                                'starredReposCount',
                                serverAnswer.data.length + starredCount,
                            ));
                }

                return this.userDataCache.saveData(
                    'starredReposCount',
                    response.data.length,
                );
            });
    }

    loadListOfRepositories(login) {
        return this.$http
            .get(`https://api.github.com/users/${login}/repos`)
            .then(
                response =>
                    this.userDataCache.saveData(
                        'repositoriesList',
                        response.data,
                    ),
                () => [],
            );
    }

    getLoadedData() {
        return this.userDataCache.getData();
    }
}

export default Database;
