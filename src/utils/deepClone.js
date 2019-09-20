function deepClone (item) {
  let res
  if (typeof item === 'object') {
    res = Array.isArray(item) ? [] : {}
    for (let key in item) {
      if (item.hasOwnProperty(key)) {
        if (typeof item[key] === 'object' && item[key] !== null) {
          res[key] = deepClone(item[key])
        } else {
          res[key] = item[key]
        }
      }
    }
  } else {
    res = item
  }
  return res
}
