'use strict';

(function() {

    var options = {
        userID: '109473512611685902219',
        // userID: '114512439756754175212',
        size: 'h1080', // h + required height or w + required width, e.g. h100 or w500
        excludeAlbumsNames: ['Scrapbook Photos', 'Profile Photos'], // albums to ignore (optional)
        // excludeAlbumsTypes: [] // albums types to ignore (optional)
    };

    var gp = new GP(options);

    var photosContainer = $('.photos');
    gp.getAlbumsImages(function(image) {
        // console.log('image', image);
        photosContainer.append('<img class="pure-img" src="' + image + '" alt="Image" />');
    });

    // gp.getAlbums(function(data) {
    //     console.log('data', data);
    // });

    // gp.getUserData(function(data) {
    //     console.log('data', data);
    // });

    // gp.getAlbumsURLs(function(data) {
    //     console.log(data); // user's albums API urls
    // });

})();
