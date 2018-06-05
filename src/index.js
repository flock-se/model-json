const typeRegex = /(boolean|integer|number|string)\??/
const enumRegex = /([\w\s]+,)\??/
const definitionRegex = /\$(.*)/
const importRegex = /\@(.*)/
const requiredRegex = /(.*)\?/

const generateArray = (path, type) => {

  if (definitionRegex.test(type)) {
    return {
      //"$id": '/' + path.join('/') + '/items',
      "$ref": `#/definitions/${type.slice(1)}`
    }
  }

  if(typeof type === 'object'){
    return {
      //"$id": '/' + path.join('/') + '/items',
      type: 'object',
      properties: generateProperties(type, [].concat(path, 'items', 'properties')),
    }
  }

  return {
    //"$id": '/' + path.join('/') + '/items',
    type: type
  }
}

const generateProperties = (model, path) => {


  return Object.keys(model)
    .filter(key => !definitionRegex.test(key))
    .map(key => {
      const value = model[key];
      return {key, value, path: [].concat(path, key)}
    }).reduce((acc, cur) => {

      const type = requiredRegex.test(cur.value) ? cur.value.slice(0, -1) : cur.value

      if (Array.isArray(cur.value)) {
        if (cur.value.length > 1) {
          throw new Error("Array can only contain one item");
        }

        acc[cur.key] = {
          //"$id": '/' + cur.path.join('/'),
          type: "array",
          items: generateArray(cur.path, type[0])
        };
        return acc
      }

      if (typeof cur.value === 'object') {
        acc[cur.key] = {
          //"$id": '/' + cur.path.join('/'),
          type: "object",
          properties: generateProperties(cur.value, [].concat(cur.path, 'properties')),
          required: generateRequird(cur.value)
        };
        return acc
      }

      if (definitionRegex.test(cur.value)) {
        acc[cur.key] = {
          //"$id": '/' + cur.path.join('/'),
          "$ref": `#/definitions/${type.slice(1)}`
        }
        return acc
      }

      if (importRegex.test(cur.value)) {
        acc[cur.key] = {
          //"$id": '/' + cur.path.join('/'),
          "$ref": `${type.slice(1)}`
        }
        return acc
      }

      if (enumRegex.test(cur.value)) {
        acc[cur.key] = {
          //"$id": '/' + cur.path.join('/'),
          type: "string",
          "enum": type.split(",")
        }
        return acc
      }

      if (typeRegex.test(cur.value)) {
        acc[cur.key] = {
          //"$id": '/' + cur.path.join('/'),
          type: type
        };
        return acc
      }

      throw new Error("Cannot transform property");

    }, {});
};

const generateRequird = (model) => Object.keys(model)
  .filter(key => !requiredRegex.test(model[key]))
  .filter(key => !definitionRegex.test(key))
  .map(key => {
    return key
  });

const generateDefinitions = (model) => {
  return Object.keys(model)
    .filter(key => definitionRegex.test(key))

    .map(key => {
      const value = model[key];
      const name = key.match(definitionRegex)[1];
      return {key, name, value}
    })
    .reduce((acc, cur) => {
      acc[cur.name] = {
        //"$id": `/definitions/${cur.name}`,
        properties: generateProperties(cur.value, ['definitions', cur.name, 'properties']),
        required: generateRequird(cur.value)
      };
      return acc
    }, {});
}

module.exports = (model) => {

  return {
    "$schema": "http://json-schema.org/draft-07/schema#",
    type: "object",
    definitions: generateDefinitions(model),
    properties: generateProperties(model, ['properties']),
    required: generateRequird(model)
  }

};
