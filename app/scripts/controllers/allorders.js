'use strict';

angular.module('eshopApp')
    .controller('allOrders', function ($timeout, $state, $scope, $stateParams, $firebaseArray, $firebaseObject, firebase, $firebaseAuth) {
        $timeout(function () {
            if ($scope.loggedIn && $scope.admin) {
                var order = firebase.database().ref().child('users');
                $scope.orders = $firebaseArray(order);
                console.log($scope.orders);
                order.on("value", function (snapshot) {
                    $scope.messages = snapshot.val();
                    console.log($scope.orders.length);
                    console.log($scope.orders);
                    $scope.name = snapshot.val();
                    $scope.$apply();
                });
            } else {
                $state.go('login');
            }
        }, 300);
        
    })
    