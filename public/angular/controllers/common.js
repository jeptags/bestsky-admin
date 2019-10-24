'use strict';

appModule.controller('CommonController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, icdb, alertService) {
        $scope.comnObj1 = {};

        $scope.comnObj1.getSection = function(sectionId) {
            $('html, body').animate({
                scrollTop: $("#" + sectionId).offset().top
            }, 2000);
        };

        $rootScope.g.togleSidebar = function() {
            $('.sidebar').toggleClass('shrink show');
        }
	}
]);