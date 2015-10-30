# gp.js

> Simple JavaScript helper library for querying Google Photos API

## Examples

```js
var options = {
    userID: 'picasa_user_id',
    size: 'h720', // h + required height or w + required width, e.g. h100 or w500
    excludeAlbums: ['Scrapbook Photos', 'Profile Photos'] // albums to ignore (optional)
    excludeAlbumsTypes: ['Buzz'] // albums types to ignore (optional)
};

var gp = new GP(options);

gp.getUserData(function(data) {
    console.log(data); // user's feed
});

gp.getAlbums(function(data) {
    console.log(data); // user's albums
});

gp.getAlbumsURLs(function(data) {
    console.log(data); // user's albums API urls
});
```

## TODO

- add more queries, e.g.: albums by date etc.
- documentation
- website
- examples

## API

### getUserData(callback)

Get user's feed

**Parameters**

**callback**: `function`, Get user's feed



### getAlbums(callback)

Get user's albums

**Parameters**

**callback**: `function`, Get user's albums



### getAlbumsURLs(callback)

Get user's albums urls

**Parameters**

**callback**: `function`, Get user's albums urls

## License

MIT © [mjeightyfive](http://twitter.com/mjeightyfive)
