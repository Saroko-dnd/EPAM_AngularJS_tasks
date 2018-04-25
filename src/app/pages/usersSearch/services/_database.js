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
            .then(
                response => response.data,
                () => {
                    throw new Error('User with such login not found!');
                },
            );
    }

    getUserFollowers(login, page) {
        return this.$http
            .get(
                `https://api.github.com/users/${login}/followers?page=${page}`,
                {
                    headers: {
                        Authorization: `token ${this.apiToken}`,
                    },
                },
            )
            .then(response => response.data, () => []);
    }

    getUserFollowingList(login, page) {
        return this.$http
            .get(
                `https://api.github.com/users/${login}/following?page=${page}`,
                {
                    headers: {
                        Authorization: `token ${this.apiToken}`,
                    },
                },
            )
            .then(response => response.data, () => []);
    }

    getStarredRepositories(login, page, limit) {
        return this.$http
            .get(
                `https://api.github.com/users/${login}/starred?page=${page}&per_page=${limit}`,
                {
                    headers: {
                        Authorization: `token ${this.apiToken}`,
                    },
                },
            )
            .then(response => response.data, () => []);
    }
}

export default database;
