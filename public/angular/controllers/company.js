'use strict';
appModule.controller('CompanyController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', '$filter', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, $filter, icdb, alertService) {

        $scope.companyObj = {};

        // Get expense 

      
        $scope.companyObj.data = [];
        $scope.companyObj.isloading = false;

        $scope.companyObj.init = function() {
            $scope.companyObj.isloading = true;
            icdb.getCondition('Company', {}, function(response) {
                $scope.companyObj.data = response;
                $scope.companyObj.isloading = false;
            });
        }

        $scope.companyObj.init();
        $scope.companyObj.add = {};
        $scope.companyObj.businesslist = {};
        $scope.companyObj.add.openModal = function(row) {
            $scope.companyObj.add.model = {};
           
            icdb.getCondition('business', {}, function(response) {
            $scope.companyObj.businesslist = response;
             });

            if (row && row._id) {
                $scope.companyObj.add.model = angular.copy(row);
                $scope.companyObj.add.model.Phone = parseInt(row.Phone);
                $scope.companyObj.add.model.Postscode = parseInt(row.Postscode);
            }

            $('#companypopup').modal('show');
        }

        $scope.companyObj.add.closeModal = function() {
            $scope.companyObj.add.model = {};
            $scope.companyObj.add.isReqSent = false;
            $scope.companyObj.add.isSubmit = false;
            $('#companypopup').modal('hide');
        }


        $scope.companyObj.add.model = {};
        $scope.companyObj.add.isSubmit = false;
        $scope.companyObj.add.isReqSent = false;
        $scope.companyObj.add.submit = function(form) {
            if (!form.$valid) {
                $scope.companyObj.add.isSubmit = true;
                return;
            }

            $scope.companyObj.add.isReqSent = true;

            if ($scope.companyObj.add.model._id) {
                icdb.update('Company', $scope.companyObj.add.model._id, $scope.companyObj.add.model, function(response) {

                    for (var i in $scope.companyObj.data) {
                        if ($scope.companyObj.data[i]._id == $scope.companyObj.add.model._id) {
                            $scope.companyObj.data[i] = angular.copy($scope.companyObj.add.model);
                        }
                    }

                    alertService.flash('success', 'Updated successfully');
                    $scope.companyObj.add.closeModal();
                });
            } else {
                icdb.insert('Company', $scope.companyObj.add.model, function(response) {
                    $scope.companyObj.data.push(response.result);
                    alertService.flash('success', 'Added successfully');
                    $scope.companyObj.add.closeModal();
                });
            }
        }


        $scope.companyObj.remove = {};
        $scope.companyObj.remove.submit = function(row, model) { 
            $('#removecompanyData').modal('show');

            $scope.companyObj.remove.removeData = function() {
                icdb.remove(model, row._id, function(response) {
                    for (var i in $scope.companyObj.data) {
                        if ($scope.companyObj.data[i]._id == row._id) {
                            $scope.companyObj.data.splice(i, 1);
                        }
                    }
                    alertService.flash('success', 'Remove successfully');
                    $('#removecompanyData').modal('hide');
                });
            }
        };


    }
]);