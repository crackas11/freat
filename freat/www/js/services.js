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
.factory('conversationService', function(messageService) {
  var conversation;
  return {
    conversation: function(){
      return conversation;
    }
  };
})
.factory('Chats', function(){
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];


  return {
    all: function(){
      return chats;
    }
  }
})
.factory('authService', function($http,$httpParamSerializerJQLike,$state,infoService,localStorageService) {

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
        console.log(data.data);
        localStorageService.set("userId", data.data[0].user);
        if(localStorageService.get("user") === undefined)
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
    localStorageService.remove('token');
    $state.go('login');
    },
    register : function(datas){
       $http({
      method: 'POST',
      url: 'http://localhost/ensus/register.php',
      paramSerializer: '$httpParamSerializerJQLike',
      data:$httpParamSerializerJQLike(datas),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function(data){
      if(data.data !== 'true'){
        localStorageService.set("userId", data.data[0].user);
        if(localStorageService.get("user") === undefined)
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
})
.factory( function($http,$httpParamSerializerJQLike,$stateParams) {
    return {
      getAllMessages: function(){
        var datas;
        var data = {};
        data.idsender = $cookies.get("userId");
        data.idreceiver = $stateParams.id;
        data.token = $cookies.get("accessToken");
        return $http({
      method: 'POST',
      url: 'http://localhost/ensus/message.php',
      paramSerializer: '$httpParamSerializerJQLike',
      data:$httpParamSerializerJQLike(data),
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'}
    });
      },
      getLastMessage: function(datas){
        $http({
      method: 'POST',
      url: 'http://localhost/ensus/message.php',
      paramSerializer: '$httpParamSerializerJQLike',
      data:$httpParamSerializerJQLike(datas),
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function(data){
    },function(){
    });
      },
      sendMessage : function(datas){
        $http({
      method: 'POST',
      url: 'http://localhost/ensus/sendmessage.php',
      paramSerializer: '$httpParamSerializerJQLike',
      data:$httpParamSerializerJQLike(datas),
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function(data){
    },function(){
    });
      },
      DeleteMessage : function(){}
    }
});