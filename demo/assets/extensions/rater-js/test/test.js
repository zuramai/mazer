var assert = require('assert');
var raterJs = require('../lib/rater-js');
var sinon = require('sinon');
var jsdom = require('jsdom');
const { JSDOM } = jsdom;

describe('RaterJs', function() {
      
    it('should throw when element is missing', function() {
        assert.throws(() => {
            raterJs();
          });
    });

    it('should create new rater without throwing error', function() {

        const dom = new JSDOM(`<!DOCTYPE html><div id="rater">test</div>`);
        const element = dom.window.document.querySelector("#rater");
        global.document = dom.window.document;

        assert.doesNotThrow(() => {
            raterJs({ element:element });
          });
    });

    it('getRating should return null when no rating is set', function() {

        const dom = new JSDOM(`<!DOCTYPE html><div id="rater">test</div>`);
        const element = dom.window.document.querySelector("#rater");
        global.document = dom.window.document;

        let rater = raterJs({ element:element });
        assert.equal(rater.getRating(),null);
    });

    it('getRating should return null after clear', function() {
        const dom = new JSDOM(`<!DOCTYPE html><div id="rater">test</div>`);
        const element = dom.window.document.querySelector("#rater");
        global.document = dom.window.document;

        let rater = raterJs({ element:element });
        rater.setRating(2);
        rater.clear();
        assert.equal( rater.getRating(),null);
    });


    it('getRating should return the initial rating', function() {
        const dom = new JSDOM(`<!DOCTYPE html><div id="rater">test</div>`);
        const element = dom.window.document.querySelector("#rater");
        global.document = dom.window.document;

        let rater = raterJs({ element:element, rating:3 });
        assert.equal(rater.getRating(),3);
    });

    it('getRating should return the changed rating', function() {

        const dom = new JSDOM(`<!DOCTYPE html><div id="rater">test</div>`);
        const element = dom.window.document.querySelector("#rater");
        global.document = dom.window.document;

        let rater = raterJs({ element:element, rating:3 });
        rater.setRating(4);
        assert.equal(rater.getRating(),4);
    });

    it('should set rating from data-rating if present', function() {

        const dom2 = new JSDOM(`<!DOCTYPE html><div data-rating="4" id="rater">test</div>`);
        const element2 = dom2.window.document.querySelector("#rater");

        let rater = raterJs({ element:element2});
        assert.equal(rater.getRating(),4);
    });

    it('clicking a the star should trigger callback', function() {
        const dom = new JSDOM(`<!DOCTYPE html><div id="rater">test</div>`);
        const element = dom.window.document.querySelector("#rater");
        global.document = dom.window.document;

        let callbackSpy = sinon.spy();
        let rater = raterJs({ element:element, rating:3, rateCallback:callbackSpy });
        var evt = global.document.createEvent("HTMLEvents");
        evt.initEvent("click", false, true);
        element.dispatchEvent(evt);
        sinon.assert.calledOnce(callbackSpy);
    });

    
    it('setRating should throw when rating is below 0', function() {
        const dom = new JSDOM(`<!DOCTYPE html><div id="rater">test</div>`);
        const element = dom.window.document.querySelector("#rater");
        global.document = dom.window.document;

        let rater = raterJs({ element:element, rating:3 });

        assert.throws(() => {
            rater.setRating(-1);
        });

        assert.throws(() => {
            rater.setRating(-0.1);
        });
    });

    it('setRating should throw when rating is above max', function() {
        const dom = new JSDOM(`<!DOCTYPE html><div id="rater">test</div>`);
        const element = dom.window.document.querySelector("#rater");
        global.document = dom.window.document;

        let rater = raterJs({ element:element, max:5 });

        assert.throws(() => {
            rater.setRating(6);
        });

        assert.throws(() => {
            rater.setRating(5.1);
        });
    });

    it('setRating should throw when rating is not a number', function() {
        const dom = new JSDOM(`<!DOCTYPE html><div id="rater">test</div>`);
        const element = dom.window.document.querySelector("#rater");
        global.document = dom.window.document;

        let rater = raterJs({ element:element, max:5 });

        assert.throws(() => {
            rater.setRating(undefined);
        });

        assert.throws(() => {
            rater.setRating("3");
        });
    });

    it('should throw when step is 0 or below', function() {
        const dom = new JSDOM(`<!DOCTYPE html><div id="rater">test</div>`);
        const element = dom.window.document.querySelector("#rater");
        global.document = dom.window.document;
       
        assert.throws(() => {
            let rater = raterJs({ element:element, step:0 });
        });

        assert.throws(() => {
            let rater = raterJs({ element:element, step:-0.0001 });
        });
    });

    it('should throw when step is above 1', function() {
        const dom = new JSDOM(`<!DOCTYPE html><div id="rater">test</div>`);
        const element = dom.window.document.querySelector("#rater");
        global.document = dom.window.document;

        assert.throws(() => {
            raterJs({ element:element, step:1.0001 });
        });
    });

    it('should not throw when step is between 0 and 1', function() {
        const dom = new JSDOM(`<!DOCTYPE html><div id="rater">test</div>`);
        const element = dom.window.document.querySelector("#rater");
        global.document = dom.window.document;

        assert.doesNotThrow(() => {
            let rater = raterJs({ element:element, step: 0.01 });
        });

        assert.doesNotThrow(() => {
            let rater = raterJs({ element:element, step:0.999 });
        });
    });


    it('element should return original element', function() {
        const dom = new JSDOM(`<!DOCTYPE html><div id="rater">test</div>`);
        const element = dom.window.document.querySelector("#rater");
        global.document = dom.window.document;
        let rater = raterJs({ element:element });

        assert.equal(rater.element,element);
    });
});