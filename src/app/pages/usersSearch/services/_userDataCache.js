class userDataCache {
    /* @ngInject */
    constructor($cacheFactory, userDataCacheID) {
        this.usersCache = $cacheFactory(userDataCacheID, { capacity: 5 });
        this.cache = $cacheFactory('dhfdfhdfjdhjfh', { capacity: 5 });
    }

    saveData(key, value) {
        this.cache.put(key, value);
        return value;
    }

    saveUser(login, userData) {
        this.usersCache.put(login.toLowerCase(), userData);
        return userData;
    }

    clear() {
        this.cache.removeAll();
    }

    getUserData(login) {
        return this.usersCache.get(login.toLowerCase());
    }

    getData() {
        const data = this.cache.get('userData');

        if (data) {
            data.followersList = this.cache.get('followersList');
            data.followingList = this.cache.get('followingList');
            data.repositoriesList = this.cache.get('repositoriesList');
            data.starredReposCount = this.cache.get('starredReposCount');
            data.followersPage = this.cache.get('followersPage');
            data.followingPage = this.cache.get('followingPage');
            data.repositoriesPage = this.cache.get('repositoriesPage');
            data.lastOpenedCategory = this.cache.get('lastOpenedCategory');
        }

        return data;
    }
}

export default userDataCache;
