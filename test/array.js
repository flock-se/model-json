const assert = require('assert');
const jsonschema = require('jsonschema').validate;

const moddelJson = require('../src/index');

describe('array_string', function () {


  it('array_string', function () {

    const obj = {
      "arr1": [
        "x",
        "y"
      ]
    };

    const model = {
      "arr1": ["string"]
    };

    const res = moddelJson(model)


    assert.deepEqual({
      "$id": "http://example.com/example.json",
      "$schema": "http://json-schema.org/draft-07/schema#",
      "definitions": {},
      "properties": {
        "arr1": {
          "$id": "/properties/arr1",
          "type": "array",
          "items": {
            "$id": "/properties/arr1/items",
            "type": "string",
          }
        }
      },
      "required": [
        "arr1"
      ],
      "type": "object"
    }, res);
    assert.deepEqual(jsonschema(obj, res).errors, [])
  });


  it('array_integer', function () {

    const obj = {
      "arr1": [
        1,
        2
      ]
    };

    const model = {
      "arr1": ["integer"]
    };

    const res = moddelJson(model)


    assert.deepEqual({
      "$id": "http://example.com/example.json",
      "$schema": "http://json-schema.org/draft-07/schema#",
      "definitions": {},
      "properties": {
        "arr1": {
          "$id": "/properties/arr1",
          "type": "array",
          "items": {
            "$id": "/properties/arr1/items",
            "type": "integer",
          }
        }
      },
      "required": [
        "arr1"
      ],
      "type": "object"
    }, res);
    assert.deepEqual(jsonschema(obj, res).errors, [])
  });

  it('array_object', function () {

    const obj = {
      "arr1": [
        {"var1": "val1"},
        {"var1": "val2"}
      ]
    };

    const model = {
      "arr1": [
        {
          "var1": "string"
        }
      ]
    };

    const res = moddelJson(model)


    assert.deepEqual({
      "$id": "http://example.com/example.json",
      "$schema": "http://json-schema.org/draft-07/schema#",

      "definitions": {},

      "properties": {
        "arr1": {
          "$id": "/properties/arr1",
          "type": "array",
          "items": {
            "$id": "/properties/arr1/items",
            "type": "object",
            "properties": {
              "var1": {
                "$id": "/properties/arr1/items/properties/var1",
                "type": "string"
              }
            }
          }
        }
      },

      "required": [
        "arr1"
      ],
      "type": "object"
    }, res);
    assert.deepEqual(jsonschema(obj, res).errors, [])
  });


  it('array_def', function () {

    const obj = {
      "arr1": [
        {"var1": "val1"},
        {"var1": "val2"}
      ]
    };

    const model = {
      "arr1": ["$def1"],
      "$def1": {
        "var1": "string"
      }
    };

    const res = moddelJson(model)


    assert.deepEqual({
      "$id": "http://example.com/example.json",
      "$schema": "http://json-schema.org/draft-07/schema#",

      "definitions": {
        "def1": {
          "$id": "/definitions/def1",
          "properties": {
            "var1": {
              "$id": "/definitions/def1/properties/var1",
              "type": "string"
            }
          },
          "required": [
            "var1"
          ]
        }
      },

      "properties": {
        "arr1": {
          "$id": "/properties/arr1",
          "type": "array",
          "items": {
            "$id": "/properties/arr1/items",
            "$ref": "#/definitions/def1"
          }
        }
      },

      "required": [
        "arr1"
      ],
      "type": "object"
    }, res);
    assert.deepEqual(jsonschema(obj, res).errors, [])
  });

});