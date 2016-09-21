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

function onTweet(tweet) {
  tweet$.next(tweet);
}

function wrap() {
  return (tweet$) => tweet$
    .map(tweet => ({
      source: tweet,
      handle: tweet.user.screen_name,
      message: tweet.text
    }));
}

function getKeywords(keywords) {
  return (tweet$) => tweet$
    .map(tweet => utils.getTweetKeywords(tweet, keywords));
}

function annotateKeywords(keywords) {
  return ($tweet) => Rx.Observable.zip(
    $tweet,
    $tweet.let(getKeywords(keywords)),
    (tweet, keywords) => Object.assign({}, tweet, {
      keywords: keywords
    })
  );
}

function getCount() {
}

function annotateCount() {
}

function throttle() {
}

track(Object.keys(keywords).join(','), onTweet, (error) => console.error(error));

tweet$
  .let(wrap())
  .let(annotateKeywords(Object.keys(keywords)))
  .map(tweet => tweet.keywords)
  .subscribe(keywords => {
    console.log(keywords);
  });
