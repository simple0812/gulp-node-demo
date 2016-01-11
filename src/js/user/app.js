// if(typeof main !=='undefined' && main.init) {
// 	main.init('user')
// }

require.config({
	baseUrl: '/js',
	paths: {
		'service': 'user/service',
		'controller': 'user/controller'
	}
});


require(['main'], function() {
	require(['jquery', 'bootstrap', 'validator', 'service', 'controller', 'commonFilter', 'commonDirect'], function($) {
		validator.bind();
		angular.module('myApp', ['moduleCtrl', 'moduleSvc', 'commonFilter', 'commonDirect']);
		angular.element(document).ready(function() {
			angular.bootstrap(document, ['myApp']);
		});
	});
})