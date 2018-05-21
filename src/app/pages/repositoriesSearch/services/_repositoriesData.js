class repositoriesData {
    /* @ngInject */
    constructor($q, $http, repositoriesDataCache) {
        this.$http = $http;
        this.$q = $q;
        this.repositoriesDataCache = repositoriesDataCache;
    }

    loadRepositoriesData(keyword, page, limit, sort, order) {
        const repositoriesCachedData = this.repositoriesDataCache.getRepositoriesData(
            keyword,
            page,
            sort,
            order,
        );

        if (repositoriesCachedData) {
            return this.$q.resolve(repositoriesCachedData);
        }

        return this.$http
            .get(`https://api.github.com/search/repositories?q=${keyword}&page=${page}&per_page=${limit}&sort=${sort ||
                    ''}&order=${order || ''}`)
            .then(
                response =>
                    this.repositoriesDataCache.saveRepositories(
                        keyword,
                        page,
                        sort,
                        order,
                        response.data,
                    ),
                response => this.$q.reject(response.data),
            );
    }
}

export default repositoriesData;
