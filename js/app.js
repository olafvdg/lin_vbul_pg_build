//
// App: vbul = Veilig Bevrijden Uit Liften
//
angular.module('vbul', ['ionic', 'vbul.controllers','vbul.services'])

.run(function($ionicPlatform,$rootScope,$ionicHistory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
	$rootScope.pw = 'b7d182d9df3ae4ce0595d2250b9898cb'; // zuurstof
	$rootScope.store = Lawnchair({name:'linstore',adapter:'webkit-sqlite'},function(e){
		//console.log('Storage open');
	});
	$rootScope.store.get('app-pw',function(obj) {		
		$rootScope.storedpw = obj.value;
		if($rootScope.pw == $rootScope.storedpw) {
			$ionicHistory.nextViewOptions({ historyRoot: true })
			window.location = '#/app/disclaimer';
		}
	});
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.backButton.previousTitleText(false).text('');

  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  })

  .state('app.disclaimer', {
    url: '/disclaimer',
    views: {
      'menuContent': {
        templateUrl: 'templates/disclaimer.html'
      }
    }
  })

  .state('app.check', {
    url: '/check/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/check.html',
        controller: 'CheckCtrl'
      }
    }
  })

  .state('app.tussenmenu', {
    url: '/tussenmenu',
    views: {
      'menuContent': {
        templateUrl: 'templates/tussenmenu.html'
      }
    }
  })
  
  .state('app.checks', {
    url: '/checks/:cat/:subcat',
    views: {
      'menuContent': {
        templateUrl: 'templates/checks.html',
        controller: 'ChecksCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
