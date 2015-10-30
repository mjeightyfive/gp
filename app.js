'use strict';

(function() {

    var options = {
        // userID: 'mjeightyfive',
        userID: '114512439756754175212',
        size: 'h120', // h + required height or w + required width, e.g. h100 or w500
        // excludeAlbums: ['Scrapbook Photos', 'Profile Photos', 'Buzz'] // albums to ignore (optional)
        excludeAlbumsNames: ['Scrapbook Photos', 'Profile Photos'], // albums to ignore (optional)
        excludeAlbumsTypes: ['Buzz'] // albums types to ignore (optional)
    };

    var picasa = new Callpicasa(options);

    var photosContainer = $('.photos');
    picasa.getAlbumsImages(function(image) {
        photosContainer.append('<img class="pure-img" src="' + image + '" alt="Image" />');
    });

})();
