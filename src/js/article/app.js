// if(typeof main !=='undefined' && main.init) {
// 	console.log('---')
// 	main.init('article')
// }

require.config({
	baseUrl: '/js'
});


require(['main'], function() {
	require(['jquery', 'validator', 'bootstrap', 'article/service', 'article/controller', 'commonFilter', 'commonDirect'], function() {
		validator.bind();
		angular.module('myApp', ['moduleCtrl', 'moduleSvc', 'commonFilter', 'commonDirect']);
		angular.element(document).ready(function() {
			angular.bootstrap(document, ['myApp']);
		});
	});
})