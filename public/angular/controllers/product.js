'use strict';
appModule.controller('ProductController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', '$filter', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, $filter, icdb, alertService) {

        // --------------------------------------------
        // Common section
        // --------------------------------------------

        $scope.dp = {};
        $scope.dp.opened = false;
        $scope.dp.format = 'dd-MM-yyyy';
        $scope.dp.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        
        $scope.dp.openDp = function() {
            $scope.dp.opened = true;
        };

        // Get student 

        $scope.productObj = {};
        $scope.productObj.data = [];
        $scope.productObj.isloading = false;

        $scope.productObj.init = function() {
            $scope.productObj.isloading = true;

            icdb.getCondition('products', {}, function(response) {
                $scope.productObj.data = response;
                $scope.productObj.isloading = false;
            });
        }

        $scope.productObj.init();
        $scope.productObj.add = {};
        $scope.productObj.categorylist = {};
        $scope.productObj.businesslist = {};
        $scope.productObj.brandlist = {};
        $scope.productObj.subcatlist = {};
        $scope.productObj.unitlist = {};
        // $scope.productObj.subcatlistfinal = {};
        $scope.productObj.add.openModal = function(row) {
            $scope.productObj.add.model = {};

            icdb.getCondition('categories', {}, function(response) {
            $scope.productObj.categorylist = response;
             });

            icdb.getCondition('business', {}, function(response) {
            $scope.productObj.businesslist = response;
             });

            icdb.getCondition('units', {}, function(response) {               
            $scope.productObj.unitlist = response;
             });

            icdb.getCondition('brands', {}, function(response) {
            $scope.productObj.brandlist = response;
             }); 

            icdb.getCondition('SubCategory', {}, function(response) {
            $scope.productObj.subcatlist = response;
             });

            
             if (row && row._id) {
                $scope.productObj.add.model = angular.copy(row);
            }

            $('#productpopup').modal('show');
        }

        $scope.productObj.add.closeModal = function() {
            $scope.productObj.add.model = {};
            $scope.productObj.add.isReqSent = false;
            $scope.productObj.add.isSubmit = false;
            $('#productpopup').modal('hide');
        }


        $scope.productObj.add.model = {};
        $scope.productObj.add.isSubmit = false;
        $scope.productObj.add.isReqSent = false;
        $scope.productObj.add.submit = function(form) {
            console.log($scope.productObj.add.model);
            if (!form.$valid) {
                $scope.productObj.add.isSubmit = true;
                return;
            }

            $scope.productObj.add.isReqSent = true;

            if ($scope.productObj.add.model._id) {
                icdb.update('products', $scope.productObj.add.model._id, $scope.productObj.add.model, function(response) {

                    for (var i in $scope.productObj.data) {
                        if ($scope.productObj.data[i]._id == $scope.productObj.add.model._id) {
                            $scope.productObj.data[i] = angular.copy($scope.productObj.add.model);
                        }
                    }

                    alertService.flash('success', 'Updated successfully');
                    $scope.productObj.add.closeModal();
                });
            } else {
                icdb.insert('products', $scope.productObj.add.model, function(response) {
                    $scope.productObj.data.push(response.result);
                    alertService.flash('success', 'Added successfully');
                    $scope.productObj.add.closeModal();
                });
            }
        }


        $scope.productObj.remove = {};
        $scope.productObj.remove.submit = function(row, model) { 
            $('#removeProduct').modal('show');

            $scope.productObj.remove.removeData = function() {
                icdb.remove(model, row._id, function(response) {

                    for (var i in $scope.productObj.data) {
                        if ($scope.productObj.data[i]._id == row._id) {
                            $scope.productObj.data.splice(i, 1);
                        }
                    }

                    alertService.flash('success', 'Remove successfully');
                    $('#removeProduct').modal('hide');
                });
            }
        };

        //Bind Subcategory base on category selection

        // $scope.getsubcategory = function(CategoryId)
        // {   
            
        //     for (var i in $scope.productObj.subcatlist) {
        //         if (parseInt($scope.productObj.subcatlist[i].CategoryId) == parseInt(CategoryId)) {
        //             $scope.productObj.subcatlistfinal = angular.copy($scope.productObj.subcatlist[i]);
        //         }
        //     }
           
        // };

    }
]);