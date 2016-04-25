
//var assert = require('assert');
import * as assert from 'assert';
import { Promise } from 'rsvp';
import * as proxyquire from 'proxyquire';
let rsvp = require('rsvp');
var chai = require('mocha');
let sinon: SinonStatic = require('sinon');
var expect = chai.expect; // we are using the "expect" style of Chai
var MongoClient = require('mongodb').MongoClient;
var CartSummary = require('./../../src/controller/AirPlaneAllStatController');


import nconf = require('nconf');


nconf.argv()
    .env()
    .file({ file: __dirname + '/config.json' });

describe('CartSummary', function() {

     let db = MongoClient.Connect('') 

    it('getSubtotal() should return 0 if no items are passed in', function() {
        assert.equal(CartSummary.AirPlaneAllStatController.prototype.Add(), 10);
    });
});
//mocha tests/unit --recursive --require tests\startup.js