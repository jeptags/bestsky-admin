'use strict';
appModule.controller('CureenciesController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', '$filter', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, $filter, icdb, alertService) {

        $scope.cureencyObj = {};

        

      
        $scope.cureencyObj.data = [];
        $scope.cureencyObj.isloading = false;

        $scope.cureencyObj.init = function() {
            $scope.cureencyObj.isloading = true;
            icdb.getCondition('currencies', {}, function(response) {
                $scope.cureencyObj.data = response;
                $scope.cureencyObj.isloading = false;
            });
        }

        $scope.cureencyObj.init();
        $scope.cureencyObj.add = {};
        $scope.cureencyObj.categorylist = {};
        $scope.cureencyObj.add.openModal = function(row) {
            $scope.cureencyObj.add.model = {};
           
            if (row && row._id) {
                $scope.cureencyObj.add.model = angular.copy(row);
            }

            $('#currenciespopup').modal('show');
        }

        $scope.cureencyObj.add.closeModal = function() {
            $scope.cureencyObj.add.model = {};
            $scope.cureencyObj.add.isReqSent = false;
            $scope.cureencyObj.add.isSubmit = false;
            $('#currenciespopup').modal('hide');
        }


        $scope.cureencyObj.add.model = {};
        $scope.cureencyObj.add.isSubmit = false;
        $scope.cureencyObj.add.isReqSent = false;
        $scope.cureencyObj.add.submit = function(form) {
            if (!form.$valid) {
                $scope.cureencyObj.add.isSubmit = true;
                return;
            }

            $scope.cureencyObj.add.isReqSent = true;

            if ($scope.cureencyObj.add.model._id) {
                icdb.update('currencies', $scope.cureencyObj.add.model._id, $scope.cureencyObj.add.model, function(response) {

                    for (var i in $scope.cureencyObj.data) {
                        if ($scope.cureencyObj.data[i]._id == $scope.cureencyObj.add.model._id) {
                            $scope.cureencyObj.data[i] = angular.copy($scope.cureencyObj.add.model);
                        }
                    }

                    alertService.flash('success', 'Updated successfully');
                    $scope.cureencyObj.add.closeModal();
                });
            } else {
                icdb.insert('currencies', $scope.cureencyObj.add.model, function(response) {
                    $scope.cureencyObj.data.push(response.result);
                    alertService.flash('success', 'Added successfully');
                    $scope.cureencyObj.add.closeModal();
                });
            }
        }


        $scope.cureencyObj.remove = {};
        $scope.cureencyObj.remove.submit = function(row, model) { 
            $('#removecurrenciesData').modal('show');

            $scope.cureencyObj.remove.removeData = function() {
                icdb.remove(model, row._id, function(response) {
                    for (var i in $scope.cureencyObj.data) {
                        if ($scope.cureencyObj.data[i]._id == row._id) {
                            $scope.cureencyObj.data.splice(i, 1);
                        }
                    }
                    alertService.flash('success', 'Remove successfully');
                    $('#removecurrenciesData').modal('hide');
                });
            }
        };


    }
]);