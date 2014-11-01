'use strict';

/* Services */

var ticketServices = angular.module('ticketServices', ['ngResource']);

ticketServices.factory('Scenario', ['$resource',
    function($resource){
        return $resource('scenarios/:scenarioId', {}, {
            get: {method:'GET', params:{scenarioId:'scenarios'}}
        });
    }]);

ticketServices.factory('Prizes', ['$resource',
    function($resource){
        return $resource('prizes/prizes.json', {}, {});
    }]);

