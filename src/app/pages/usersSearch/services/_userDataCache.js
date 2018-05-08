class userDataCache {
    /* @ngInject */
    constructor($cacheFactory, userDataCacheID, userDataPagesCacheID) {
        this.usersCache = $cacheFactory(userDataCacheID, { capacity: 5 });
        this.pagesDataCache = $cacheFactory(userDataPagesCacheID, {
            capacity: 5,
        });
    }

    saveUser(login, userData) {
        this.usersCache.put(login.toLowerCase(), userData);
        return userData;
    }

    savePageData(dataType, page, login, dataList) {
        this.pagesDataCache.put(
            (dataType + page + login).toLowerCase(),
            dataList,
        );
        return dataList;
    }

    clear() {
        this.cache.removeAll();
    }

    getUserData(login) {
        return this.usersCache.get(login.toLowerCase());
    }

    getPageData(dataType, page, login) {
        return this.pagesDataCache.get((dataType + page + login).toLowerCase());
    }
}

export default userDataCache;
