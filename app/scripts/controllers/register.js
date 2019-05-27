'use strict';

/**
 * @ngdoc function
 * @name eshopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eshopApp
 */
angular.module('eshopApp')
.controller('RegistrationController',
        ['$scope', '$firebase', '$firebaseAuth', '$state',
            function ($scope, $firebase, $firebaseAuth, $state) {

                var ref = firebase.database().ref();
                var auth = $firebaseAuth();



                $scope.register = function () {


                    auth.$createUserWithEmailAndPassword(
                        $scope.user.email,
                        $scope.user.password
                    ).then(function (regUser) {
                        $scope.message = $scope.user.firstname + " you registered successfully!";
                        $scope.user.firstname = "";
                        $scope.user.lastname = "";
                        $scope.user.email = "";
                        $scope.user.password = "";
                        console.log(regUser);
                        window.setTimeout(function () {
                            $scope.$apply(function () {
                                $state.go('home');
                            })
                        }, 1000);


                    }).catch(function (error) {
                        $scope.messages = error.message;
                    }); //createUserWithEmailAndPassword
                }; //register

            }]) //controller