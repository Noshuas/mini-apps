_each = (obj, cb)=> {
  if (Array.isArray(obj)) {
    obj.forEach((value, i, list) => {
      cb(value, i, list);
    })
  } else if (typeof obj === 'object') {
    for (var key in obj) {
      cb(obj[key], key, obj);
    }
  }
}

module.exports.getFields = function(obj) {
  var keys = [];
  _each(obj, (value, parentKey)=>{
    if (!Array.isArray(value)) {
      keys.push(parentKey);
    } else {
      _each(value, (obj)=> {
        var childKeys = module.exports.getFields(obj);
        _each(childKeys, (key)=>{
          if (keys.indexOf(key) === -1) {
            keys.push(parentKey + '/' + key)
          }
        })
      })
    }
  })
  return keys;
}

module.exports.getVals = function(obj, colNames) {
  var vals = [];
  var row = '';
  var childVals;

  _each(obj, (value, key)=>{
    if (!Array.isArray(value)) {
      if (colNames.includes(key)) row += value;
      row+= ',';
    } else if (value.length >= 1) {
      debugger;
      _each(value, (obj)=> {
        childVals = module.exports.getVals(obj, colNames);
        vals = vals.concat(childVals);
      })
    }
  })

  vals.unshift(row+='\n');
  // console.log(vals);
  return vals;
}
