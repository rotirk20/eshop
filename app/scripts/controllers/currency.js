'use strict';

/**
 * @ngdoc function
 * @name eshopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eshopApp
 */
angular.module('eshopApp')
    .controller('currencyController',function ($scope, $stateParams, $firebaseArray, $firebaseObject, firebase) {
        const ref = firebase.database().ref('products');
        $scope.products = $firebaseArray(ref);

        ref.on('value', function (snapshot) {

            //Finally you get the 'posts' node and send to scope
            $scope.ref = snapshot.val();
        });

        $scope.currency = {};
    $scope.currencies = [
        {"value": 1, "currency": "EUR"},
        {"value": 2, "currency": "BAM"}
    ];
    $scope.$watch("currency", function() {
        if ($scope.currency.currency === "BAM") {
            $scope.products.price = $scope.products.price / 2;
            console.log('Cijena promjenjena');
        }
    });

    })
