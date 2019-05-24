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
            console.log(ref);
        });

        $scope.options = [{ currency: "EUR" },
        { currency: "BAM" }];

        $scope.$watch('selectedOption', function () {
            if($scope.selectedOption === "BAM") {
                $scope.products.price = $scope.products.price / 2;
                console.log($scope.products)
            }
            else if($scope.selectedOption === "EUR") {
                $scope.products.price = $scope.products.price;
                console.log($scope.products.price)
            }
        })

    })
