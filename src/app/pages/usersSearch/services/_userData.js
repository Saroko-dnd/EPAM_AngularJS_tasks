class userDataService {
    /* @ngInject */
    constructor($q, $http, userDataCache, usersLink) {
        this.$http = $http;
        this.cache = {};
        this.userDataCache = userDataCache;
        this.$q = $q;
        this.usersLink = usersLink;
    }

    static get regexpLastPage() {
        return /\d+(?=>; rel="last")/g;
    }

    static get perPage() {
        return 30;
    }

    loadUserData(login) {
        const userData = this.userDataCache.getUserData(login);

        if (userData) {
            return this.$q.resolve(userData);
        }

        return this.$q
            .all([
                this.loadUserDataObject(login),
                this.loadNumberOfStarredRepositories(login),
            ])
            .then(([newUserData, starredRepositories]) => {
                newUserData.starredReposCount = starredRepositories;

                return this.userDataCache.saveUser(
                    newUserData.login,
                    newUserData,
                );
            });
    }

    loadUserDataObject(login) {
        return this.$http
            .get(this.usersLink + login)
            .then(
                response => response.data,
                response => this.$q.reject(response),
            );
    }

    loadUserFollowers(login, page, limit) {
        const cachedFollowersData = this.userDataCache.getPageData(
            'followers',
            page,
            login,
        );

        if (cachedFollowersData) {
            return this.$q.resolve(cachedFollowersData);
        }

        return this.$http
            .get(`${this.usersLink +
                    login}/followers?page=${page}&per_page=${limit}`)
            .then(
                response =>
                    this.userDataCache.savePageData(
                        'followers',
                        page,
                        login,
                        response.data,
                    ),
                response => this.$q.reject(response),
            );
    }

    loadUserFollowingList(login, page, limit) {
        const cachedFollowingData = this.userDataCache.getPageData(
            'following',
            page,
            login,
        );

        if (cachedFollowingData) {
            return this.$q.resolve(cachedFollowingData);
        }

        return this.$http
            .get(`${this.usersLink +
                    login}/following?page=${page}&per_page=${limit}`)
            .then(
                response =>
                    this.userDataCache.savePageData(
                        'following',
                        page,
                        login,
                        response.data,
                    ),
                response => this.$q.reject(response),
            );
    }

    loadNumberOfStarredRepositories(login) {
        let starredCount = 0;
        let lastPage = 0;

        return this.$http.get(`${this.usersLink + login}/starred`).then(
            (response) => {
                if (response.headers('link')) {
                    [lastPage] = response
                        .headers('link')
                        .match(userDataService.regexpLastPage)
                        .map(number => +number);

                    starredCount += userDataService.perPage * (lastPage - 1);

                    return this.$http
                        .get(`https://api.github.com/users/${login}/starred?page=${lastPage}`)
                        .then(serverAnswer =>
                            serverAnswer.data.length + starredCount);
                }

                return response.data.length;
            },
            response => this.$q.reject(response),
        );
    }

    loadListOfRepositories(login, page, limit) {
        const cachedRepositoriesData = this.userDataCache.getPageData(
            'repositories',
            page,
            login,
        );

        if (cachedRepositoriesData) {
            return this.$q.resolve(cachedRepositoriesData);
        }

        return this.$http
            .get(`${this.usersLink +
                    login}/repos?page=${page}&per_page=${limit}`)
            .then(
                response =>
                    this.userDataCache.savePageData(
                        'repositories',
                        page,
                        login,
                        response.data,
                    ),
                response => this.$q.reject(response),
            );
    }
}

export default userDataService;
