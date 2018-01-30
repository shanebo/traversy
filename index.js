const fs = require('fs');

function dirToArray(path, filter) {
  if (fs.statSync(path).isDirectory()) {
    return fs.readdirSync(path)
      .map(item => dirToArray(`${path}/${item}`, filter))
      .reduce((total, current) => total.concat(current), []);
  } else {
    return [path].filter(path => new RegExp(filter, 'g').test(path));
  }
}

module.exports = (dir, filter, cb) => {
  const results = dirToArray(dir, filter);
  results.forEach(path => cb(path));
  return results;
}
