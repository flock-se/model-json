const assert = require('assert');
const jsonschema = require('jsonschema').validate;

const moddelJson = require('../src/index');

describe('nested_object', function () {


  it('boolean', function () {
    const obj = {
      "var1": true,
      "var2": "hello",
      "var3": {
        "sub1": "string"
      }
    };

    const model = {
      "var1": "boolean",
      "var2": "string?",
      "var3": {
        "sub1": "string"
      }
    };

    const res = moddelJson(model)


    assert.deepEqual({
      "type": "object",
      "definitions": {},
      "$schema": "http://json-schema.org/draft-07/schema#",
      "properties": {
        "var1": {
          "type": "boolean"
        },
        "var2": {
          "type": "string"
        },
        "var3": {
          "type": "object",
          "properties": {
            "sub1": {
              "type": "string"
            }
          },
          "required": [
            "sub1"
          ]
        }
      },
      "required": [
        "var1",
        "var3"
      ]

    }, res);
    assert.deepEqual(jsonschema(obj, res).errors, [])
  });

});