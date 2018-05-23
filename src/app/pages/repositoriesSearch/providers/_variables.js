import angular from 'angular';

angular
    .module('repositoriesSearchVariables', [])
    .constant('repositoriesDataCacheID', 'repositoriesDataCacheID')
    .constant(
        'linkToRepositories',
        'https://api.github.com/search/repositories',
    )
    .constant('reposSortOptions', [
        'Best match',
        'Most stars',
        'Fewest stars',
        'Most forks',
        'Fewest forks',
        'Recently updated',
        'Least recently updated',
    ])
    .constant('reposSortConfigs', {
        'Best match': {
            sort: null,
            order: null,
        },

        'Most stars': {
            sort: 'stars',
            order: 'desc',
        },

        'Fewest stars': {
            sort: 'stars',
            order: 'asc',
        },

        'Most forks': {
            sort: 'forks',
            order: 'desc',
        },

        'Fewest forks': {
            sort: 'forks',
            order: 'asc',
        },

        'Recently updated': {
            sort: 'updated',
            order: 'desc',
        },

        'Least recently updated': {
            sort: 'updated',
            order: 'asc',
        },
    });
