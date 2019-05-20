angular.module('vbul.controllers', [])

.filter('pipetobreak', function() {
	return function(input) {
    if(input.indexOf("|")>=0) {
      if(input.indexOf("*")>=0) {
        input = input.replace("|*", '<div class="subline warning"><span class="icon ion-alert-circled"></span>') + '</div>';
      } else {
        if(input.indexOf("|")==input.indexOf("|-")) {
          input = input.replace("|-", '<div class="subline"><ul><li class="hangingindent">-') + '</li></div>';
        } else {
          input = input.replace("|", '<div class="subline"><ul><li>') + '</li></div>';
        }
      }
      input = input.replace(/\|-/g, '</li><li class="hangingindent">-');
		  input = input.replace(/\|/g, '</li><li>');
    }
    return input;
	}
})

.controller('LoginCtrl', function($rootScope, $scope, $timeout, $state, $ionicHistory, Checklist) {

  $scope.doLogin = function(loginData) {
    //console.log('Doing login');
    Checklist.GetChecks();
    $timeout(function() {
	  //console.log(md5(loginData.password));
	  if(md5(loginData.password) == $rootScope.pw) {
		  // Store in database
		  $rootScope.store.save({key:'app-pw',value: $rootScope.pw});
      $rootScope.store.save({key:'app-user',value: loginData.username});
		  $ionicHistory.nextViewOptions({ historyRoot: true })
		  window.location = '#/app/disclaimer';
	  } else {
		  console.log('Fout...');
	  }
    }, 1000);
  };
})

.controller('CheckCtrl', function($stateParams,$scope,Checklist) {
    var checkId = $stateParams.id;
    //console.log(checkId);
    if(Checklist.IsAvailable()) {
      $scope.check = Checklist.GetCheck(checkId);
    } else {
      Checklist.GetChecks().then(function() {
        $scope.check = Checklist.GetCheck(checkId);
      });
    }
})

.controller('ChecksCtrl', function($stateParams,$scope,Checklist) {
    var cat = $stateParams.cat;
    var subcat = $stateParams.subcat;
    if(Checklist.IsAvailable()) {
      $scope.checks = Checklist.GetCat(cat,subcat);
    } else {
      Checklist.GetChecks().then(function() {
        $scope.checks = Checklist.GetCat(cat,subcat);
      });
    }
    $scope.CAT = cat;
    Checklist.unCheck();
    $scope.boxChecked = function() {
      var count = 0;
      //console.log($scope.checks[0]);
       for(i=0;i<$scope.checks.length;i++){
                if($scope.checks[i].checked){
                    count = count + 1;
                }
        }
        if(count == $scope.checks.length ) {
          if($scope.checks[0].NCAT=='') {
            window.location = '#/app/tussenmenu';
          } else {
            window.location = '#/app/checks/'+$scope.checks[0].NCAT;
          }
        }
    };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
