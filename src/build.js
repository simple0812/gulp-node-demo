{
    baseUrl: './js',
    findNestedDependencies: true, //寻找require()里面的require或define调用的依赖
    removeCombined: true, //在输出目录将会删除掉已经合并了的文件
    paths: {
        'angular': 'lib/angular',
        'bootstrap': 'lib/bootstrap',
        'underscore': 'lib/underscore',
        'extension': 'lib/extension',
        'common': 'lib/common',
        'moment': 'lib/moment',
        'validator': 'lib/validator',
        'backbone': 'lib/backbone',
        'pager': 'lib/pager',
        'hashChange': 'lib/hashChange',
        'jquery': 'lib/jquery',
        'jquery.ui.widget': 'lib/jquery.ui.widget',
        'jquery.fileupload': 'lib/jquery.fileupload',
        'datetimepicker': 'lib/bootstrap-datetimepicker',
        'md5': 'md5',
        'commonDirect': 'common/directive',
        'commonFilter': 'common/filter'

    },
    dir: '../static',
    modules: [{
        name: 'user/app',
        // excludeShallow: ['bootstrap', 'jquery', 'angular'], //将公共的库排除,不包括其依赖的项
        include: [
        ],
        //将公共的库排除,包括其依赖的项
        exclude: [
            'angular',
            'bootstrap',
            'jquery'
        ]
    }, {
        name: 'article/app',
        // excludeShallow: ['bootstrap', 'jquery', 'angular'], //将公共的库排除
        include: [],
        exclude: [
            'angular',
            'bootstrap',
            'jquery'
        ]
    }],
    shim: {
        'angular': {
            exports: 'angular'
        },
        'datetimepicker': {
            exports: 'datetimepicker',
            deps: ['jquery']
        },
        'angular-route': {
            exports: 'angular-route'
        },
        'common': {
            exports: 'angular-route',
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
                'datetimepicker',
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
}