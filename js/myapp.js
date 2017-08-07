var app = angular.module('myApp', []);
app.controller('myCtrl', ["$scope", "conditionChecker", function($scope, conditionChecker) {
    $scope.test= "scope loaded";
    $scope.questions = [
      {
        "text": "A or B or both?",
        "type": "multichoice",
        "answers": [
          {
            "text": "A"
          },
          {
            "text": "B"
          }
        ]
      },
      {
        "text": "C or D or both?",
        "condition": "$.0.answers.0.checked",
        "type": "multichoice",
        "answers": [
          {
            "text": "C"
          },
          {
            "text": "D"
          }
        ]
      },
      {
        "text": "Age?",
        "type": "number"
      },
      {
        "text": "Name?",
        "type": "text",
        "condition": "$.2.answer > 18"
      },
      {
        "text": "Country?",
        "type": "text",
        "condition": "$.3.answer == 'Anna'"
      },
      {
        "text": "Hobbies?",
        "type": "text",
        "condition": "($.3.answer == 'Anna') && ($.0.answers.1.checked)"
      },
      {
        "text": "E or F (pick one)",
        "type": "radio",
        "answers": [
          {
            "text": "E"
          },
          {
            "text": "F"
          }
        ]
      },
      {
        "text": "Remarks?",
        "type": "text",
        "condition": "($.6.answer == $.6.answers.0)"
      }
    ];
    $scope.conditionIsMet = function(condition) {
      return conditionChecker(condition, $scope.questions);
    };
}]);
