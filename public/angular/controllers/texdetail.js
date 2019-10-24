'use strict';
appModule.controller('TexController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', '$filter', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, $filter, icdb, alertService) {

        $scope.texObj = {};

       

      
        $scope.texObj.data = [];
        $scope.texObj.isloading = false;

        $scope.texObj.init = function() {
            $scope.texObj.isloading = true;
            icdb.getCondition('tax_rates', {}, function(response) {
                $scope.texObj.data = response;
                $scope.texObj.isloading = false;
            });
        }

        $scope.texObj.init();
        $scope.texObj.add = {};
        $scope.texObj.businesslist = {};
        $scope.texObj.add.openModal = function(row) {
            $scope.texObj.add.model = {};
             icdb.getCondition('business', {}, function(response) {
                $scope.texObj.businesslist = response;
             });

            if (row && row._id) {
                $scope.texObj.add.model = angular.copy(row);
                $scope.texObj.add.model.Rate = parseInt(row.Rate);
            }

            $('#texpopup').modal('show');
        }

        $scope.texObj.add.closeModal = function() {
            $scope.texObj.add.model = {};
            $scope.texObj.add.isReqSent = false;
            $scope.texObj.add.isSubmit = false;
            $('#texpopup').modal('hide');
        }


        $scope.texObj.add.model = {};
        $scope.texObj.add.isSubmit = false;
        $scope.texObj.add.isReqSent = false;
        $scope.texObj.add.submit = function(form) {
            if (!form.$valid) {
                $scope.texObj.add.isSubmit = true;
                return;
            }

            $scope.texObj.add.isReqSent = true;

            if ($scope.texObj.add.model._id) {
                icdb.update('tax_rates', $scope.texObj.add.model._id, $scope.texObj.add.model, function(response) {

                    for (var i in $scope.texObj.data) {
                        if ($scope.texObj.data[i]._id == $scope.texObj.add.model._id) {
                            $scope.texObj.data[i] = angular.copy($scope.texObj.add.model);
                        }
                    }

                    alertService.flash('success', 'Updated successfully');
                    $scope.texObj.add.closeModal();
                });
            } else {
                icdb.insert('tax_rates', $scope.texObj.add.model, function(response) {
                    $scope.texObj.data.push(response.result);
                    alertService.flash('success', 'Added successfully');
                    $scope.texObj.add.closeModal();
                });
            }
        }


        $scope.texObj.remove = {};
        $scope.texObj.remove.submit = function(row, model) { 
            $('#removetexData').modal('show');

            $scope.texObj.remove.removeData = function() {
                icdb.remove(model, row._id, function(response) {
                    for (var i in $scope.texObj.data) {
                        if ($scope.texObj.data[i]._id == row._id) {
                            $scope.texObj.data.splice(i, 1);
                        }
                    }
                    alertService.flash('success', 'Remove successfully');
                    $('#removetexData').modal('hide');
                });
            }
        };


    }
]);