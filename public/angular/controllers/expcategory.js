'use strict';
appModule.controller('ExpcatController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', '$filter', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, $filter, icdb, alertService) {

        $scope.expcatObj = {};

        

      
        $scope.expcatObj.data = [];
        $scope.expcatObj.isloading = false;

        $scope.expcatObj.init = function() {
            $scope.expcatObj.isloading = true;
            icdb.getCondition('expense_categories', {}, function(response) {
                $scope.expcatObj.data = response;
                $scope.expcatObj.isloading = false;
            });
        }

        $scope.expcatObj.init();
        $scope.expcatObj.add = {};
        $scope.expcatObj.businesslist = {};
        $scope.expcatObj.add.openModal = function(row) {
            $scope.expcatObj.add.model = {};

            icdb.getCondition('business', {}, function(response) {
            $scope.expcatObj.businesslist = response;
             });
            
            if (row && row._id) {
                $scope.expcatObj.add.model = angular.copy(row);
            }

            $('#expcatpopup').modal('show');
        }

        $scope.expcatObj.add.closeModal = function() {
            $scope.expcatObj.add.model = {};
            $scope.expcatObj.add.isReqSent = false;
            $scope.expcatObj.add.isSubmit = false;
            $('#expcatpopup').modal('hide');
        }


        $scope.expcatObj.add.model = {};
        $scope.expcatObj.add.isSubmit = false;
        $scope.expcatObj.add.isReqSent = false;
        $scope.expcatObj.add.submit = function(form) {
            if (!form.$valid) {
                $scope.expcatObj.add.isSubmit = true;
                return;
            }

            $scope.expcatObj.add.isReqSent = true;

            if ($scope.expcatObj.add.model._id) {
                icdb.update('expense_categories', $scope.expcatObj.add.model._id, $scope.expcatObj.add.model, function(response) {

                    for (var i in $scope.expcatObj.data) {
                        if ($scope.expcatObj.data[i]._id == $scope.expcatObj.add.model._id) {
                            $scope.expcatObj.data[i] = angular.copy($scope.expcatObj.add.model);
                        }
                    }

                    alertService.flash('success', 'Updated successfully');
                    $scope.expcatObj.add.closeModal();
                });
            } else {
                icdb.insert('expense_categories', $scope.expcatObj.add.model, function(response) {
                    $scope.expcatObj.data.push(response.result);
                    alertService.flash('success', 'Added successfully');
                    $scope.expcatObj.add.closeModal();
                });
            }
        }


        $scope.expcatObj.remove = {};
        $scope.expcatObj.remove.submit = function(row, model) { 
            $('#removeexpcatData').modal('show');

            $scope.expcatObj.remove.removeData = function() {
                icdb.remove(model, row._id, function(response) {
                    for (var i in $scope.expcatObj.data) {
                        if ($scope.expcatObj.data[i]._id == row._id) {
                            $scope.expcatObj.data.splice(i, 1);
                        }
                    }
                    alertService.flash('success', 'Remove successfully');
                    $('#removeexpcatData').modal('hide');
                });
            }
        };


    }
]);