// Add special data here
const specialData = [
  'tags', 'lib', 'report', 'title', 'link', 'doc', 'read', 'edit', 'relation'
];
const forbiden = ['dark'];

export { adjustCondition, getSafeResult };

function getSafeResult(req, result) {
  return checkScope(req) ? result : result.filter(forbidenFilter);
}

function adjustCondition(condition) {
  // Check condition for special data
  try {
    const allKeys = Object.keys(condition);
    specialData.forEach((key) => {
      if (allKeys.includes(key)) {
        if (typeof(condition[key]) != 'object') {
          let newVal = condition[key].split(', ');
          condition[key] = {
            logic: 'include',
            value: newVal,
          }
        }
      }
    });
  } catch (e) {
    // Do nothing, just make sure Object.keys won't crash the server
  }
}

// Check scope when requesting forbiden data
function checkScope(req) {
  return req.user
    && typeof req.user.scope === 'string'
    && req.user.scope.split(' ').includes('admin');
}

// Filter forbiden data
let forbidenFilter = function (item) {
  return forbiden.reduce((result, key) => {
    return (!item.tags)
      ? result && true
      : result && !item.tags.split(', ').includes(key);
  }, true);
}
