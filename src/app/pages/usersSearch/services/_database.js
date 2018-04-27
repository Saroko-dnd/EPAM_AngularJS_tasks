class Database {
    /* @ngInject */
    constructor($http, apiToken) {
        this.$http = $http;
        this.apiToken = apiToken;
        this.cache = {};
    }

    static get regexpLastPage() {
        return /\d+(?=>; rel="last")/g;
    }

    static get perPage() {
        return 30;
    }

    getUserData(login) {
        return this.$http.get(`https://api.github.com/users/${login}`).then(
            response => response.data,
            () => {
                throw new Error('User with such login not found!');
            },
        );
    }

    getUserFollowers(login, page) {
        return this.$http
            .get(`https://api.github.com/users/${login}/followers?page=${page}`)
            .then(
                response => response.data,
                () => [],
            );
    }

    getUserFollowingList(login, page) {
        return this.$http
            .get(`https://api.github.com/users/${login}/following?page=${page}`)
            .then(response => response.data, () => []);
    }

    getNumberOfStarredRepositories(login) {
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
                            serverAnswer.data.length + starredCount);
                }
                return response.data.length;
            });
    }

    getListOfRepositories(login) {
        return this.$http
            .get(`https://api.github.com/users/${login}/repos`)
            .then(response => response.data, () => []);
    }
}

export default Database;
