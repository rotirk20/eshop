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
        ['$scope', '$firebase', '$firebaseAuth', '$state','$firebaseArray','$window',
            function ($scope, $firebase, $firebaseAuth, $state, $firebaseArray,$window) {

                var auth = $firebaseAuth();
                

                $scope.register = function () {
                    auth.$createUserWithEmailAndPassword(
                        $scope.user.email,
                        $scope.user.password
                    ).then(function (regUser) {
                        regUser.user.updateProfile({
                            displayName: $scope.user.firstname
                          })
                        $scope.message = $scope.user.firstname + " you registered successfully!";
                        var userRef = firebase.database().ref().child('users/' + regUser.user.uid);
                        userRef.set({
                            firstName: $scope.user.firstname,
                            lastName: $scope.user.lastname,
                            email: $scope.user.email
                          });
                        $scope.user.firstname = "";
                        $scope.user.lastname = "";
                        $scope.user.email = "";
                        $scope.user.password = "";
                        console.log(regUser.user.uid);
                        window.setTimeout(function () {
                            $scope.$apply(function () {
                                $state.go('home');
                                $window.location.href = '/';
                            })
                        }, 1000);

                    }).catch(function (error) {
                        $scope.messages = error.message;
                    }); //createUserWithEmailAndPassword
                }; //register

            }]) //controller