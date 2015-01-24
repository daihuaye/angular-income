'use strict';

var app = angular.module('app', [ 'dy.income' ]);

app.controller('AppCtrl', function AppCtrl($scope) {
  $scope.income = '123456';
  $scope.incomeWithComma = '123,456';

  $scope.handler = function(event) {
    $scope.incomeWithComma = event.val;
    $scope.income = event.value;
  };
});
