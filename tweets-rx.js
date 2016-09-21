const Rx = require('@reactivex/rxjs');
const track = require('./twitter-stream');
const utils = require('./utils');

const keywords = {
  'javascript': 'cyan',
  'boobs': 'yellow',
  'clinton': 'blue',
  'trump': 'red',
};

const tweet$ = new Rx.Subject();
const wrappedTweet$ = tweet$.map(tweet => ({
  source: tweet,
  handle: tweet.user.screen_name,
  message: tweet.text,
  keywords: utils.getTweetKeywords(tweet.text, Object.keys(keywords))
}));
const count$ = tweet$.scan(count => count + 1, 0);

track(Object.keys(keywords).join(','), (tweet) => tweet$.next(tweet), (error) => console.error(error));

Rx.Observable.zip(
  wrappedTweet$, count$,
  (tweet, count) => Object.assign({}, tweet, { count: count }))
  .throttleTime(1000)
  .subscribe(tweet => console.log(utils.stringifyTweet(tweet, keywords)));
