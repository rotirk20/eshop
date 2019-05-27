'use strict';

/**
 * @ngdoc function
 * @name eshopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eshopApp
 */
angular.module('eshopApp')
    .controller('categoryController', function ($scope, $firebaseArray, firebase,$timeout,$state) {
        if ($scope.admin) {
        var ref = firebase.database().ref('category');
        $scope.categories = $firebaseArray(ref);


        $scope.addCategory = function () {
            $scope.msg = "Category is created.";
            $timeout(function() {
                $scope.msg = false;
             }, 3000);
            $scope.categories.$add({
                category: $scope.category
            })
            $scope.category = "";
        }

        $scope.deleteCat = function (category) {
            $scope.msgDel = "Category deleted.";

            $timeout(function() {
                $scope.msgDel = false;
             }, 3000);
            $scope.categories.$remove(category);
        };
        } else {
            $state.go('home');
        }

});