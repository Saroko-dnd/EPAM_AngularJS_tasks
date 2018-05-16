class repositoriesData {
    /* @ngInject */
    constructor($q, $http) {
        this.$http = $http;
        this.$q = $q;
    }

    loadRepositoriesData(keyword) {
        return this.$http
            .get(`https://api.github.com/search/repositories?q=${keyword}`)
            .then(
                response => response.data,
                response => this.$q.reject(response.data),
            );
    }
}

export default repositoriesData;
