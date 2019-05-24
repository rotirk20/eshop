'use strict';

/**
 * @ngdoc function
 * @name eshopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eshopApp
 */
angular.module('eshopApp')
    .controller('searchController', function ($scope, $firebaseArray, firebase) {

        const ref = firebase.database().ref('products');
        $scope.products = $firebaseArray(ref);
        $scope.show = false;
        $scope.mouseover = false;
        $scope.focus = function () {
            $scope.show = true;
        }
        $scope.blur = function () {
            $scope.show = false;
        }

        $scope.deleteProduct = function (product) {
            $scope.products.$remove(product);
        };

        /* Add to cart */

        //iniating the myCart object
        $scope.myCart = [];

        //items available in the table 


        $scope.addItems = function (product) {
            $scope.products.push(product);
            $scope.product = {};
        };

        $scope.addToCart = function (product) {
            $scope.myCart.push(angular.copy(product));
            $scope.amount += product.price;
            $scope.quant = $scope.myCart.length;
        };



        $scope.getTotalAmount = function () {
            var i = 0;
            for (i = 0; i < $scope.myCart.length; i++) {
                $scope.myCart.product.price[i] * $scope.myCart.product.price[i];
            }
        };


        $scope.amount = 0.00;


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
            if ($scope.maxPrice == '0') {
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

        $scope.search=[];



    })

    .filter('reverse', function () {
        return function (items) {
            return items.slice().reverse();
        };
    });
