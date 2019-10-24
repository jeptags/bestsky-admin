'use strict';
appModule.controller('ContactController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', '$filter', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, $filter, icdb, alertService) {

        $scope.contactObj = {};

        // Get expense 

      
        $scope.contactObj.data = [];
        $scope.contactObj.isloading = false;

        $scope.contactObj.init = function() {
            $scope.contactObj.isloading = true;
            icdb.getCondition('contacts', {}, function(response) {
                $scope.contactObj.data = response;
                $scope.contactObj.isloading = false;
            });
        }

        $scope.contactObj.init();
        $scope.contactObj.add = {};
        $scope.contactObj.cusgrouplist = {};
        $scope.contactObj.add.openModal = function(row) {
            $scope.contactObj.add.model = {};
           
            icdb.getCondition('business', {}, function(response) {
            $scope.contactObj.businesslist = response;
             });

            icdb.getCondition('customer_groups', {}, function(response) {
            $scope.contactObj.cusgrouplist = response;
             });

            if (row && row._id) {
                $scope.contactObj.add.model = angular.copy(row);
                $scope.contactObj.add.model.Phone = parseInt(row.Phone);
                $scope.contactObj.add.model.Postscode = parseInt(row.Postscode);
            }

            $('#contactpopup').modal('show');
        }

        $scope.contactObj.add.closeModal = function() {
            $scope.contactObj.add.model = {};
            $scope.contactObj.add.isReqSent = false;
            $scope.contactObj.add.isSubmit = false;
            $('#contactpopup').modal('hide');
        }


        $scope.contactObj.add.model = {};
        $scope.contactObj.add.isSubmit = false;
        $scope.contactObj.add.isReqSent = false;
        $scope.contactObj.add.submit = function(form) {
            if (!form.$valid) {
                $scope.contactObj.add.isSubmit = true;
                return;
            }

            $scope.contactObj.add.isReqSent = true;

            if ($scope.contactObj.add.model._id) {
                icdb.update('contacts', $scope.contactObj.add.model._id, $scope.contactObj.add.model, function(response) {

                    for (var i in $scope.contactObj.data) {
                        if ($scope.contactObj.data[i]._id == $scope.contactObj.add.model._id) {
                            $scope.contactObj.data[i] = angular.copy($scope.contactObj.add.model);
                        }
                    }

                    alertService.flash('success', 'Updated successfully');
                    $scope.contactObj.add.closeModal();
                });
            } else {
                icdb.insert('contacts', $scope.contactObj.add.model, function(response) {
                    $scope.contactObj.data.push(response.result);
                    alertService.flash('success', 'Added successfully');
                    $scope.contactObj.add.closeModal();
                });
            }
        }


        $scope.contactObj.remove = {};
        $scope.contactObj.remove.submit = function(row, model) { 
            $('#removecontactData').modal('show');

            $scope.contactObj.remove.removeData = function() {
                icdb.remove(model, row._id, function(response) {
                    for (var i in $scope.contactObj.data) {
                        if ($scope.contactObj.data[i]._id == row._id) {
                            $scope.contactObj.data.splice(i, 1);
                        }
                    }
                    alertService.flash('success', 'Remove successfully');
                    $('#removecontactData').modal('hide');
                });
            }
        };


    }
]);