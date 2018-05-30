const typeRegex = /(boolean|integer|number|string)\?/
const definitionRegex = /\$(.*)/
const requiredRegex = /(.*)\?/

const generateProperties = (model, path) => {


  return Object.keys(model)
    .filter(key => !definitionRegex.test(key))
    .map(key => {
      const value = model[key];
      return {key, value, path: [].concat(path, key)}
    }).reduce((acc, cur) => {

      const type = requiredRegex.test(cur.value) ? cur.value.slice(0,-1) : cur.value
      if (typeof cur.value === 'object') {
        acc[cur.key] = {
          "$id": '/' + cur.path.join('/'),
          type: "object",
          properties: generateProperties(cur.value, [].concat(cur.path, 'properties')),
          required: generateRequird(cur.value)
        };
      }

      else if (definitionRegex.test(cur.value)) {
        acc[cur.key] = {
          "$id": '/' + cur.path.join('/'),
          "$ref": `#/definitions/${type.slice(1)}`
        }
      }

      else {
        acc[cur.key] = {
          "$id": '/' + cur.path.join('/'),
          type: type
        };
      }

      return acc
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
        "$id": `/definitions/${cur.name}`,
        properties: generateProperties(cur.value, ['definitions', cur.name, 'properties']),
        required: generateRequird(cur.value)
      };
      return acc
    }, {});
}

module.exports = (model) => {

  return {
    "$id": "http://example.com/example.json",
    "$schema": "http://json-schema.org/draft-07/schema#",
    type: "object",
    definitions: generateDefinitions(model),
    properties: generateProperties(model, ['properties']),
    required: generateRequird(model)
  }

};
