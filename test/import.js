const assert = require('assert');
const jsonschema = require('jsonschema').validate;

const moddelJson = require('../src/index');

describe('enum', function () {


  it('required', function () {
    const obj = {
      "var1": {
        "test": "test"
      }
    };

    const model = {
      "var1": "@file://../../test.json"
    };

    const res = moddelJson(model)


    assert.deepEqual({
      "$schema": "http://json-schema.org/draft-07/schema#",
      "definitions": {},
      "properties": {
        "var1": {
          "$ref": "file://../../test.json"
        }
      },
      "required": [
        "var1"
      ],
      "type": "object"
    }, res);
    //assert.deepEqual(jsonschema(obj, res).errors, [])
  });


});