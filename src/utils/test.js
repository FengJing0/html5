let arr = [
  {
    'objn': 'ST1201',
    'obsz': 4,
    'updt': 1,
    'logt': 5,
    'tstd': 1,
    'disp': 1,
    'logs': 1,
    'oatt': [
      {
        'attn': 'Temperature',
        'adis': 1,
        'achg': 1,
        'attt': 'float',
        'deci': 0,
        'aadd': [
          {
            'addr': '1!W1000',
            'pref': 'R1',
            'suff': '1',
            'obix': 0
          },
          {
            'addr': '2!W1000',
            'pref': 'R1',
            'suff': '2',
            'obix': 1
          }
        ],
        'attr': 'R',
        'rtim': 1
      }
    ]
  }
]

function test (arr) {
  let res = []
  arr.forEach(i => {
    let tmp = {}
    let keys = Object.keys(i)
    let notArray = []
    let isArray = []
    while (keys.length) {
      let key = keys.shift()
      if (Array.isArray(i[key])) {
        isArray.push(key)
      } else {
        notArray.push(key)
      }
    }
    // keys = [...notArray, ...isArray]
    notArray.forEach(key => {
      tmp[key] = i[key]
    })
    isArray.forEach(key => {
      i[key].forEach(item => {
        res.push(Object.assign({}, tmp, item))
      })
    })
  })

  return res
}
// test(arr)
console.log(test(arr))
