'use strict';

/**
 * @ngdoc function
 * @name eshopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eshopApp
 */
angular.module('eshopApp')
.controller('ProductController', function ($scope, $stateParams, $firebaseArray, $firebaseObject,firebase) {
    var id = parseInt($stateParams.id);
    var ref = firebase.database().ref('products');
    ref.orderByChild("id").equalTo(id).on("child_added", function (snapshot) {
        $scope.product = snapshot.val();
    });
});
