if(typeof main !=='undefined' && main.init) {
	main.init('user')
}

require(['jquery', 'validator', 'bootstrap', 'service', 'controller', 'commonFilter', 'commonDirect'], function($) {
    console.log('..')
    validator.bind();
    angular.module('myApp', ['moduleCtrl', 'moduleSvc', 'commonFilter', 'commonDirect']);
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['myApp']);
    });
});