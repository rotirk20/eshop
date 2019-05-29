'use strict';

/**
 * @ngdoc overview
 * @name eshopApp
 * @description
 * # eshopApp
 *
 * Main module of the application.
 */
angular
  .module('eshopApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'firebase',
    'angularUtils.directives.dirPagination',
    'ui.bootstrap',
    'ngCart'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
        data : { pageTitle: 'Home' }
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        data : { pageTitle: 'About' }
      })
      .state('products', {
        url: '/products',
        templateUrl: 'views/products.html',
        controller: 'searchController'
      })
      .state('product', {
        url: '/product/:id',
        templateUrl: 'views/product-detail.html',
        controller: 'ProductController'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'views/register.html',
        controller: 'RegistrationController'
      })
      .state('addproduct', {
        url: '/add-product',
        templateUrl: 'views/addProduct.html',
        controller: 'addProduct'
      })
      .state('editproduct', {
        url: '/product/:id/edit',
        templateUrl: 'views/editProduct.html',
        controller: 'EditProduct'
      })
      .state('summary', {
        url: '/summary',
        templateUrl: 'views/summaryTotal.html',
        controller:'checkoutController'
      })
      .state('category', {
        url: '/categories',
        templateUrl: 'views/categories.html',
        controller:'categoryController'
      })
      .state('orders', {
        url:'/orders',
        templateUrl: 'views/orders.html',
        controller:'orderController'
      })

    $urlRouterProvider.otherwise('/');

  })
