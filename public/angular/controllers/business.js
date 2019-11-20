'use strict';
appModule.controller('BusinessController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', '$filter', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, $filter, icdb, alertService) {

        $scope.businessObj = {};
      
        $scope.businessObj.data = [];
        $scope.businessObj.isloading = false;

        $scope.businessObj.init = function() {
            $scope.businessObj.isloading = true;
            icdb.getCondition('business', {}, function(response) {
                $scope.businessObj.data = response;
                $scope.businessObj.isloading = false;
            });
        }

        $scope.businessObj.init();
        $scope.businessObj.add = {};
        $scope.businessObj.categorylist = {};
        $scope.businessObj.add.openModal = function(row) {
            $scope.businessObj.add.model = {};
            $scope.businessObj.add.model.start_date = new Date();

            icdb.getCondition('currencies', {}, function(response) {
                if (response.length) {
                    $scope.businessObj.currencylist = response;
                } else { // default set data
                    $scope.businessObj.currencylist = [{
                        _id: 1,
                        currency: "USD",
                    }, {
                        _id: 2,
                        currency: "EURO"
                    }, {
                        _id: 3,
                        currency: "IND"
                    }]
                }
                
            });

            $scope.businessObj.createdbylist = [{
                _id: 1,
                name: "User 1",
            }, {
                _id: 2,
                name: "User 2"
            }, {
                _id: 3,
                name: "User 3"
            }];

            $scope.businessObj.storelist = [{
                _id: 1,
                name: "Store 1",
            }, {
                _id: 2,
                name: "Store 2"
            }, {
                _id: 3,
                name: "Store 3"
            }];

            
            
            if (row && row._id) {
                $scope.businessObj.add.model = angular.copy(row);
                $scope.businessObj.add.model.start_date = new Date(row.start_date);
            }

            $('#businesspopup').modal('show');
        }

        $scope.businessObj.add.closeModal = function() {
            $scope.businessObj.add.model = {};
            $scope.businessObj.add.isReqSent = false;
            $scope.businessObj.add.isSubmit = false;
            $('#businesspopup').modal('hide');
        }


        $scope.businessObj.add.model = {};
        $scope.businessObj.add.isSubmit = false;
        $scope.businessObj.add.isReqSent = false;
        $scope.businessObj.add.submit = function(form) {
            if (!form.$valid) {
                $scope.businessObj.add.isSubmit = true;
                return;
            }

            console.log($scope.businessObj.add.model);

            $scope.businessObj.add.isReqSent = true;

            if ($scope.businessObj.add.model._id) {
                icdb.update('business', $scope.businessObj.add.model._id, $scope.businessObj.add.model, function(response) {

                    for (var i in $scope.businessObj.data) {
                        if ($scope.businessObj.data[i]._id == $scope.businessObj.add.model._id) {
                            $scope.businessObj.data[i] = angular.copy($scope.businessObj.add.model);
                        }
                    }

                    alertService.flash('success', 'Updated successfully');
                    $scope.businessObj.add.closeModal();
                });
            } else {
                icdb.insert('business', $scope.businessObj.add.model, function(response) {
                    $scope.businessObj.data.push(response.result);
                    alertService.flash('success', 'Added successfully');
                    $scope.businessObj.add.closeModal();
                });
            }
        }


        $scope.businessObj.remove = {};
        $scope.businessObj.remove.submit = function(row, model) { 
            $('#removebusinessData').modal('show');

            $scope.businessObj.remove.removeData = function() {
                icdb.remove(model, row._id, function(response) {
                    for (var i in $scope.businessObj.data) {
                        if ($scope.businessObj.data[i]._id == row._id) {
                            $scope.businessObj.data.splice(i, 1);
                        }
                    }
                    alertService.flash('success', 'Remove successfully');
                    $('#removebusinessData').modal('hide');
                });
            }
        };


    }
]);