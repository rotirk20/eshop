'use strict';

angular.module('eshopApp')
    .controller('orderController', function ($timeout,$state,$scope, $stateParams, $firebaseArray, $firebaseObject, firebase, $firebaseAuth) {
        $timeout(function() {
            if ($scope.loggedIn) {
        var ref = firebase.database().ref();
        $scope.auth = $firebaseAuth();

        $scope.auth.$onAuthStateChanged(function (firebaseUser) {
            if (firebaseUser) {
                $scope.loggedIn = true;
                var user = firebase.auth().currentUser;
                localStorage.setItem('uid', firebaseUser.uid);
                $scope.userUID = firebaseUser.email;
                $scope.userid = firebaseUser.uid;
                $scope.adminUID = 'tarikdedic95@gmail.com';
                if ($scope.userUID === $scope.adminUID) {
                    $scope.admin = true;
                }
                var order = firebase.database().ref().child('users').child($scope.userid).child('orders');
                $scope.orders = $firebaseArray(order);
                order.orderByChild("id").on("child_added", function (snapshot) {
                    $scope.or = snapshot.val();
                    console.log($scope.or.length);
                })
            } else {
                $scope.loggedIn = false;
                $scope.admin = false;
            }
        });


        $scope.printDiv = function(printable) {
            var printContents = document.getElementById('printable').innerHTML,
            popupWin = window.open('', '_blank', 'width=300,height=300');
            popupWin.document.open();
            popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="bower_components/bootswatch/dist/materia/bootstrap.min.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
            popupWin.document.close();
          } 
        } else {
            $state.go('login');
        }
    },300);
    });
