'use strict';

/**
 * @ngdoc function
 * @name eshopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eshopApp
 */
angular.module('eshopApp')
    .controller('searchController', function ($scope, $firebaseArray, firebase,$timeout,Notification) {

        var categories = firebase.database().ref('category'),
        ref = firebase.database().ref('products');
        $scope.cats = $firebaseArray(categories);
        $scope.products = $firebaseArray(ref);
        $scope.show = false;
        $scope.mouseover = false;
        $scope.focus = function () {
            $scope.show = true;
        }
        $scope.blur = function () {
            $scope.show = false;
        }

        $scope.added= function () {
                Notification.success('Added to cart');
        }



        $scope.deleteProduct = function (product) {
            $scope.delete = "Product successfully deleted.";

            $timeout(function() {
                $scope.delete = false;
             }, 3000);
            $scope.products.$remove(product);
        };


        $scope.price_slider = {
            start: [0, 0],
            connect: true,
            step: 1,
            range: {
                min: 10,
                max: 2500
            }
        };



        $scope.$watchGroup(['price_slider.start[1]', 'price_slider.start[0]'], function (newValue, oldValue) {
            $scope.minPrice = newValue[1];
            $scope.maxPrice = newValue[0];
            if ($scope.maxPrice == '0' | $scope.maxPrice == '') {
                $scope.maxPrice = 1000000000;
            }
            $scope.pricefilter = function (product) {

                if ((product.price <= $scope.maxPrice) && (product.price >= $scope.minPrice)) {
                    return product;
                }
            };
        })

        $scope.flag = true;
        $scope.flagDelete = true;

    })

    .filter('reverse', function () {
        return function (items) {
            return items.slice().reverse();
        };
    })
