class userDataCache {
    /* @ngInject */
    constructor($cacheFactory, userDataCacheID) {
        this.cache = $cacheFactory(userDataCacheID);
    }

    saveData(key, value) {
        this.cache.put(key, value);
        return value;
    }

    clear() {
        this.cache.removeAll();
    }

    getData() {
        const data = this.cache.get('userData');

        if (data) {
            data.followersList = this.cache.get('followersList');
            data.followingList = this.cache.get('followingList');
            data.repositoriesList = this.cache.get('repositoriesList');
            data.starredReposCount = this.cache.get('starredReposCount');
        }

        return data;
    }
}

export default userDataCache;
