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
        return this.$q
            .all([
                this.loadUserDataObject(login),
                this.loadNumberOfStarredRepositories(login),
            ])
            .then(([userData, starredRepositories]) => {
                userData.starredReposCount = starredRepositories;

                return this.userDataCache.saveUser(userData.login, userData);
            });
        /* .then((dataArray) => {
                let userData = null;
                let starredRepositories = null;

                [userData, starredRepositories] = dataArray;
                userData.starredReposCount = starredRepositories;

                return this.userDataCache.saveUser(userData.login, userData);
            }); */
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
