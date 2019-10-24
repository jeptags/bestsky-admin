'use strict';
appModule.controller('BrandController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', '$filter', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, $filter, icdb, alertService) {

        $scope.brandObj = {};

        

      
        $scope.brandObj.data = [];
        $scope.brandObj.isloading = false;

        $scope.brandObj.init = function() {
            $scope.brandObj.isloading = true;
            icdb.getCondition('brands', {}, function(response) {
                $scope.brandObj.data = response;
                $scope.brandObj.isloading = false;
            });
        }

        $scope.brandObj.init();
        $scope.brandObj.add = {};
        $scope.brandObj.businesslist = {};
        $scope.brandObj.add.openModal = function(row) {
            $scope.brandObj.add.model = {};
           
            icdb.getCondition('business', {}, function(response) {
            $scope.brandObj.businesslist = response;
             });

            if (row && row._id) {
                $scope.brandObj.add.model = angular.copy(row);              
            }

            $('#brandpopup').modal('show');
        }

        $scope.brandObj.add.closeModal = function() {
            $scope.brandObj.add.model = {};
            $scope.brandObj.add.isReqSent = false;
            $scope.brandObj.add.isSubmit = false;
            $('#brandpopup').modal('hide');
        }


        $scope.brandObj.add.model = {};
        $scope.brandObj.add.isSubmit = false;
        $scope.brandObj.add.isReqSent = false;
        $scope.brandObj.add.submit = function(form) {
            if (!form.$valid) {
                $scope.brandObj.add.isSubmit = true;
                return;
            }

            $scope.brandObj.add.isReqSent = true;

            if ($scope.brandObj.add.model._id) {
                icdb.update('brands', $scope.brandObj.add.model._id, $scope.brandObj.add.model, function(response) {

                    for (var i in $scope.brandObj.data) {
                        if ($scope.brandObj.data[i]._id == $scope.brandObj.add.model._id) {
                            $scope.brandObj.data[i] = angular.copy($scope.brandObj.add.model);
                        }
                    }

                    alertService.flash('success', 'Updated successfully');
                    $scope.brandObj.add.closeModal();
                });
            } else {
                icdb.insert('brands', $scope.brandObj.add.model, function(response) {
                    $scope.brandObj.data.push(response.result);
                    alertService.flash('success', 'Added successfully');
                    $scope.brandObj.add.closeModal();
                });
            }
        }


        $scope.brandObj.remove = {};
        $scope.brandObj.remove.submit = function(row, model) { 
            $('#removebrandData').modal('show');

            $scope.brandObj.remove.removeData = function() {
                icdb.remove(model, row._id, function(response) {
                    for (var i in $scope.brandObj.data) {
                        if ($scope.brandObj.data[i]._id == row._id) {
                            $scope.brandObj.data.splice(i, 1);
                        }
                    }
                    alertService.flash('success', 'Remove successfully');
                    $('#removebrandData').modal('hide');
                });
            }
        };


    }
]);