'use strict';
appModule.controller('BarcodeController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', '$filter', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, $filter, icdb, alertService) {

        $scope.barcodeObj = {};

        $scope.barcodeObj.data = [];
        $scope.barcodeObj.isloading = false;

        $scope.barcodeObj.init = function() {
            $scope.barcodeObj.isloading = true;
            icdb.getCondition('barcodes', {}, function(response) {
                $scope.barcodeObj.data = response;
                $scope.barcodeObj.isloading = false;
            });
        }

        $scope.barcodeObj.init();
        $scope.barcodeObj.add = {};
        $scope.barcodeObj.businesslist = {};
        $scope.barcodeObj.add.openModal = function(row) {
            $scope.barcodeObj.add.model = {};
           
            icdb.getCondition('business', {}, function(response) {
            $scope.barcodeObj.businesslist = response;
           
             });

            if (row && row._id) {
                $scope.barcodeObj.add.model = angular.copy(row);
              
            }

            $('#barcodepopup').modal('show');
        }

        $scope.barcodeObj.add.closeModal = function() {
            $scope.barcodeObj.add.model = {};
            $scope.barcodeObj.add.isReqSent = false;
            $scope.barcodeObj.add.isSubmit = false;
            $('#barcodepopup').modal('hide');
        }


        $scope.barcodeObj.add.model = {};
        $scope.barcodeObj.add.isSubmit = false;
        $scope.barcodeObj.add.isReqSent = false;
        $scope.barcodeObj.add.submit = function(form) {
            if (!form.$valid) {
                $scope.barcodeObj.add.isSubmit = true;
                return;
            }
            console.log("byyy");
            console.log($scope.barcodeObj.add.model);

            $scope.barcodeObj.add.isReqSent = true;

            if ($scope.barcodeObj.add.model._id) {
                icdb.update('barcodes', $scope.barcodeObj.add.model._id, $scope.barcodeObj.add.model, function(response) {

                    for (var i in $scope.barcodeObj.data) {
                        if ($scope.barcodeObj.data[i]._id == $scope.barcodeObj.add.model._id) {
                            $scope.barcodeObj.data[i] = angular.copy($scope.barcodeObj.add.model);
                        }
                    }

                    alertService.flash('success', 'Updated successfully');
                    $scope.barcodeObj.add.closeModal();
                });
            } else {
                icdb.insert('barcodes', $scope.barcodeObj.add.model, function(response) {
                    $scope.barcodeObj.data.push(response.result);
                    alertService.flash('success', 'Added successfully');
                    $scope.barcodeObj.add.closeModal();
                });
            }
        }


        $scope.barcodeObj.remove = {};
        $scope.barcodeObj.remove.submit = function(row, model) { 
            $('#removebarcodeData').modal('show');

            $scope.barcodeObj.remove.removeData = function() {
                icdb.remove(model, row._id, function(response) {
                    for (var i in $scope.barcodeObj.data) {
                        if ($scope.barcodeObj.data[i]._id == row._id) {
                            $scope.barcodeObj.data.splice(i, 1);
                        }
                    }
                    alertService.flash('success', 'Remove successfully');
                    $('#removebarcodeData').modal('hide');
                });
            }
        };


    }
]);