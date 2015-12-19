'use strict';

(function(root, factory) {

    if(typeof define === 'function' && define.amd) {
        define(factory);
    } else if(typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.GP = factory();
    }
})(this, function() {

    function merge(obj) {
        for(var i = 1; i < arguments.length; i++) {
            var def = arguments[i];
            for(var n in def) {
                if(obj[n] === 'undefined') {
                    obj[n] = def[n];
                }
            }
        }
        return obj;
    }

    var get = function(url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.onload = function() {
            var status = xhr.status;
            if(status === 200) {
                cb && cb(xhr.response);
            } else {
                console.log('error!');
            }
        };
        xhr.send();
    };

    /*! foreach.js v1.1.0 | (c) 2014 @toddmotto | https://github.com/toddmotto/foreach */
    var forEach = function(collection, cb, scope) {

        if(Object.prototype.toString.call(collection) === '[object Object]') {
            for(var prop in collection) {
                if(Object.prototype.hasOwnProperty.call(collection, prop)) {
                    cb.call(scope, collection[prop], prop, collection);
                }
            }
        } else {
            for(var i = 0, len = collection.length; i < len; i++) {
                cb.call(scope, collection[i], i, collection);
            }
        }
    };

    var FORMAT = 'alt=json',
        APIURL = 'https://picasaweb.google.com/data/feed/api/user/';
    // albumIDPath = 'albumid/';

    // defaults
    var options = {
        userID: 'mjeightyfive',
        size: 'h720',
        excludeAlbumsNames: [],
        excludeAlbumsTypes: []
    };

    function GP(o) {

        var opts = merge(o || {}, GP.options, options);

        var getUserData = function(cb) {
            get(APIURL + opts.userID + '?' + FORMAT, cb);
        };

        var getAlbums = function(cb) {
            var results = [];
            get(APIURL + opts.userID + '?' + FORMAT, function(data) {
                var json = JSON.parse(data);
                forEach(json.feed.entry, function(value) {

                    var albumName = value.title.$t;
                    var albumType = value.gphoto$albumType;

                    if(albumName) {
                        var isAlbumNameExcluded = opts.excludeAlbumsNames.indexOf(albumName) !== -1;

                        if(!isAlbumNameExcluded) {
                            if(albumType) {
                                var albumTypeTitle = value.gphoto$albumType.$t;
                                var isAlbumTypeExcluded = opts.excludeAlbumsTypes.indexOf(albumTypeTitle) !== -1;

                                if(!isAlbumTypeExcluded) {
                                    results.push(value);
                                }
                            } else {
                                results.push(value);
                            }
                        }
                    }
                });

                if(cb) {
                    cb(results);
                }
            });
        };

        var getAlbumsURLs = function(cb) {
            var results = [];
            getAlbums(function(data) {
                forEach(data, function(value) {
                    results.push(value.link[0].href);
                });

                if(cb) {
                    cb(results);
                }
            });
        };

        var getImagesByAlbumURL = function(url, cb) {
            var results = [];
            var append = opts.size + '/';
            var match = /([^\/]+)$/;
            get(url, function(album) {
                var json = JSON.parse(album);
                forEach(json.feed.entry, function(entry) {
                    var newUrl = entry.content.src.replace(match, append);
                    results.push(newUrl);
                });

                if(cb) {
                    cb(results);
                }
            });
        };

        var getImagesByAlbumsURLs = function(data, cb) {
            forEach(data, function(url) {
                getImagesByAlbumURL(url, function(images) {
                    forEach(images, function(image) {
                        if(cb) {
                            cb(image);
                        }
                    });
                });
            });
        };

        var getAlbumsImages = function(cb) {
            getAlbumsURLs(function(urls) {
                getImagesByAlbumsURLs(urls, function(image) {

                    if(cb) {
                        cb(image);
                    }
                });
            });

        };

        var getAlbumsByName = function(name, cb) {
            var results = [];

            getAlbums(function(data) {
                forEach(data, function(value) {
                    if(value.title.$t.indexOf(name) !== -1) {
                        results.push(value.link[0].href);
                    }
                });

                if(cb) {
                    cb(results);
                }
            });
        };

        var getImagesByAlbumName = function(name, cb) {
            var results = [];

            getAlbumsByName(name, function(data) {

                forEach(data, function(url) {
                    getImagesByAlbumURL(url, function(images) {
                        forEach(images, function(image) {
                            results.push(image);
                        });

                        if(cb) {
                            cb(results);
                        }
                    });
                });

            });
        };

        return {
            getUserData: getUserData,
            getAlbums: getAlbums,
            getAlbumsURLs: getAlbumsURLs,
            getAlbumsImages: getAlbumsImages,
            getAlbumsByName: getAlbumsByName,
            getImagesByAlbumName: getImagesByAlbumName
        };

    }

    return GP;
});
