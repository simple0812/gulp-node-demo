// if(typeof main !=='undefined' && main.init) {
// 	console.log('---')
// 	main.init('article')
// }

require.config({
	baseUrl: '/js',
	paths: {
		'service': 'article/service',
		'controller': 'article/controller'
	}
});


require(['main'], function() {
	require(['jquery', 'validator', 'bootstrap', 'service', 'controller', 'commonFilter', 'commonDirect'], function() {
		validator.bind();
		angular.module('myApp', ['moduleCtrl', 'moduleSvc', 'commonFilter', 'commonDirect']);
		angular.element(document).ready(function() {
			angular.bootstrap(document, ['myApp']);
		});
	});
})