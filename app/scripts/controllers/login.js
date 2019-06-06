'use strict';

/**
 * @ngdoc function
 * @name eshopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eshopApp
 */
angular.module('eshopApp')
.controller('LoginController',
['$scope', '$firebase', '$firebaseAuth', '$state','$timeout','$firebaseArray','$interval',
    function ($scope, $firebase, $firebaseAuth, $state, $timeout, $firebaseArray,$interval,$rootScope) {
        $timeout(function() {
        if ($scope.loggedIn) {
            $state.go('home')
        }
        else {
            var ref = firebase.database().ref();
            $scope.auth = $firebaseAuth();


            $scope.auth.$onAuthStateChanged(function (firebaseUser) {
                if (firebaseUser) {
                    $scope.loggedIn = true;
                    var user = firebase.auth().currentUser;
                    localStorage.setItem('uid', firebaseUser.uid);
                    $scope.userUID = firebaseUser.email;
                    $scope.userid = firebaseUser.uid;
                    $scope.displayName = firebaseUser.displayName;
                    var order = firebase.database().ref().child('users').child($scope.userid).child('orders');
                    $scope.orders = $firebaseArray(order);
                   
                    $interval(function () {
                        $scope.orders.$loaded().then(function(order) {
                            $scope.orderLength = order.length; // data is loaded here
                         });
                    }, 1000);
                   
                    $scope.adminUID = 'tarikdedic95@gmail.com';
                    if ($scope.userUID === $scope.adminUID) {
                        $scope.admin = true;
                    } else {
                        $scope.admin = false;
                    }
                } else {
                    $scope.loggedIn = false;
                    $scope.admin = false;
                }
            });


            window.onbeforeunload = function() {
                localStorage.removeItem('uid');
              };


            $scope.login = function () {
                $scope.firebaseUser = null;
                $scope.error = null;


                $scope.auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function (firebaseUser) {
                    $scope.firebaseUser = firebaseUser;
                    $scope.displayName = firebaseUser.displayName;
                    $scope.message = "Successfully loged in";
                    $scope.loggedIn = true;
                    window.setTimeout(function () {
                        $scope.$apply(function () {
                            $state.go('home');
                        })
                    }, 3000);
                }).catch(function (error) {
                    $scope.loggedIn = false;
                    $scope.error = error.message;
                    localStorage.removeItem('uid', firebaseUser.uid);
                    console.log($scope.error);
                });


            };

            $scope.signOut = function () {
                firebase.auth().signOut().then(function () {
                    localStorage.removeItem('uid');
                    localStorage.removeItem('cart');
                    $scope.$apply(function () {
                        $scope.loggedIn = false;
                        $state.go('home');
                    });
                });
            }
        }
    }, 500);

    

    }]) //controller
