'use strict';

/* Controllers */

var ticketControllers = angular.module('ticketControllers', ['ngDialog']);

ticketControllers.controller('TicketCtrl', ['$scope', '$interval', 'ngDialog', 'Scenario', 'Prizes', function($scope, $interval, ngDialog, Scenario, Prizes) {

    $scope.scenario = Scenario.get({scenarioId: 'scenario1.json'}, function(scenario) {
        $scope.ticketModel = new TicketModel(scenario);
        $scope.numbers = new Numbers(scenario.revealedNumbers.length);
    });

    $scope.prizes = Prizes.query();

    $scope.nextNumber = -1;

    $scope.playButtonEnabled = true;
    $scope.turboButtonEnabled = false;

    $scope.numberIndex = 0;

    $scope.speed = 1000;

    $scope.amountPrizeWon = 0;
    $scope.winningClassesPrizeWon = new Array();

    $scope.isNextNumberAvailable = function() {
        return $scope.nextNumber != -1;
    };

    $scope.isPlayEnabled = function() {
        return $scope.playButtonEnabled;
    };

    $scope.isTurboEnabled = function() {
        return $scope.turboButtonEnabled;
    };

    var stop;
    $scope.play = function() {
        $scope.reset();
        stop = $interval(function() {
            if($scope.numberIndex < $scope.scenario.revealedNumbers.length) {
                $scope.revealNextNumber();
            }
            else {
                $scope.finishGame();
            }
        }, $scope.speed);

    };

    $scope.revealNextNumber = function() {
        $scope.nextNumber = $scope.scenario.revealedNumbers[$scope.numberIndex];
        $scope.numbers.showNumber($scope.nextNumber);
        $scope.numbers.removeRemainingBall($scope.numberIndex);
        $scope.ticketModel.checkNumberInBoards($scope.nextNumber);
        $scope.numberIndex++;
    };

    $scope.finishGame = function() {
        $scope.numberIndex = 0;
        $scope.playButtonEnabled = true;
        $scope.turboButtonEnabled = false;
        var totalPrize = $scope.ticketModel.calculateWinnings($scope.prizes);
        $scope.amountPrizeWon = totalPrize.getAmount();
        $scope.winningClassesPrizeWon = totalPrize.getWinningClasses();
        $scope.stop();
        ngDialog.open({template: 'html/popupWinningInfo.html', className: 'ngdialog-theme-default', cache: false, scope: $scope});
    };

    $scope.stop = function() {
        if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
        }
    };

    $scope.$on('$destroy', function() {
        // Make sure that the interval is destroyed too
        $scope.stop();
    });

    $scope.reset = function() {
        $scope.numbers.reset();
        $scope.ticketModel.resetBoards();
        $scope.numberIndex = 0;
        $scope.playButtonEnabled = false;
        $scope.turboButtonEnabled = true;
        $scope.amountPrizeWon = 0;
        $scope.winningClassesPrizeWon = new Array();
    };

    $scope.turbo = function() {
        console.log('Turbo!');
        $scope.speed = 1000;
    };

    $scope.isWinningClassesWon = function(prize) {
        for (var i = 0; i < $scope.winningClassesPrizeWon.length; i++) {
            if ($scope.winningClassesPrizeWon[i] == prize.winningClass) {
                return true;
            }
        }
        return false;
    };

}]);