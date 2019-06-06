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
        ['$scope', '$firebase', '$firebaseAuth', '$state', '$firebaseArray', '$window',
            function ($scope, $firebase, $firebaseAuth, $state, $firebaseArray, $window) {

                var auth = $firebaseAuth();

                $scope.register = function () {

                    var ref = firebase.database().ref('users');
                    var q = ref.orderByChild('email').equalTo($scope.user.email);
                    q.once('value', function (snapshot) {
                        if (snapshot.val() === null) {
                            $scope.emailDup = false;
                            auth.$createUserWithEmailAndPassword(
                                $scope.user.email,
                                $scope.user.password
                            ).then(function (regUser) {
                                $scope.emailDup = false;
                                regUser.user.updateProfile({
                                    displayName: $scope.user.firstname,
                                    phoneNumber: $scope.user.phone
                                })
                                $scope.message = $scope.user.firstname + " you registered successfully!";
                                var userRef = firebase.database().ref().child('users/' + regUser.user.uid);
                                userRef.set({
                                    firstName: $scope.user.firstname,
                                    lastName: $scope.user.lastname,
                                    email: $scope.user.email,
                                    country: $scope.user.country,
                                    city: $scope.user.city,
                                    address: $scope.user.address,
                                    phone: $scope.user.phone
                                });
                                $scope.user.firstname = "";
                                $scope.user.lastname = "";
                                $scope.user.email = "";
                                $scope.user.password = "";
                                $scope.user.country = "";
                                $scope.user.city = "";
                                $scope.user.address = "";
                                $scope.user.phone = "";
                                console.log(regUser.user.uid);
                                window.setTimeout(function () {
                                    $scope.$apply(function () {
                                        $window.location.href = '/';
                                    })
                                }, 1000);
        
                            }).catch(function (error) {
                                $scope.messages = error.message;
                            }); //createUserWithEmailAndPassword
                        } else {
                            $scope.$apply(function(){
                                $scope.emailDup = true;
                           });
                        }
                    });

                
                }; //register

            }]) //controller