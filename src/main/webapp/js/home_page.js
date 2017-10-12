var app = angular.module( 'app' ,['ngCommon','quramy-recursive'], function($locationProvider){
    $locationProvider.html5Mode({enable:true,requireBase:false});
    $locationProvider.html5Mode(true);
}) ;

//global style controll 
$(function(){
    $("input[name=sysChannel]").hide();
    $("input[name=sysContainer]").hide();
    initializationDateRange();
    initializationDatesingel();
    initializationdDefaultValue();
    initializationDateHour();
});

