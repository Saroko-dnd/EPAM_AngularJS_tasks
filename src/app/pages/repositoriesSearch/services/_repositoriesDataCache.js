class repositoriesDataCache {
    /* @ngInject */
    constructor($cacheFactory, repositoriesDataCacheID) {
        this.repositoriesDataCache = $cacheFactory(repositoriesDataCacheID, {
            capacity: 10,
        });
    }

    saveRepositories(keyword, page, sort, order, repositoriesData) {
        this.repositoriesDataCache.put(
            (keyword + page + sort + order).toLowerCase(),
            repositoriesData,
        );

        return repositoriesData;
    }

    getRepositoriesData(keyword, page, sort, order) {
        return this.repositoriesDataCache.get((keyword + page + sort + order).toLowerCase());
    }
}

export default repositoriesDataCache;
