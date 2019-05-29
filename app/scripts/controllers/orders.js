'use strict';

angular.module('eshopApp')
    .controller('orderController', function ($scope, $stateParams, $firebaseArray, $firebaseObject, firebase, $firebaseAuth) {
        var ref = firebase.database().ref();
        $scope.auth = $firebaseAuth();


        $scope.auth.$onAuthStateChanged(function (firebaseUser) {
            if (firebaseUser) {
                $scope.loggedIn = true;
                var user = firebase.auth().currentUser;
                localStorage.setItem('uid', firebaseUser.uid);
                console.log(localStorage.getItem('uid'));
                $scope.userUID = firebaseUser.email;
                $scope.userid = firebaseUser.uid;
                $scope.adminUID = 'tarikdedic95@gmail.com';
                if ($scope.userUID === $scope.adminUID) {
                    $scope.admin = true;
                }
                var order = firebase.database().ref().child('users').child($scope.userid).child('orders');
                $scope.orders = $firebaseArray(order);
                console.log($scope.orders);
                $scope.orders.$loaded().then(function(x) {
                    order.on('value', function(gamesSnapshot) {
                        gamesSnapshot.forEach(function (snapshot) {
                            $scope.obj = snapshot.val();
                                console.log($scope.obj.items);

                        });
                    }); 
                    for (var i = 0; i <= $scope.obj.items.length;i++) {
                    x === $scope.orders;
                    $scope.x = x;
                    console.log($scope.x[i].items[1]) 
                    }
    
                }).catch(function(error) {
                    console.log("Error:", error);
                });

                
                


            } else {
                $scope.loggedIn = false;
                $scope.admin = false;
            }
        });


    });