class database {
    /* @ngInject */
    constructor($http, apiToken) {
        this.$http = $http;
        this.apiToken = apiToken;
    }

    getUserData(login) {
        return this.$http
            .get(`https://api.github.com/users/${login}`, {
                headers: {
                    Authorization: `token ${this.apiToken}`,
                },
            })
            .then(response => response.data, () => null);
    }

    getUserFollowers(login) {
        return this.$http
            .get(`https://api.github.com/users/${login}/followers`, {
                headers: {
                    Authorization: `token ${this.apiToken}`,
                },
            })
            .then(response => response.data, () => []);
    }
}

export default database;
