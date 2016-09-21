# reactivex-brainfood-example
Contrasting a conventional implementation with one using RxJS

Running the non-Rx version:
`node tweets.js`

Running the Rx version:
`node tweets-rx.js`

## Twitter API Authentication
The following needs to be set in your environment for the scripts to work:
 - TWITTER_CONSUMER_KEY
 - TWITTER_CONSUMER_SECRET
 - TWITTER_ACCESS_TOKEN_KEY
 - TWITTER_ACCESS_TOKEN_SECRET

You can get these here: https://apps.twitter.com/
More information about the Twitter library: https://github.com/desmondmorris/node-twitter

## Node Version
Because the code is written is ES6 / ES2015, Node v6 is required.

## ReactiveX / RxJS links
 - https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
 - http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html
 - http://reactivex.io/documentation/operators.html
 - http://rxmarbles.com/#debounce

## Combining with Redux / Angular 2
  - https://github.com/ngrx/store
  - https://github.com/ngrx/example-app
