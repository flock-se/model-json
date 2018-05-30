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
      "$id": "http://example.com/example.json",
      "type": "object",
      "definitions": {},
      "$schema": "http://json-schema.org/draft-07/schema#",
      "properties": {
        "var1": {
          "$id": "/properties/var1",
          "type": "boolean"
        },
        "var2": {
          "$id": "/properties/var2",
          "type": "string"
        },
        "var3": {
          "$id": "/properties/var3",
          "type": "object",
          "properties": {
            "sub1": {
              "$id": "/properties/var3/properties/sub1",
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