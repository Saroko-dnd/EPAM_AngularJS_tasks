class repositoriesData {
    /* @ngInject */
    constructor($q, $http, repositoriesDataCache) {
        this.$http = $http;
        this.$q = $q;
        this.repositoriesDataCache = repositoriesDataCache;
    }

    loadRepositoriesData(keyword, page) {
        const repositoriesCachedData = this.repositoriesDataCache.getRepositoriesData(
            keyword,
            page,
        );

        if (repositoriesCachedData) {
            return this.$q.resolve(repositoriesCachedData);
        }

        return this.$http
            .get(`https://api.github.com/search/repositories?q=${keyword}`)
            .then(
                response =>
                    this.repositoriesDataCache.saveRepositories(
                        keyword,
                        page,
                        response.data,
                    ),
                response => this.$q.reject(response.data),
            );
    }
}

export default repositoriesData;
