const checkNewTrain =  require('../functions/checkNewTrains');
const expect = require('chai').expect;

describe("#Check new train", () => {
    it("returns new trains if there are new trains or false otherwise", () => {
        expect(checkNewTrain())
    });

})