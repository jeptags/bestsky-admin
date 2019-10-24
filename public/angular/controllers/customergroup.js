'use strict';
appModule.controller('CustomerGroupController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', '$filter', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, $filter, icdb, alertService) {

        $scope.custgrpObj = {};

        

      
        $scope.custgrpObj.data = [];
        $scope.custgrpObj.isloading = false;

        $scope.custgrpObj.init = function() {
            $scope.custgrpObj.isloading = true;
            icdb.getCondition('customer_groups', {}, function(response) {
                $scope.custgrpObj.data = response;
                $scope.custgrpObj.isloading = false;
            });
        }

        $scope.custgrpObj.init();
        $scope.custgrpObj.add = {};
        $scope.custgrpObj.businesslist = {};
        $scope.custgrpObj.add.openModal = function(row) {
            $scope.custgrpObj.add.model = {};

            icdb.getCondition('business', {}, function(response) {
            $scope.custgrpObj.businesslist = response;
             });
            
            if (row && row._id) {
                $scope.custgrpObj.add.model = angular.copy(row);
            }

            $('#custgrppopup').modal('show');
        }

        $scope.custgrpObj.add.closeModal = function() {
            $scope.custgrpObj.add.model = {};
            $scope.custgrpObj.add.isReqSent = false;
            $scope.custgrpObj.add.isSubmit = false;
            $('#custgrppopup').modal('hide');
        }


        $scope.custgrpObj.add.model = {};
        $scope.custgrpObj.add.isSubmit = false;
        $scope.custgrpObj.add.isReqSent = false;
        $scope.custgrpObj.add.submit = function(form) {
            if (!form.$valid) {
                $scope.custgrpObj.add.isSubmit = true;
                return;
            }

            $scope.custgrpObj.add.isReqSent = true;

            if ($scope.custgrpObj.add.model._id) {
                icdb.update('customer_groups', $scope.custgrpObj.add.model._id, $scope.custgrpObj.add.model, function(response) {

                    for (var i in $scope.custgrpObj.data) {
                        if ($scope.custgrpObj.data[i]._id == $scope.custgrpObj.add.model._id) {
                            $scope.custgrpObj.data[i] = angular.copy($scope.custgrpObj.add.model);
                        }
                    }

                    alertService.flash('success', 'Updated successfully');
                    $scope.custgrpObj.add.closeModal();
                });
            } else {
                icdb.insert('customer_groups', $scope.custgrpObj.add.model, function(response) {
                    $scope.custgrpObj.data.push(response.result);
                    alertService.flash('success', 'Added successfully');
                    $scope.custgrpObj.add.closeModal();
                });
            }
        }


        $scope.custgrpObj.remove = {};
        $scope.custgrpObj.remove.submit = function(row, model) { 
            $('#removecusgrpData').modal('show');

            $scope.custgrpObj.remove.removeData = function() {
                icdb.remove(model, row._id, function(response) {
                    for (var i in $scope.custgrpObj.data) {
                        if ($scope.custgrpObj.data[i]._id == row._id) {
                            $scope.custgrpObj.data.splice(i, 1);
                        }
                    }
                    alertService.flash('success', 'Remove successfully');
                    $('#removecusgrpData').modal('hide');
                });
            }
        };


    }
]);