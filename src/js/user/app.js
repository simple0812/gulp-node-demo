// if(typeof main !=='undefined' && main.init) {
// 	main.init('user')
// }

require.config({
	baseUrl: '/js'
});


require(['main'], function() {
	require(['jquery', 'bootstrap', 'validator', 'user/service', 'user/controller', 'commonFilter', 'commonDirect'], function($) {
		console.log("aaa")
		validator.bind();
		angular.module('myApp', ['moduleCtrl', 'moduleSvc', 'commonFilter', 'commonDirect']);
		angular.element(document).ready(function() {
			angular.bootstrap(document, ['myApp']);
		});
	});
})