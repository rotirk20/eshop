'use strict';

/**
 * @ngdoc function
 * @name eshopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eshopApp
 */
angular.module('eshopApp')
    .controller('addProduct', ['$scope', '$firebaseAuth', '$location', '$firebaseArray', '$firebase', '$state', '$timeout', function ($scope, $firebaseAuth, $location, $firebaseArray, $firebase, $state, $timeout, Notification) {
        if ($scope.admin) {
            var productsRef = firebase.database().ref('products'),
                categories = firebase.database().ref('category');

            productsRef.on('value', function (snapshot) {

                //Finally you get the 'posts' node and send to scope
                $scope.productsRef = snapshot.val();

            });


            // GET PRODUCTS AS AN ARRAY
            $scope.products = $firebaseArray(productsRef);
            $scope.cats = $firebaseArray(categories);

            $scope.msg = "";
            // ADD PRODUCT ITEM METHOD
            $scope.saveData = function () {
                // CREATE A UNIQUE ID
                var timestamp = Math.floor(Math.random() * 90000) + 10000;
                $scope.products.$add({
                    date: firebase.database.ServerValue.TIMESTAMP,
                    id: timestamp,
                    name: $scope.product.name,
                    ram: $scope.product.ram,
                    processor: $scope.product.processor,
                    display: $scope.product.display,
                    gpu: $scope.product.gpu,
                    description: $scope.product.description,
                    price: parseInt($scope.product.price),
                    discount: parseInt($scope.product.discount),
                    category: $scope.product.category.category,
                    imageurl: imageUrl
                })
                    $scope.msg = "Product added";
                    $scope.product.name = "";
                    $scope.product.ram = "",
                    $scope.product.processor = "";
                    $scope.product.display = "";
                    $scope.product.price = "";
                    $scope.product.discount = "";
                    $scope.product.category = "";
                    $scope.product.description = "";
                    $scope.product.image = "";
                    $scope.product.gpu = "";
                    imageUrl = "";
                    $timeout(function () {
                        $state.reload();
                    }, 1500);
                
            }
            // Add category
            $scope.addCategory = function () {
                $scope.msg = "Category is created.";
                $scope.cats.$add({
                    category: $scope.category
                })
                $scope.category = "";
            }


            categories.on('value', function (snapshot) {

                //Finally you get the 'posts' node and send to scope
                $scope.categories = snapshot.val();

            });
            //File upload image
            var uploader = document.getElementById('uploader'),
                imageUrl,
                fileButton = document.getElementById('fileButton');

            fileButton.addEventListener('change', function (e) {

                var file = e.target.files[0],
                    storageRef = firebase.storage().ref('images').child(file.name),
                    task = storageRef.put(file);

                task.on('state_changed',

                    function progress(snapshot) {
                        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        uploader.value = percentage;
                        if (percentage == 100) {
                            storageRef.getDownloadURL().then(function (url) {
                                imageUrl = url;
                            });
                        };
                    });
            });
        }
        else {
            $state.go('home');
        }


    }])