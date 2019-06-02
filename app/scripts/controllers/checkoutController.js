'use strict';

/**
 * @ngdoc function
 * @name eshopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eshopApp
 */
angular.module('eshopApp')
    .controller('checkoutController', function ($state,$scope, $stateParams, $firebaseArray, $firebaseObject, firebase,ngCart,$timeout) {
        var order = ngCart.getCart().items;
        $scope.total = ngCart.totalCost();
        $scope.loginCheck = localStorage.getItem('uid');
        if ($scope.total != 0) {
            
            $scope.buy = function () {
        
            $scope.order = {
                items: order,
                total: $scope.total,
                date: firebase.database.ServerValue.TIMESTAMP,
            }
            ngCart.empty();
            var ref = firebase.database().ref().child('users').child(localStorage.getItem('uid')).child('orders');
            $firebaseArray(ref).$add($scope.order).then(function (ref) {

            })
            $state.go('orderSuccess');
            $timeout(function() {
                $state.go('orders');
             }, 3000);

          };
        } 

    });