import {NgZone, LifecycleEvent} from 'angular2/core'
import {Page} from 'ionic-framework/ionic';
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire} from 'angularfire2';

FIREBASE_PROVIDERS.push(defaultFirebase('https://yayday.firebaseio.com'));


@Page({
    templateUrl: 'build/pages/hello-ionic/hello-ionic.html'
})
export class HelloIonicPage {
    static get parameters() {
        return [[AngularFire], [NgZone]];
    }

    //public bookText;

    //var _this = this;

    constructor(angFire, zone) {
        var _this = this;
        this.bookText = 'No Book Selected';
        this.selectedWordId = 'word.0';
        this.words = [];
        this.book = angFire.list('/book');



        this.book.subscribe(function (changeData) {
            // If event type is 'value', changeData is a DataSnapshot
            // Otherwise, changeData is:
            // {
            //   snapshot: DataSnapshot,
            //   prevName: optional string of previous child location
            // }

            var curBook = changeData[0];

            console.log('CHANGED');
            //console.log(changeData);
            console.log(curBook.bookText);
            console.log(curBook.selectedWordId);
            _this.bookText = curBook.bookText;
            _this.selectedWordId = curBook.selectedWordId;
            _this.words = _this.bookText.split(' ');

            //this.words = this.bookText.split(' ');
            //        console.log('Book Selected: ' + this.bookText);
        });
    }

}
