/*globals angular, window, _ */
angular.module('moblinTest.controllers', []);
angular.module('moblinTest', ['moblinTest.controllers']);

angular.module('moblinTest.controllers').controller('mainIndexController', ['$scope', '$http', function ($scope, $http) {
  'use strict';
  $scope.init = function () {
    $scope.side_menu = {
      links: [
        {title: 'Google', href: 'http://www.google.com/'},
        {title: 'Moblin', href: 'http://www.Moblin.com/'},
        {title: 'Bing', href: 'http://www.Bing.com/'}
      ]
    };
    $scope.selected_q = {};
    $scope.getSecurityQuestions();
  };

  $scope.getSecurityQuestions = function () {
    $http({
      method: 'GET',
      url: '/home/GetSecurityQuestions'
    }).then(function successCallback(response) {
      // console.log('response = ',response.data.questions);
      $scope.security_questions = response.data.questions;
    }, function errorCallback(response) {
    });
  };

  $scope.clickLink = function (link) {
    window.location = link;
  };
  var resetAllIsSelected = function (security_questions) {
    _.forEach(security_questions, function (sq) {
      sq.is_selected = false;
    });
  };
  var resetAllUnSelectedAnswers = function (security_questions) {
    _.forEach(security_questions, function (sq) {
      if (!sq.is_selected) {
        sq.answer = '';
      }
    });
  };

  $scope.onSelectionChanges = function () {
    resetAllIsSelected($scope.security_questions);
    _.forEach($scope.selected_q, function (selected) {
      var select_q = _.find($scope.security_questions, {index: parseInt(selected, 10)});
      select_q ? select_q.is_selected = true : false;
    });
    resetAllUnSelectedAnswers($scope.security_questions);
  };

  $scope.clearSelectBox = function (index) {
    var question_row = $scope.security_questions[$scope.selected_q[index]];
    question_row ? question_row.answer = '' : false;
    $scope.onSelectionChanges();
    $scope.selected_q[index] = "Please choose a question";
  };
  $scope.clearAllBorders = function () {

  };
  $scope.clickSubmit = function () {
    wrong_input_border
  };
}]);