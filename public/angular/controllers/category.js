'use strict';
appModule.controller('CategoryController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', '$filter', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, $filter, icdb, alertService) {

        $scope.categoryObj = {};

        // Get expense 

      
        $scope.categoryObj.data = [];
        $scope.categoryObj.isloading = false;

        $scope.categoryObj.init = function() {
            $scope.categoryObj.isloading = true;
            icdb.getCondition('categories', {}, function(response) {
                $scope.categoryObj.data = response;
                $scope.categoryObj.isloading = false;
            });
        }

        $scope.categoryObj.init();
        $scope.categoryObj.add = {};
        $scope.categoryObj.businesslist = {};
        $scope.categoryObj.add.openModal = function(row) {
            $scope.categoryObj.add.model = {};

            icdb.getCondition('business', {}, function(response) {
               $scope.categoryObj.businesslist = response;
             });

            if (row && row._id) {
                $scope.categoryObj.add.model = angular.copy(row);
            }

            $('#categorypopup').modal('show');
        }

        $scope.categoryObj.add.closeModal = function() {
            $scope.categoryObj.add.model = {};
            $scope.categoryObj.add.isReqSent = false;
            $scope.categoryObj.add.isSubmit = false;
            $('#categorypopup').modal('hide');
        }


        $scope.categoryObj.add.model = {};
        $scope.categoryObj.add.isSubmit = false;
        $scope.categoryObj.add.isReqSent = false;
        $scope.categoryObj.add.submit = function(form) {
            if (!form.$valid) {
                $scope.categoryObj.add.isSubmit = true;
                return;
            }

            $scope.categoryObj.add.isReqSent = true;

            if ($scope.categoryObj.add.model._id) {
                icdb.update('categories', $scope.categoryObj.add.model._id, $scope.categoryObj.add.model, function(response) {

                    for (var i in $scope.categoryObj.data) {
                        if ($scope.categoryObj.data[i]._id == $scope.categoryObj.add.model._id) {
                            $scope.categoryObj.data[i] = angular.copy($scope.categoryObj.add.model);
                        }
                    }

                    alertService.flash('success', 'Updated successfully');
                    $scope.categoryObj.add.closeModal();
                });
            } else {
                icdb.insert('categories', $scope.categoryObj.add.model, function(response) {
                    $scope.categoryObj.data.push(response.result);
                    alertService.flash('success', 'Added successfully');
                    $scope.categoryObj.add.closeModal();
                });
            }
        }


        $scope.categoryObj.remove = {};
        $scope.categoryObj.remove.submit = function(row, model) { 
            $('#removecategoryData').modal('show');

            $scope.categoryObj.remove.removeData = function() {
                icdb.remove(model, row._id, function(response) {
                    for (var i in $scope.categoryObj.data) {
                        if ($scope.categoryObj.data[i]._id == row._id) {
                            $scope.categoryObj.data.splice(i, 1);
                        }
                    }
                    alertService.flash('success', 'Remove successfully');
                    $('#removecategoryData').modal('hide');
                });
            }
        };


    }
]);