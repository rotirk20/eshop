'use strict';

/**
 * @ngdoc function
 * @name eshopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eshopApp
 */
angular.module('eshopApp')
.controller('EditProduct', ['$scope', '$firebaseAuth', '$location', '$firebaseArray', '$firebase', '$stateParams', '$firebaseObject', '$state','$timeout', function ($scope, $firebaseAuth, $location, $firebaseArray, $firebase, $stateParams, $firebaseObject, $state,$timeout) {
    if ($scope.admin) {
        var id = parseInt($stateParams.id);
        var ref = firebase.database().ref('products');
        ref.orderByChild("id").equalTo(id).on("child_added", function (snapshot) {
            $scope.product = snapshot.val();

            $scope.editProduct = function (id) {
                $scope.msg3 = "Product successfully updated.";

                $timeout(function() {
                    $scope.msg3 = false;
                 }, 3000);
                $scope.msg3 = "Product successfully updated.";
                snapshot.ref.update({
                    name: $scope.product.name,
                    ram: $scope.product.ram,
                    price: $scope.product.price,
                    //category: $scope.product.category.category
                })
                    .then(
                        function (ref) {
                           
                        }
                        , function (error) {
                            console.log(error.code);
                        }
                    );
            }
        });
        var categories = firebase.database().ref('category');


        // GET PRODUCTS AS AN ARRAY
        categories.on('value', function (snapshot) {

            //Finally you get the 'posts' node and send to scope
            $scope.categories = snapshot.val();

        });
    }
    else {
        $state.go('home');
    }


}])