'use strict';

var appModule = angular.module('smModule', ['ngRoute', 'ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router', 'toastr', 'ngAnimate']);

appModule.run(function($rootScope, $timeout, $location, icdb, $http, alertService) {
    $rootScope.g = {};


    $rootScope.$on( "$stateChangeSuccess", function(event, next, current) {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $rootScope.g.location = $location.path();
    });


    $rootScope.g.getActiveClass = function(key) {
        if ($location.path() == key) {
            return 'active';
        }
        return '';
    }


    $rootScope.g.logout = function(key) {
        $http.post('api/user/logout').success(function() {
            $location.path('login');
        });
    }


    // ---------------- Date picker ----------------
    $rootScope.g.dtpObj = {};
    $rootScope.g.dtpObj.opened = false;
    $rootScope.g.dtpObj.format = 'dd-MM-yyyy';
    $rootScope.g.dtpObj.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };


    $rootScope.g.dtpObj.calObj = {};
    $rootScope.g.dtpObj.openDp = function(key) {
        $rootScope.g.dtpObj.calObj = {};
        $rootScope.g.dtpObj.calObj[key] = true;
    };
});



var checkLogIn = function($q, $timeout, $http, $location, $rootScope, status) {
    var deferred = $q.defer();

    // Make an AJAX call to check if the user is logged in
    $http.get('/api/user/me').success(function(userResponse) {

        // If user is not logged in
        if(!userResponse || !userResponse._id) {
            $location.path('/login');
            $timeout(deferred.reject);
            return;
        }

        $rootScope.g.loggedUser = userResponse;

        $timeout(deferred.reject);
    }).error(function() {
        $timeout(deferred.reject);
    });

    $timeout(deferred.reject);

    return deferred.promise;
}


var checkLogout = function($q, $timeout, $http, $location, $rootScope, status) {
    var deferred = $q.defer();

    // Make an AJAX call to check if the user is logged in
    $http.get('/api/user/me').success(function(userResponse) {

        // If user is not logged in
        if(!userResponse || !userResponse._id) {
            $timeout(deferred.reject);
            return;
        }

        $rootScope.g.loggedUser = userResponse;

        $timeout(deferred.reject);
    }).error(function() {
        $timeout(deferred.reject);
    });

    $timeout(deferred.reject);

    return deferred.promise;
}

// Check if the user is logged in
var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope) {
    checkLogIn($q, $timeout, $http, $location, $rootScope, true);
};

// Check if the user is logged in
var checkLogoutt = function($q, $timeout, $http, $location, $rootScope) {
    checkLogout($q, $timeout, $http, $location, $rootScope, true);
};


appModule.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode({
            enabled: false,
            requireBase: true
        }).hashPrefix('!');

        $stateProvider.state('login', {
            url: '/login',
            templateUrl: '/angular/views/login.html',
            resolve: {
                loggedin: checkLogoutt
            }
        });

        $stateProvider.state('register', {
            url: '/register',
            templateUrl: '/angular/views/register.html',
            resolve: {
                loggedin: checkLogoutt
            }
        });

        $stateProvider.state('index', {
            url: '/index',
            templateUrl: '/angular/views/index.html',
            resolve: {
                loggedin: checkLoggedIn
            }
        });

        $stateProvider.state('category', {
            url: '/category',
            templateUrl: '/angular/views/category.html',
            resolve: {
                loggedin: checkLoggedIn
            }
        });

        $stateProvider.state('subcategory', {
            url: '/subcategory',
            templateUrl: '/angular/views/subcategory.html',
            resolve: {
                loggedin: checkLoggedIn
            }
        });
        $stateProvider.state('storedetail', {
            url: '/storedetail',
            templateUrl: '/angular/views/storedetail.html',
            resolve: {
                loggedin: checkLoggedIn
            }
        });
        $stateProvider.state('company', {
            url: '/company',
            templateUrl: '/angular/views/company.html',
            resolve: {
                loggedin: checkLoggedIn
            }
        });
        $stateProvider.state('texdetail', {
            url: '/texdetail',
            templateUrl: '/angular/views/texdetail.html',
            resolve: {
                loggedin: checkLoggedIn
            }
        });        
        $stateProvider.state('discount', {
            url: '/discount',
            templateUrl: '/angular/views/discount.html',
            resolve: {
                loggedin: checkLoggedIn
            }
        });
        $stateProvider.state('contact', {
            url: '/contact',
            templateUrl: '/angular/views/contact.html',
            resolve: {
                loggedin: checkLoggedIn
            }
        });
        $stateProvider.state('product', {
            url: '/product',
            templateUrl: '/angular/views/product.html',
            resolve: {
                loggedin: checkLoggedIn
            }
        });
         $stateProvider.state('barcode', {
            url: '/barcode',
            templateUrl: '/angular/views/barcode.html',
            resolve: {
                loggedin: checkLoggedIn
            }
        });
        $stateProvider.state('brand', {
            url: '/brand',
            templateUrl: '/angular/views/brand.html',
            resolve: {
                loggedin: checkLoggedIn
            }
        });
        $stateProvider.state('currencies', {
            url: '/currencies',
            templateUrl: '/angular/views/currencies.html',
            resolve: {
                loggedin: checkLoggedIn
            }
        });
        $stateProvider.state('customergroup', {
            url: '/customergroup',
            templateUrl: '/angular/views/customergroup.html',
            resolve: {
                loggedin: checkLoggedIn
            }
        });
       $stateProvider.state('expcategory', {
            url: '/expcategory',
            templateUrl: '/angular/views/expcategory.html',
            resolve: {
                loggedin: checkLoggedIn
            }
        });
       $stateProvider.state('business', {
            url: '/business',
            templateUrl: '/angular/views/business.html',
            resolve: {
                loggedin: checkLoggedIn
            }
        });
        $stateProvider.state('unit', {
            url: '/unit',
            templateUrl: '/angular/views/unit.html',
            resolve: {
                loggedin: checkLoggedIn
            }
        });


        $urlRouterProvider.otherwise('/login');
    }
]);



appModule.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});