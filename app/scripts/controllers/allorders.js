'use strict';

angular.module('eshopApp')
    .controller('allOrders', function ($timeout, $state, $scope, $stateParams, $firebaseArray, $firebaseObject, firebase, $firebaseAuth) {
        $timeout(function () {
            if ($scope.loggedIn && $scope.admin) {
                var order = firebase.database().ref().child('users');
                $scope.orders = $firebaseArray(order);
                var orders = firebase.database().ref().child('users').child($scope.userid).child('orders');
                $scope.orders = $firebaseArray(orders);
               
                $scope.orders.$loaded().then(function(orders) {
                    $scope.orderLength = orders.length; // data is loaded here
                    console.log($scope.orderLength);
                 });

            
                order.on("value", function (snapshot) {
                    $scope.messages = snapshot.val();
                    $scope.name = snapshot.val();
                    $scope.$apply();
                });
            } else {
                $state.go('login');
            }
        }, 300);

    })
