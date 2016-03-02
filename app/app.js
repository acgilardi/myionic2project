import {App, IonicApp, Platform} from 'ionic-framework/ionic';
import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {ListPage} from './pages/list/list';
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire} from 'angularfire2';

FIREBASE_PROVIDERS.push(defaultFirebase('https://yayday.firebaseio.com'));

@App({
  templateUrl: 'build/app.html',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/,
  providers: FIREBASE_PROVIDERS
})
class MyApp {
  static get parameters() {
    return [[IonicApp], [Platform], [AngularFire]];
  }

  constructor(app, platform, angFire) {
    // set up our app
    this.app = app;
    this.platform = platform;
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage }
    ];

    //this.book = angFire.list('/book');
    //console.log('BOOK');
    //console.log(this.book);

    //this.book.subscribe(function (changeData) {
    //  // If event type is 'value', changeData is a DataSnapshot
    //  // Otherwise, changeData is:
    //  // {
    //  //   snapshot: DataSnapshot,
    //  //   prevName: optional string of previous child location
    //  // }
    //  console.log('CHANGED');
    //});


    // make HelloIonicPage the root (or first) page
    this.rootPage = HelloIonicPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      //
      // For example, we might change the StatusBar color. This one below is
      // good for light backgrounds and dark text;
      if (window.StatusBar) {
        window.StatusBar.styleDefault();
      }
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.app.getComponent('leftMenu').close();
    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
