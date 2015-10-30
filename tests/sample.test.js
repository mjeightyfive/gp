'use strict';

(function() {

    var expect = chai.expect;

    describe('set userID to be the one passed in', function() {
        it('should have new userID than the default one', function(done) {

            var options = {
                userID: 'mjeightyfive'
            };

            var gp = new GP(options);

            gp.getUserData(function(data) {
                expect(data.feed.photo$user.to.equal('mjeightyfive'));
            });

            done();

        });
    });

})();

