const assert = require('assert');
const jsonschema = require('jsonschema').validate;

const moddelJson = require('../src/index');

describe('definitions', function () {


  it('boolean', function () {
    const model = {
      "var1": "$def1",
      "var2": "$def2",

      "$def1": {
        "var2": "string"
      },

      "$def2": {
        "var3": {
          "var4": "string"
        }
      }

    };

    const obj = {
      "var1": {
        "var2": "Hallo"
      },
      "var2": {
        "var3": {
          "var4": "Hallo"
        }
      }
    };

    const res = moddelJson(model)


    assert.deepEqual({
      "$schema": "http://json-schema.org/draft-07/schema#",
      "type": "object",
      "definitions": {

        "def1": {
          "properties": {
            "var2": {
              "type": "string"
            }
          },
          "required": [
            "var2"
          ]

        },

        "def2": {
          "properties": {
            "var3": {
              "type": "object",
              "properties": {
                "var4": {
                  "type": "string"
                }
              },
              "required": [
                "var4"
              ]

            }
          },
          "required": [
            "var3"
          ]
        }
      },

      "properties": {
        "var1": {
          "$ref": "#/definitions/def1"
        },
        "var2": {
          "$ref": "#/definitions/def2"
        }
      },
      "required": [
        "var1",
        "var2"
      ]
    }, res);
    assert.deepEqual(jsonschema(obj, res).errors, [])
  });

})
;