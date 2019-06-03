'use strict';

/**
 * @ngdoc function
 * @name eshopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eshopApp
 */
angular.module('eshopApp')
    .controller('saleProducts', function ($sce, $scope, $stateParams, $firebaseArray, $firebaseObject, firebase) {
        var id = parseInt($stateParams.id),
            ref = firebase.database().ref('products');
            $scope.products = $firebaseArray(ref);  
});
