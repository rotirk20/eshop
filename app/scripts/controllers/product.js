'use strict';

/**
 * @ngdoc function
 * @name eshopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eshopApp
 */
angular.module('eshopApp')
.controller('ProductController', function ($sce,$scope, $stateParams, $firebaseArray, $firebaseObject,firebase) {
    var id = parseInt($stateParams.id),
    ref = firebase.database().ref('products');
    ref.orderByChild("id").equalTo(id).on("child_added", function (snapshot) {
        $scope.product = snapshot.val();
        $scope.html = $scope.product.description;
        $scope.trustedHtml = $sce.trustAsHtml($scope.html);
    })
});
