'use strict';
appModule.controller('DiscountController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', '$filter', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, $filter, icdb, alertService) {

        $scope.discountObj = {};

        
        $scope.discountObj.data = [];
        $scope.discountObj.isloading = false;

        $scope.discountObj.init = function() {
            $scope.discountObj.isloading = true;
            icdb.getCondition('Discount', {}, function(response) {
                $scope.discountObj.data = response;
                $scope.discountObj.isloading = false;
            });
        }

        $scope.discountObj.init();


        $scope.discountObj.add = {};
        $scope.discountObj.add.openModal = function(row) {
            $scope.discountObj.add.model = {};
            $scope.discountObj.add.model.ValidDate = new Date();

            if (row && row._id) {
                $scope.discountObj.add.model = angular.copy(row);
                $scope.discountObj.add.model.ValidDate = new Date(row.ValidDate);
                $scope.discountObj.add.model.Percentage = parseInt(row.Percentage);
               
            }

            $('#discountpopup').modal('show');
        }

        $scope.discountObj.add.closeModal = function() {
            $scope.discountObj.add.model = {};
            $scope.discountObj.add.isReqSent = false;
            $scope.discountObj.add.isSubmit = false;
            $('#discountpopup').modal('hide');
        }


        $scope.discountObj.add.model = {};
        $scope.discountObj.add.isSubmit = false;
        $scope.discountObj.add.isReqSent = false;
        $scope.discountObj.add.submit = function(form) {
            if (!form.$valid) {
                $scope.discountObj.add.isSubmit = true;
                return;
            }
             console.log($scope.discountObj.add.model);

            $scope.discountObj.add.isReqSent = true;

            if ($scope.discountObj.add.model._id) {
                icdb.update('Discount', $scope.discountObj.add.model._id, $scope.discountObj.add.model, function(response) {

                    for (var i in $scope.discountObj.data) {
                        if ($scope.discountObj.data[i]._id == $scope.discountObj.add.model._id) {
                            $scope.discountObj.data[i] = angular.copy($scope.discountObj.add.model);
                        }
                    }

                    alertService.flash('success', 'Updated successfully');
                    $scope.discountObj.add.closeModal();
                });
            } else {
                icdb.insert('Discount', $scope.discountObj.add.model, function(response) {
                    $scope.discountObj.data.push(response.result);
                    alertService.flash('success', 'Added successfully');
                    $scope.discountObj.add.closeModal();
                });
            }
        }


        $scope.discountObj.remove = {};
        $scope.discountObj.remove.submit = function(row, model) { 
            $('#removediscountData').modal('show');

            $scope.discountObj.remove.removeData = function() {
                icdb.remove(model, row._id, function(response) {
                    for (var i in $scope.discountObj.data) {
                        if ($scope.discountObj.data[i]._id == row._id) {
                            $scope.discountObj.data.splice(i, 1);
                        }
                    }
                    alertService.flash('success', 'Remove successfully');
                    $('#removediscountData').modal('hide');
                });
            }
        };


    }
]);