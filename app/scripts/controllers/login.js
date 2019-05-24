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
['$scope', '$firebase', '$firebaseAuth', '$state',
    function ($scope, $firebase, $firebaseAuth, $state, $rootScope) {
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
                    $scope.userUID = firebaseUser.uid;
                    $scope.adminUID = '8lp0t1nLTMVa1EIY4L3wbF7a7ot2';
                    if ($scope.userUID === $scope.adminUID) {
                        $scope.admin = true;
                    }
                } else {
                    $scope.loggedIn = false;
                    $scope.admin = false;
                }
            });


            $scope.login = function () {
                $scope.firebaseUser = null;
                $scope.error = null;


                $scope.auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function (firebaseUser) {
                    $scope.firebaseUser = firebaseUser;
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
                    console.log($scope.error);
                });


            };

            $scope.signOut = function () {
                firebase.auth().signOut().then(function () {
                    $scope.$apply(function () {
                        $scope.loggedIn = false;
                        $state.go('login');
                    });
                });
            }
        }

    }]) //controller
