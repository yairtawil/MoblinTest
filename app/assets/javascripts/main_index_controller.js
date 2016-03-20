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
    $scope.right_menu = {show: false};
    $scope.NO_QUESTION_SELECTED = 'Please choose a question';
    $scope.selected_q = {};
    $scope.input_answers = {};
    $scope.bad_input = {};
    $scope.submited = {action: false};
    $scope.received_answers = {count: 0};
    $scope.getSecurityQuestions();
    $scope.today = new Date();
  };
  $scope.openMenu = function () {
    $scope.right_menu.show = !$scope.right_menu.show;
  };

  var buildArray = function (start, end) {
    var i;
    var array = [];
    for (i = start; i < end; i++) {
      array.push(i);
    }
    return array;
  };
  $scope.getSecurityQuestions = function () {
    $http({
      method: 'GET',
      url: '/home/GetSecurityQuestions'
    }).then(function successCallback(response) {
      $scope.security_questions = response.data.questions;
      $scope.num_of_questions = response.data.num_of_questions;
      $scope.num_of_questions_array = buildArray(0, $scope.num_of_questions);
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

  $scope.onSelectionChanges = function (index) {
    resetAllIsSelected($scope.security_questions);
    _.forEach($scope.selected_q, function (selected) {
      var select_q = _.find($scope.security_questions, {index: parseInt(selected, 10)});
      if (select_q) {
        select_q.is_selected = true;
      }
    });
    $scope.bad_input[index] = {};
    $scope.input_answers[index] = '';
  };

  $scope.clearSelectBox = function (index) {
    $scope.selected_q[index] = $scope.NO_QUESTION_SELECTED;
    $scope.onSelectionChanges(index);
  };
  $scope.badInputValidation = function (input) {
    return !input || input.length < 4;
  };
  $scope.checkAllAnswers = function () {
    var no_errors = true;
    _.forEach($scope.input_answers, function (answer, key) {
      if ($scope.selected_q[key] !== $scope.NO_QUESTION_SELECTED && $scope.badInputValidation(answer)) {
        $scope.bad_input[key] = {
          val: true,
          msg: !answer ? 'Answer should not be empty' : 'Answer should contain at least 4 characters'
        };
        no_errors = false;
      }
    });
    return no_errors;
  };
  $scope.clickSubmit = function () {
    if (!$scope.checkAllAnswers()) {
      return;
    }
    var contents = [];
    _.forEach($scope.selected_q, function (se_q, key) {
      if (se_q !== $scope.NO_QUESTION_SELECTED) {
        var content = {};
        content.answer    = $scope.input_answers[key];
        content.question  = _.find($scope.security_questions, {index: parseInt(se_q, 10)}).question;
        contents.push(content);
      }
    });
    $http({method: 'POST', url: '/home/SubmitAnswers', params: {'contents[]': contents}}).then(
      function (response) {
        $scope.received_answers.count = response.data.num_of_answers;
      },
      function (error) {
        console.log('error /home/SubmitAnswers = ', error);
      }
    );
    $scope.submited.action = true;
  };
}]);