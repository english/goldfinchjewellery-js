function first(arr) {
  return arr[0];
}

function each(handler, collection) {
  for (var index = 0; index < collection.length; index++)
    handler(collection[index], index, collection);
}

function reduce(handler, collection, accumulator) {
  each(function(value) {
    accumulator = handler(accumulator, value);
  }, collection);

  return accumulator;
}

function map(handler, collection) {
  return reduce(function(accumulator, value) {
    accumulator.push(handler(value));
    return accumulator;
  }, collection, []);
}

function filter(handler, collection) {
  return reduce(function(accumulator, item) {
    if (handler(item)) accumulator.push(item);
    return accumulator;
  }, collection, []);
}

function find(predicate, links) {
  return first(filter(predicate, links));
}

function groupBy(attribute, collection) {
  var result = {};

  each(function(item) {
    var key = item[attribute];
    result[key] = result[key] || [];
    result[key].push(item);
  }, collection);

  return result;
}
