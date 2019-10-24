'use strict';
appModule.controller('UnitController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', '$filter', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, $filter, icdb, alertService) {

        $scope.unitObj = {};

        

      
        $scope.unitObj.data = [];
        $scope.unitObj.isloading = false;

        $scope.unitObj.init = function() {
            $scope.unitObj.isloading = true;
            icdb.getCondition('units', {}, function(response) {
                $scope.unitObj.data = response;
                $scope.unitObj.isloading = false;
            });
        }

        $scope.unitObj.init();
        $scope.unitObj.add = {};
        $scope.unitObj.businesslist = {};
        $scope.unitObj.add.openModal = function(row) {
            $scope.unitObj.add.model = {};

            icdb.getCondition('business', {}, function(response) {
            $scope.unitObj.businesslist = response;
             });
            
            if (row && row._id) {
                $scope.unitObj.add.model = angular.copy(row);
            }

            $('#unitpopup').modal('show');
        }

        $scope.unitObj.add.closeModal = function() {
            $scope.unitObj.add.model = {};
            $scope.unitObj.add.isReqSent = false;
            $scope.unitObj.add.isSubmit = false;
            $('#unitpopup').modal('hide');
        }


        $scope.unitObj.add.model = {};
        $scope.unitObj.add.isSubmit = false;
        $scope.unitObj.add.isReqSent = false;
        $scope.unitObj.add.submit = function(form) {
            if (!form.$valid) {
                $scope.unitObj.add.isSubmit = true;
                return;
            }

            $scope.unitObj.add.isReqSent = true;

            if ($scope.unitObj.add.model._id) {
                icdb.update('units', $scope.unitObj.add.model._id, $scope.unitObj.add.model, function(response) {

                    for (var i in $scope.unitObj.data) {
                        if ($scope.unitObj.data[i]._id == $scope.unitObj.add.model._id) {
                            $scope.unitObj.data[i] = angular.copy($scope.unitObj.add.model);
                        }
                    }

                    alertService.flash('success', 'Updated successfully');
                    $scope.unitObj.add.closeModal();
                });
            } else {
                icdb.insert('units', $scope.unitObj.add.model, function(response) {
                    $scope.unitObj.data.push(response.result);
                    alertService.flash('success', 'Added successfully');
                    $scope.unitObj.add.closeModal();
                });
            }
        }


        $scope.unitObj.remove = {};
        $scope.unitObj.remove.submit = function(row, model) { 
            $('#removeunitData').modal('show');

            $scope.unitObj.remove.removeData = function() {
                icdb.remove(model, row._id, function(response) {
                    for (var i in $scope.unitObj.data) {
                        if ($scope.unitObj.data[i]._id == row._id) {
                            $scope.unitObj.data.splice(i, 1);
                        }
                    }
                    alertService.flash('success', 'Remove successfully');
                    $('#removeunitData').modal('hide');
                });
            }
        };


    }
]);