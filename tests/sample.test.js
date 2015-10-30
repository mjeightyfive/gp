'use strict';

(function() {

    var expect = chai.expect;

    describe('set userID to be the one passed in', function() {
        it('should have new userID than the default one', function(done) {

            var options = {
                userID: '114512439756754175212'
            };

            var picasa = new Callpicasa(options);

            picasa.getUserData(function(data) {
                expect(data.feed.photo$user.to.equal('114512439756754175212'));
            });

            done();

        });
    });

})();
