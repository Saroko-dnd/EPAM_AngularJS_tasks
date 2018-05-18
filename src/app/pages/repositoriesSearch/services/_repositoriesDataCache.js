class repositoriesDataCache {
    /* @ngInject */
    constructor($cacheFactory, repositoriesDataCacheID) {
        this.repositoriesDataCache = $cacheFactory(repositoriesDataCacheID, {
            capacity: 10,
        });
    }

    saveRepositories(keyword, page, repositoriesData) {
        this.repositoriesDataCache.put(
            (keyword + page).toLowerCase(),
            repositoriesData,
        );

        return repositoriesData;
    }

    getRepositoriesData(keyword, page) {
        return this.repositoriesDataCache.get((keyword + page).toLowerCase());
    }
}

export default repositoriesDataCache;
