angular.module('starter.services', [])

.factory('infoService', function() {
  
  var infos = {
    info:'false'
  };

  return {
    infos:infos
    };

})
.factory("storedetail", function(){

})
.factory('dashuser', function(){
  var details = [
  {
    id:"1",
    nom:"Le 129",
    type_cuisine:"sandwich,burger,salades",
    ville:"saint-denis",
    departement:"93",
    balance:"177"
  },
  {
    id:"2",
    nom:"Le 2004",
    type_cuisine:"sandwich,burger,salades",
    ville:"saint-denis",
    departement:"93",
    balance:"195"
  },
  {
    id:"3",
    nom:"Le special",
    type_cuisine:"sandwich,burger,salades",
    ville:"saint-denis",
    departement:"93",
    balance:"234"
  },
  {
    id:"4",
    nom:"Mcdonalds stade de france",
    type_cuisine:"burger,salades",
    ville:"saint-denis",
    departement:"93",
    balance:"654"
  },
  {
    id:"5",
    nom:"Le koudou",
    type_cuisine:"sandwich,burger,salades",
    ville:"saint-denis",
    departement:"93",
    balance:"377"
  },
  {
    id:"6",
    nom:"taiba food",
    type_cuisine:"sandwich,burger,salades",
    ville:"saint-denis",
    departement:"93",
    balance:"232"
  }
  ];

  return {
    all: function(){
      return details;
    }
  }
})
.factory('userService', function($http,$httpParamSerializerJQLike){
  
  return {
    getUser: function(datas){
      console.log("dans getUser");
      return $http({
      method: 'POST',
      url: 'http://crackas.esy.es/user.php',
      paramSerializer: '$httpParamSerializerJQLike',
      data:$httpParamSerializerJQLike(datas),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });
    }
  }
})
.factory('authService', function($http,$httpParamSerializerJQLike,$state,$window,infoService,localStorageService) {

  return {
    login: function(datas){
      var datas;
      $http({
      method: 'POST',
      url: 'http://crackas.esy.es/login.php',
      paramSerializer: '$httpParamSerializerJQLike',
      data:$httpParamSerializerJQLike(datas),
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function(data){
      if(data.data !== "false"){
        localStorageService.set("userId", data.data[0].user);
        if(localStorageService.get("user") === null)
        {
          localStorageService.set("user", data.data[0].user);
        }
        localStorageService.set("accessToken", data.data[0].token);
        $state.go('dash');
        infoService.infos.info = false;
      }
      else
      {
        infoService.infos.info = true;
      }
    },function(err){
      console.log(err);
    });
    },
    logout : function(){
      /*$http({
      method: 'GET',
      url: 'http://localhost/ensus/logout.php',
      withCredentials: true,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function(){
    $cookies.remove('userId');
    $cookies.remove('token');
    $state.go('login');
    },function(){

    });*/
    localStorageService.remove('userId');
    localStorageService.remove('accessToken');
    localStorageService.remove('user');
    $window.location.reload();
    $state.go('login');
    },
    register : function(datas){
       $http({
      method: 'POST',
      url: 'http://crackas.esy.es/register.php',
      paramSerializer: '$httpParamSerializerJQLike',
      data:$httpParamSerializerJQLike(datas),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function(data){
        console.log(data.data);

      if(data.data === 'true'){
        console.log(data.data);
        localStorageService.set("userId", data.data[0].user);
        if(localStorageService.get("user") === null)
        {
          localStorageService.set("user", data.data[0].user);
        }
        localStorageService.set("accessToken", data.data[0].token);
        $state.go('dash');
      }
    },function(){

    });
    }
  }
});


