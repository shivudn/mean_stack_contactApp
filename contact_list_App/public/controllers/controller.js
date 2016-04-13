var app = angular.module('contactlist_App', []);
app.controller("AppCtrl", ['$scope', '$http', function($scope, $http) {
  console.log("Hello world controller");
  $http.get('/contactlist').success(function(res) {
    console.log("I got the data");
    $scope.contactlist = res;
  });
  $scope.addContact=function(){
    console.log($scope.contact);
    $http.post("/contactlist",$scope.contact).success(function(response){
      $scope.contactlist.push(response);
      console.log($scope.contactlist);
      $scope.contact="";
    });
  };
  $scope.remove =function(id){
    console.log(id);
    $http.delete("/contactlist/"+id).success(function(response){
        for(var i=0;i< $scope.contactlist.length;i++){
          if($scope.contactlist[i]._id == id){
            $scope.contactlist.splice(i,1);
            i--;
          }
        }
    })
  };
  $scope.edit =function(id){
    console.log(id);
    $http.get("/contactlist/"+id).success(function(response){
          $scope.contact=response;
    });
  };
  $scope.clear =function(id){
    $scope.contact="";

  };

  $scope.update =function(){
    console.log($scope.contact._id);
    $http.put("/contactlist/"+$scope.contact._id,$scope.contact).success(function(response){
      $scope.contact="";
      $http.get('/contactlist').success(function(res) {
        console.log("I got the data");
        $scope.contactlist = res;
      });
    });
  };
}]);
