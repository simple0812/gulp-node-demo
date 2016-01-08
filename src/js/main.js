var main = {
    init: function(name) {
        require.config({
            baseUrl: '/js',
            paths: {
                'angular': 'lib/angular',
                'bootstrap': 'lib/bootstrap',
                'underscore': 'lib/underscore',
                'extension': 'lib/extension',
                'common': 'lib/common',
                'moment': 'lib/moment',
                'validator': 'lib/validator',
                'pager': 'lib/pager',
                'jquery': 'lib/jquery',
                'hashChange': 'lib/hashChange',
                'jquery.ui.widget': 'lib/jquery.ui.widget',
                'jquery.fileupload': 'lib/jquery.fileupload',
                'md5': 'md5',
                'commonDirect': 'common/directive',
                'commonFilter': 'common/filter',
                'service': name + '/service',
                'controller': name + '/controller'
            },
            shim: {
                'angular': {
                    exports: 'angular'
                },
                'underscore': {
                    exports: '_'
                },
                'common': {
                    exports: 'common',
                    deps: ['jquery', 'bootstrap']
                },
                'hashChange': {
                    exports: 'hashChange',
                    deps: ['jquery']
                },
                'pager': {
                    exports: 'pager',
                    deps: ['hashChange']
                },
                'moment': {
                    exports: 'moment'
                },
                'validator': {
                    exports: 'validator',
                    deps: ['jquery', 'common']
                },
                'bootstrap': ['jquery'],
                'extension': {
                    exports: 'extension',
                    deps: ['jquery']
                },
                'commonDirect': {
                    exports: 'commonDirect',
                    deps: [
                        'angular',
                        'common',
                        'jquery.fileupload'
                    ]
                },
                'commonFilter': {
                    exports: 'commonFilter',
                    deps: [
                        'angular',
                        'moment'
                    ]
                },
                'jquery.fileupload': {
                    exports: 'jquery.fileupload',
                    deps: ['jquery', 'jquery.ui.widget']
                }
            }
        });
    }
}