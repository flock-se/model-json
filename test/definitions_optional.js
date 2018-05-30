const assert = require('assert');
const jsonschema = require('jsonschema').validate;

const moddelJson = require('../src/index');

describe('definitions_optional', function () {


  it('boolean', function () {
    const model = {
      "var1": "$def1?",

      "$def1": {
        "var2": "string?"
      },


    };

    const obj = {
    };

    const res = moddelJson(model)


    assert.deepEqual({
      "$id": "http://example.com/example.json",
      "$schema": "http://json-schema.org/draft-07/schema#",
      "type": "object",
      "definitions": {

        "def1": {
          "$id": "/definitions/def1",
          "properties": {
            "var2": {
              "$id": "/definitions/def1/properties/var2",
              "type": "string"
            }
          },
          "required": []
        }
      },

      "properties": {
        "var1": {
          "$id": "/properties/var1",
          "$ref": "#/definitions/def1"
        }
      },
      "required": []
    }, res);
    assert.deepEqual(jsonschema(obj, res).errors, [])
  });

})
;