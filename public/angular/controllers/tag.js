'use strict';
appModule.controller('TagController', ['$scope', 'icdb', '$filter', 'alertService',
    function($scope, icdb, $filter, alertService) {

        // --------------------------------------------
        // Common section
        // --------------------------------------------

        // Get student 

        $scope.tagObj = {};
        $scope.tagObj.data = [];
        $scope.tagObj.isloading = false;

        $scope.tagObj.init = function() {
            $scope.tagObj.isloading = true;

            icdb.getCondition('tags', {}, function(response) {
                $scope.tagObj.data = response;
                $scope.tagObj.isloading = false;
            });
        }

        $scope.tagObj.init();
        $scope.tagObj.add = {};
        $scope.tagObj.categorylist = {};
        $scope.tagObj.subcategorylist = {};
        $scope.tagObj.businesslist = {};
        $scope.tagObj.brandlist = {};
        $scope.tagObj.batchlist = {};
        $scope.tagObj.unitlist = {};
        // $scope.tagObj.subcatlistfinal = {};
        $scope.tagObj.add.openModal = function(row) {
            $scope.tagObj.add.model = {};

            icdb.getCondition('categories', {}, function(response) {
                $scope.tagObj.categorylist = response;
            });

            if (row && row._id) {
                $scope.tagObj.add.model = angular.copy(row);
            }

            $('#tagpopup').modal('show');
        }

        $scope.tagObj.add.closeModal = function() {
            $scope.tagObj.add.model = {};
            $scope.tagObj.add.isReqSent = false;
            $scope.tagObj.add.isSubmit = false;
            $('#tagpopup').modal('hide');
        }

        $scope.tagObj.add.filterTags = function(model) {
            $scope.listTag = $filter('filter')($scope.tagObj.data, (tag) => {
                return model.TagID.trim() === tag.TagID.trim() || model.JeptagID.trim() === tag.JeptagID.trim();
            });
            return ($scope.listTag.length) ? true: false;
        }

        $scope.tagObj.add.model = {};
        $scope.tagObj.add.isSubmit = false;
        $scope.tagObj.add.isReqSent = false;
        $scope.tagObj.add.submit = function(form) {
            console.log($scope.tagObj.add.model);
            if (!form.$valid) {
                $scope.tagObj.add.isSubmit = true;
                return;
            }

            $scope.tagObj.add.isReqSent = true;

            if ($scope.tagObj.add.model._id) {
                icdb.update('tags', $scope.tagObj.add.model._id, $scope.tagObj.add.model, function(response) {

                    for (var i in $scope.tagObj.data) {
                        if ($scope.tagObj.data[i]._id == $scope.tagObj.add.model._id) {
                            $scope.tagObj.data[i] = angular.copy($scope.tagObj.add.model);
                        }
                    }

                    alertService.flash('success', 'Updated successfully');
                    $scope.tagObj.add.closeModal();
                });
            } else {
                console.log("Going to add new tag!!!!!!!!!!!!!!!")

                // checking TagId or JepTagId exist or not.
                if ($scope.tagObj.add.filterTags($scope.tagObj.add.model)) {
                    alertService.flash('error', 'TagId or JepTagId already exist. Please try with different.');
                    $scope.tagObj.add.closeModal();
                    return
                }
                
                icdb.insert('tags', $scope.tagObj.add.model, function(response) {
                    console.log("Server response is !!!!!!!!!!!!!!!!!");
                    console.log(response);
                    if (response.status) {
                        $scope.tagObj.data.push(response.result);
                        alertService.flash('success', 'Added successfully');
                    } else {
                        alertService.flash('error', 'Please check the form fields and try again.');
                    }
                    $scope.tagObj.add.closeModal();
                });
            }
        }


        $scope.tagObj.remove = {};
        $scope.tagObj.remove.submit = function(row, model) { 
            $('#removeTag').modal('show');

            $scope.tagObj.remove.removeData = function() {
                icdb.remove(model, row._id, function(response) {

                    for (var i in $scope.tagObj.data) {
                        if ($scope.tagObj.data[i]._id == row._id) {
                            $scope.tagObj.data.splice(i, 1);
                        }
                    }

                    alertService.flash('success', 'Remove successfully');
                    $('#removeTag').modal('hide');
                });
            }
        };

    }
]);