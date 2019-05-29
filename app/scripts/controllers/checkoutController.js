'use strict';

/**
 * @ngdoc function
 * @name eshopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eshopApp
 */
angular.module('eshopApp')
    .controller('checkoutController', function ($scope, $stateParams, $firebaseArray, $firebaseObject, firebase,ngCart) {
        var order = ngCart.getCart().items;
        var total = ngCart.totalCost();
        $scope.loginCheck = localStorage.getItem('uid');
        $scope.buy = function () {
            $scope.order = {
                items: order,
                total: total,
            }
            var ref = firebase.database().ref().child('users').child(localStorage.getItem('uid')).child('orders');
            console.log(localStorage.getItem('uid'));
            $firebaseArray(ref).$add($scope.order).then(function (ref) {

            })

          };
    });