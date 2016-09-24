angular.module('starter.controllers', [])
.controller('storeDetailCtrl', function($scope,$httpParamSerializerJQLike,$stateParams,$state,$http,localStorageService){
  $scope.data = {};
  $scope.data.token = localStorageService.get("accessToken");
  $scope.data.id = $stateParams.id;
  $scope.classC = "your";
  $scope.listClass = "left";
  $scope.data.number = 2;
  $scope.data.number2 = 2;
  $scope.don = false;
  $scope.took = true;
  $scope.spinner = true;
  $scope.placeholder = "Rechercher";

  $scope.dash = function(){
    $state.go("dash");
  };

  $scope.map = { 
    center: { latitude: 48.9404359, longitude: 2.356369 },
     zoom: 18,
      };

      $scope.loadMore = function(){ 
      if ($scope.listClass == "right"){
        $scope.data.number += 2;
        $scope.changeGift();
      }
      else if ($scope.listClass == "center"){
        $scope.data.number2 += 2;
        $scope.changeGiftB();
      }
      else{
        $scope.data.number2 += 2;
        $scope.changeGiftC();
      }
    };

   $scope.changeGift = function(){
    $scope.class = "your";
    $scope.classB = "";
    $scope.classC = "";
    $scope.spinner = true;
    $http({
      method: 'POST',
      url: 'http://crackas.esy.es/giver2.php',
      paramSerializer: '$httpParamSerializerJQLike',
      data:$httpParamSerializerJQLike($scope.data),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function(data){
      $scope.don = true;
      $scope.took = false;
      $scope.users = data.data;
      $scope.spinner = false;
      $scope.listClass = "right";
    },function(error){
      console.log(error);
    });

 };

$scope.changeGiftB = function(){
    $scope.class = "";
    $scope.classC = "";
    $scope.classB = "your";
    $scope.spinner = true;
    $http({
      method: 'POST',
      url: 'http://crackas.esy.es/giver.php',
      paramSerializer: '$httpParamSerializerJQLike',
      data:$httpParamSerializerJQLike($scope.data),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function(data){
      $scope.don = true;
      $scope.took = false;
      $scope.users = data.data;
      $scope.spinner = false;
      $scope.listClass = "center";
    },function(error){
      console.log(error);
    });

   }; 

   $scope.changeGiftC = function(){
    $scope.class = "";
    $scope.classB = "";
    $scope.classC = "your";
    $scope.spinner = true;
    $http({
      method: 'POST',
      url: 'http://crackas.esy.es/giver.php',
      paramSerializer: '$httpParamSerializerJQLike',
      data:$httpParamSerializerJQLike($scope.data),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function(data){
      $scope.don = false;
      $scope.took = true;
      $scope.users = data.data;
      $scope.spinner = false;
      $scope.listClass = "left";
    },function(error){
      console.log(error);
    });

   }; 

  $http({
       method: 'POST',
        url: 'http://crackas.esy.es/coordonate.php',
        paramSerializer: '$httpParamSerializerJQLike',
        data:$httpParamSerializerJQLike($scope.data),
        withCredentials: true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(function(data){
        $scope.map.center.latitude = data.data[0].latitude;
        $scope.map.center.longitude = data.data[0].longitude;
      },function(error){
          console.log(error);
      });

  $http({
      method: 'POST',
      url: 'http://crackas.esy.es/giver.php',
      paramSerializer: '$httpParamSerializerJQLike',
      data:$httpParamSerializerJQLike($scope.data),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function(data){
      $scope.spinner = false;
      $scope.users = data.data;
    },function(error){
      console.log(error);
    });

  $http({
      method: 'POST',
      url: 'http://crackas.esy.es/storedetail.php',
      paramSerializer: '$httpParamSerializerJQLike',
      data:$httpParamSerializerJQLike($scope.data),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function(data){
      $scope.details = data.data;
      $scope.detail = $scope.details[0];
    },function(){

    });
})
.controller('DashCtrl', function($scope,dashuser,$state,$cordovaFileTransfer,$cordovaGeolocation,$http,$httpParamSerializerJQLike,localStorageService) {
  $scope.username = localStorageService.get('userId');
  $scope.spinner = true;
 /* $scope.uploadFile = function() {
     var url = "http://your_ip_address/uploads/upload.php";
     //target path may be local or url
     var targetPath = "http://your_ip_address/images/my.jpg";
      var filename = targetPath.split("/").pop();
        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "image/jpg"
        };
        $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
            console.log("SUCCESS: " + JSON.stringify(result.response));
            alert("success");
            alert(JSON.stringify(result.response));
        }, function(err) {
            console.log("ERROR: " + JSON.stringify(err));
            alert(JSON.stringify(err));
        }, function (progress) {
            // constant progress updates
            $timeout(function () {
            $scope.downloadProgress = (progress.loaded / progress.total) * 100;
          })
        });
   } */ 

  $scope.data = {};
  var url;

  $scope.redirect = function(iD){
    
    $state.go("store",{id : iD});
  };


  posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude
      var longe = position.coords.longitude
      console.log(position);
      url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+longe;
      $http({
        method: 'GET',
        url: url
      })
      .then(function(data){
       $scope.data.code_postal = data.data.results[0].address_components[6].long_name;
       $http({
         method: 'POST',
          url: 'http://crackas.esy.es/dash.php',
          paramSerializer: '$httpParamSerializerJQLike',
          data:$httpParamSerializerJQLike($scope.data),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(function(data){
          $scope.details = data.data;
          $scope.detailss = data.data;
          $scope.spinner = false;
        },function(){

        });

      },function(err){

      });
       }, function(err) {
      // error
      });

  $scope.test = function(){
        if($scope.data.search === ""){
          $scope.details = $scope.detailss;
      }
      else
      {
    $http({
      method: 'POST',
      url: 'http://crackas.esy.es/search.php',
      paramSerializer: '$httpParamSerializerJQLike',
      data:$httpParamSerializerJQLike($scope.data),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function(data){
        $scope.details = data.data;
    },function(){

    });
  }
  };

  $scope.account = function(){
    $state.go("account");
  };
})
.controller('UserCtrl', function($scope,userService,$state,$stateParams,$timeout){
  
  $scope.dash = function(){
  $state.go("dash");
  };
  $scope.spinner = true;
  $scope.data = {};
  $scope.data.username = $stateParams.id;

  $scope.sociale = false;

  $scope.showsocial = function(id){
    $scope.sociale = true;
    $scope.social = id;
    $timeout(function(){
      $scope.sociale = false;
    },
      5000);
  };
      
   $scope.users = userService.getUser($scope.data)
    .then(function(data){
      $scope.users = data.data;
      $scope.spinner = false;
      $scope.user = $scope.users[0];
    },function(error){
      console.log(error);
    });
  
})
.controller('LogCtrl',['$scope', 'authService', '$state', 'localStorageService', function($scope,authService,$state,localStorageService){
  $scope.show = false;
  $scope.data = {};
  if(localStorageService.get("user") !== undefined )
  {
    $scope.user = localStorageService.get("user");
    $scope.data.username = localStorageService.get("user");
  }
  $scope.info = false;

  $scope.register = function(){
    $state.go('register');
  };

  $scope.submit = function(){
    authService.login($scope.data);
  };
}])
.controller('registerCtrl', function($scope,authService,$state){
   $scope.data = {};
  $scope.submit = function(){
    console.log("dddddd");
   authService.register($scope.data);
  };
  $scope.login = function(){
   $state.go("login");
  };
})
.controller('AccountCtrl', function($scope,$state,authService, userService, localStorageService) {
  $scope.data = {};
  $scope.spinner = true;
  $scope.data.username = localStorageService.get("user");
  console.log($scope.data.username);
  userService.getUser($scope.data)
  .then(function(data){
    console.log(data.data);
  console.log($scope.data.username);
    $scope.user = data.data[0];
    $scope.spinner = false;
  } ,function(error){

    });

  $scope.dash = function(){
    $state.go("dash");
  };
  $scope.logout = function(){
    authService.logout();
  };
});
