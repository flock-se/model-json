const assert = require('assert');
const jsonschema = require('jsonschema').validate;

const moddelJson = require('../src/index');

describe('optional_model', function () {


  it('boolean?', function () {
    const obj = {
      "var2": true
    };

    const model = {
      "var2": "boolean?"
    };

    const res = moddelJson(model)

    assert.deepEqual(jsonschema(obj, res).errors, [])
    assert.deepEqual({
      "$schema": "http://json-schema.org/draft-07/schema#",
      "definitions": {},
      "properties": {
        "var2": {
          "type": "boolean"
        }
      },
      "required": [],
      "type": "object"
    }, res);
  });


  it('integer?', function () {
    const obj = {
      "var1": 1
    };

    const model = {
      "var1": "integer?"
    };

    const res = moddelJson(model)

    assert.deepEqual(jsonschema(obj, res).errors, [])
    assert.deepEqual({
      "$schema": "http://json-schema.org/draft-07/schema#",
      "definitions": {},
      "properties": {
        "var1": {
          "type": "integer"
        }
      },
      "required": [],
      "type": "object"
    }, res);
  });


  it('string?', function () {
    const obj = {
      "var1": "Test"
    };

    const model = {
      "var1": "string?"
    };

    const res = moddelJson(model)

    assert.deepEqual(jsonschema(obj, res).errors, [])
    assert.deepEqual({
        "$schema": "http://json-schema.org/draft-07/schema#",
        "definitions": {},
        "properties": {
          "var1": {
            "type": "string"
          }
        },
        "required": [],
        "type": "object"
      }, res);
  });


});