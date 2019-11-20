'use strict';
appModule.controller('BatchController', ['$scope', 'icdb', 'alertService',
    function($scope, icdb, alertService) {
        $scope.batchObj = {};
      
        $scope.batchObj.data = [];
        $scope.batchObj.isloading = false;

        $scope.batchObj.init = function() {
            $scope.batchObj.isloading = true;
            icdb.getCondition('batches', {}, function(response) {
                $scope.batchObj.data = response;
                $scope.batchObj.isloading = false;
            });
        }

        $scope.batchObj.init();
        $scope.batchObj.add = {};
        $scope.batchObj.businesslist = {};
        $scope.batchObj.add.openModal = function(row) {
            $scope.batchObj.add.model = {};

            icdb.getCondition('products', {}, function(response) {
                $scope.batchObj.productlist = response
            });

            if (row && row._id) {
                $scope.batchObj.add.model = angular.copy(row);              
            }

            $('#batchpopup').modal('show');
        }

        $scope.batchObj.add.closeModal = function() {
            $scope.batchObj.add.model = {};
            $scope.batchObj.add.isReqSent = false;
            $scope.batchObj.add.isSubmit = false;
            $('#batchpopup').modal('hide');
        }


        $scope.batchObj.add.model = {};
        $scope.batchObj.add.isSubmit = false;
        $scope.batchObj.add.isReqSent = false;
        $scope.batchObj.add.submit = function(form) {
            if (!form.$valid) {
                $scope.batchObj.add.isSubmit = true;
                return;
            }

            $scope.batchObj.add.isReqSent = true;

            if ($scope.batchObj.add.model._id) {
                icdb.update('batches', $scope.batchObj.add.model._id, $scope.batchObj.add.model, function(response) {

                    for (var i in $scope.batchObj.data) {
                        if ($scope.batchObj.data[i]._id == $scope.batchObj.add.model._id) {
                            $scope.batchObj.data[i] = angular.copy($scope.batchObj.add.model);
                        }
                    }

                    alertService.flash('success', 'Updated successfully');
                    $scope.batchObj.add.closeModal();
                });
            } else {
                icdb.insert('batches', $scope.batchObj.add.model, function(response) {
                    $scope.batchObj.data.push(response.result);
                    alertService.flash('success', 'Added successfully');
                    $scope.batchObj.add.closeModal();
                });
            }
        }


        $scope.batchObj.remove = {};
        $scope.batchObj.remove.submit = function(row, model) { 
            $('#removebatchData').modal('show');

            $scope.batchObj.remove.removeData = function() {
                icdb.remove(model, row._id, function(response) {
                    for (var i in $scope.batchObj.data) {
                        if ($scope.batchObj.data[i]._id == row._id) {
                            $scope.batchObj.data.splice(i, 1);
                        }
                    }
                    alertService.flash('success', 'Remove successfully');
                    $('#removebatchData').modal('hide');
                });
            }
        };


    }
]);