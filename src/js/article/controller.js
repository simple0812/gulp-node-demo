define([
    'angular',
    'common',
    'underscore',
    'pager'
], function() {
    var moduleListCtrl = angular.module('moduleCtrl', []);
    moduleListCtrl.controller('controller', ['$scope', '$window', 'svc', controller]);

    function controller($scope, $window, svc) {
        $scope.models = [];
        $scope.model = {};
        $scope.saveType = ''; //弹出框保存model模式 : create , update

        $scope.pageCondition = {
            keyword : '',
            pageSize: 10,
            pageIndex: 1,
            uid : common.getQueryString('uid')
        };

        $scope.$on('$destroy', function() {
            console.log($scope.models.length + '..');
        });


        $scope.remove = function(scope, obj) {
            if (!confirm('确认删除项目吗？')) return;

            svc.delete([scope.model.id]).done(function() {
                $scope.$broadcast('page');
            }).fail(function(msg) {
                common.popBy(obj, msg);
            });
        };

        $scope.removeBatch = function(scope, obj) {
            if ($scope.selectItems.length == 0) return common.popBy(obj, '请选择要删除的项目');
            if (!confirm('确认删除选中的项目吗？')) return '';

            svc.delete($scope.selectItems).done(function() {
                $scope.$broadcast('page');
            }).fail(function(msg) {
                common.popBy(obj, msg);
            });

        };

        $scope.$on('preSave', function(evt, args) {
            args = args || {};
            $scope.model = adapter(args.model);
            $scope.saveType = args.saveType;
        });

        $scope.save = function(scope, obj) {
            var mothodMap = {
                'create': create,
                'update': update
            };
            if (!mothodMap[$scope.saveType]) return console.log('saveType is  invalid');

            mothodMap[$scope.saveType]();
        };

        $scope.search = function () {
            $scope.pageCondition.pageIndex = 1;
            $scope.$broadcast('page');
        };

        function create() {
            svc.create($scope.model).done(function(p) {
                $scope.models.push(adapter(p));
                $scope.$broadcast('postSave');
            }).fail(function() {
                $scope.$broadcast('postSave');
            });
        }

        function update() {
            svc.update($scope.model).done(function() {
                var scope = $('#user').scope();
                var model = _.find(scope.models, function(item) { return item.id === $scope.model.id; });

                for (var each in $scope.model)
                    if ($scope.model.hasOwnProperty(each)) model[each] = $scope.model[each];

                $scope.$broadcast('postSave');
            }).fail(function() {
                $scope.$broadcast('postSave');
            });
        }

        function adapter(obj) {
            obj = obj || {};
            return {
                id: obj.id || 0,
                title: obj.title || '',
                content: obj.content || '',
                status: obj.status || '',
                uid : obj.uid || common.getQueryString('uid')
            }
        }
    }
});