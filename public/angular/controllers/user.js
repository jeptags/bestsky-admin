'use strict';
appModule.controller('UserController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', 'alertService', '$timeout', '$state',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, alertService, $timeout, $state) {

        $scope.uObj = {};



        $scope.uObj.register = {};
        $scope.uObj.register.model = {};

        $scope.uObj.register.isSubmited = false;
        $scope.uObj.register.isReqSent = false;
        $scope.uObj.register.submit = function(form) {   
            console.log($scope.uObj.register.model);

            if (!form.$valid) {
                $scope.uObj.register.isSubmited = true;
                return;
            }


            $scope.uObj.register.isSubmited = false;
            $scope.uObj.register.isReqSent = true;

            $http.post('api/user/register', $scope.uObj.register.model).success(function(response) {
                $scope.uObj.register.isReqSent = false;

                if (response.status == 1) {
                    alertService.flash('error', 'User already register');
                    return;
                }
                if (response.status == 2) {
                    alertService.flash('error', response.errors[0].msg);
                    return;
                }
                $location.path('login');
            });
        }


        $scope.uObj.login = {};
        $scope.uObj.login.isSubmited = false;
        $scope.uObj.login.isReqSent = false;

        $scope.uObj.login.submit = function(form) {
            if (!form.$valid) {
                $scope.uObj.login.isSubmited = true;
                return;
            }
            $scope.uObj.login.isSubmited = false;
            $scope.uObj.login.isReqSent = true;

            $http.post('api/user/login', $scope.uObj.login.model).success(function(response) {
                $scope.uObj.login.isReqSent = false;

                if (!response.status) {
                    alertService.flash('error', response.msg);
                    return;
                }

                $location.path('index');
            });
        }



    }
]);
