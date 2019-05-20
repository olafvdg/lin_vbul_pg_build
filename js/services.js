angular.module('vbul.services', [])

.factory('Checklist',['$http',function($http){
    var checks = []; //Private Variable
    return {
        GetChecks: function(){ 
            return $http.get("data.json").then(function(response){
                checks = response.data;
                //console.log(checks);
                return response;
            });
        },
        GetCat: function(cat,subcat) {
            var results = [];
            //console.log(subcat);
           for(i=0;i<checks.length;i++){
                if(checks[i].CAT == cat && (checks[i].SUBCAT == subcat)){
                    results.push(checks[i]);
                }
            }
            return results;
        },
        IsAvailable: function(){
            if(checks.length > 0) {
                return true;
            } else {
                return false;
            }
        },
        unCheck: function() {                
            for(i=0;i<checks.length;i++){
                 checks[i].checked = false;
             }
        },
        GetCheck: function(checkId){
            //console.log(checks.length);
            for(i=0;i<checks.length;i++){
                if(checks[i].ID == checkId){
                    return checks[i];
                }
            }
        }
    }
}]);