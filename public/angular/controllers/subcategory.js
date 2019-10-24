'use strict';
appModule.controller('SubCategoryController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', '$filter', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, $filter, icdb, alertService) {

        $scope.subcategoryObj = {};

        

      
        $scope.subcategoryObj.data = [];
        $scope.subcategoryObj.isloading = false;

        $scope.subcategoryObj.init = function() {
            $scope.subcategoryObj.isloading = true;
            icdb.getCondition('SubCategory', {}, function(response) {
                $scope.subcategoryObj.data = response;
                $scope.subcategoryObj.isloading = false;
            });
        }

        $scope.subcategoryObj.init();
        $scope.subcategoryObj.add = {};
        $scope.subcategoryObj.categorylist = {};
        $scope.subcategoryObj.add.openModal = function(row) {
            $scope.subcategoryObj.add.model = {};
           
            icdb.getCondition('categories', {}, function(response) {
            $scope.subcategoryObj.categorylist = response;
           
             });

            if (row && row._id) {
                $scope.subcategoryObj.add.model = angular.copy(row);
                $scope.subcategoryObj.add.model.expdate = new Date(row.expdate);
            }

            $('#subcategorypopup').modal('show');
        }

        $scope.subcategoryObj.add.closeModal = function() {
            $scope.subcategoryObj.add.model = {};
            $scope.subcategoryObj.add.isReqSent = false;
            $scope.subcategoryObj.add.isSubmit = false;
            $('#subcategorypopup').modal('hide');
        }


        $scope.subcategoryObj.add.model = {};
        $scope.subcategoryObj.add.isSubmit = false;
        $scope.subcategoryObj.add.isReqSent = false;
        $scope.subcategoryObj.add.submit = function(form) {
            if (!form.$valid) {
                $scope.subcategoryObj.add.isSubmit = true;
                return;
            }

            $scope.subcategoryObj.add.isReqSent = true;

            if ($scope.subcategoryObj.add.model._id) {
                icdb.update('SubCategory', $scope.subcategoryObj.add.model._id, $scope.subcategoryObj.add.model, function(response) {

                    for (var i in $scope.subcategoryObj.data) {
                        if ($scope.subcategoryObj.data[i]._id == $scope.subcategoryObj.add.model._id) {
                            $scope.subcategoryObj.data[i] = angular.copy($scope.subcategoryObj.add.model);
                        }
                    }

                    alertService.flash('success', 'Updated successfully');
                    $scope.subcategoryObj.add.closeModal();
                });
            } else {
                icdb.insert('SubCategory', $scope.subcategoryObj.add.model, function(response) {
                    $scope.subcategoryObj.data.push(response.result);
                    alertService.flash('success', 'Added successfully');
                    $scope.subcategoryObj.add.closeModal();
                });
            }
        }


        $scope.subcategoryObj.remove = {};
        $scope.subcategoryObj.remove.submit = function(row, model) { 
            $('#removesubcategoryData').modal('show');

            $scope.subcategoryObj.remove.removeData = function() {
                icdb.remove(model, row._id, function(response) {
                    for (var i in $scope.subcategoryObj.data) {
                        if ($scope.subcategoryObj.data[i]._id == row._id) {
                            $scope.subcategoryObj.data.splice(i, 1);
                        }
                    }
                    alertService.flash('success', 'Remove successfully');
                    $('#removesubcategoryData').modal('hide');
                });
            }
        };


    }
]);