'use strict';
appModule.controller('StoreController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', '$filter', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, $filter, icdb, alertService) {

        $scope.storeObj = {};

       
        $scope.storeObj.data = [];
        $scope.storeObj.isloading = false;

        $scope.storeObj.init = function() {
            $scope.storeObj.isloading = true;
            icdb.getCondition('StoresDetail', {}, function(response) {
                $scope.storeObj.data = response;
                $scope.storeObj.isloading = false;
            });
        }

        $scope.storeObj.init();
        $scope.storeObj.add = {};
        $scope.storeObj.categorylist = {};
        $scope.storeObj.add.openModal = function(row) {
            $scope.storeObj.add.model = {};
           
            icdb.getCondition('Company', {}, function(response) {
            $scope.storeObj.categorylist = response;
             });

            if (row && row._id) {
                $scope.storeObj.add.model = angular.copy(row);
                $scope.companyObj.add.model.Phone = parseInt(row.Phone);
                $scope.companyObj.add.model.Postscode = parseInt(row.Postscode);
            }

            $('#storepopup').modal('show');
        }

        $scope.storeObj.add.closeModal = function() {
            $scope.storeObj.add.model = {};
            $scope.storeObj.add.isReqSent = false;
            $scope.storeObj.add.isSubmit = false;
            $('#storepopup').modal('hide');
        }


        $scope.storeObj.add.model = {};
        $scope.storeObj.add.isSubmit = false;
        $scope.storeObj.add.isReqSent = false;
        $scope.storeObj.add.submit = function(form) {
            if (!form.$valid) {
                $scope.storeObj.add.isSubmit = true;
                return;
            }

            $scope.storeObj.add.isReqSent = true;

            if ($scope.storeObj.add.model._id) {
                icdb.update('StoresDetail', $scope.storeObj.add.model._id, $scope.storeObj.add.model, function(response) {

                    for (var i in $scope.storeObj.data) {
                        if ($scope.storeObj.data[i]._id == $scope.storeObj.add.model._id) {
                            $scope.storeObj.data[i] = angular.copy($scope.storeObj.add.model);
                        }
                    }

                    alertService.flash('success', 'Updated successfully');
                    $scope.storeObj.add.closeModal();
                });
            } else {
                icdb.insert('StoresDetail', $scope.storeObj.add.model, function(response) {
                    $scope.storeObj.data.push(response.result);
                    alertService.flash('success', 'Added successfully');
                    $scope.storeObj.add.closeModal();
                });
            }
        }


        $scope.storeObj.remove = {};
        $scope.storeObj.remove.submit = function(row, model) { 
            $('#removestoreData').modal('show');

            $scope.storeObj.remove.removeData = function() {
                icdb.remove(model, row._id, function(response) {
                    for (var i in $scope.storeObj.data) {
                        if ($scope.storeObj.data[i]._id == row._id) {
                            $scope.storeObj.data.splice(i, 1);
                        }
                    }
                    alertService.flash('success', 'Remove successfully');
                    $('#removestoreData').modal('hide');
                });
            }
        };


    }
]);