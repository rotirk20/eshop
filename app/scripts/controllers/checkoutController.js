'use strict';

/**
 * @ngdoc function
 * @name eshopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eshopApp
 */
angular.module('eshopApp')
    .controller('checkoutController', function ($scope, $stateParams, $firebaseArray, $firebaseObject, firebase) {
        let ref = firebase.database().ref('users/' + 'A0ObqRZ4HkMPPDgNjHeFRXHaX1J3').once('value').then(function(snapshot) {
            let userData = snapshot.val();
            console.log(ref);
        })
    });