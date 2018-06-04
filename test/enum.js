const assert = require('assert');
const jsonschema = require('jsonschema').validate;

const moddelJson = require('../src/index');

describe('enum', function () {


  it('required', function () {
    const obj = {
      "var1": "test1"
    };

    const model = {
      "var1": "test1,test2"
    };

    const res = moddelJson(model)

    assert.deepEqual(jsonschema(obj, res).errors, [])
    assert.deepEqual(res, {
        "$id": "http://example.com/example.json",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "definitions": {},
        "properties": {
          "var1": {
            "$id": "/properties/var1",
            "type": "string",
            "enum": ["test1", "test2"]
          }
        },
        "required": [
          "var1"
        ],
        "type": "object"
      }
    );
  });


  it('optional', function () {
    const obj = {
      "var1": "test1"
    };

    const model = {
      "var1": "test1,test2?"
    };

    const res = moddelJson(model)

    assert.deepEqual(jsonschema(obj, res).errors, [])
    assert.deepEqual(res, {
        "$id": "http://example.com/example.json",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "definitions": {},
        "properties": {
          "var1": {
            "$id": "/properties/var1",
            "type": "string",
            "enum": ["test1", "test2"]
          }
        },
        "required": [],
        "type": "object"
      }
    );
  });




});