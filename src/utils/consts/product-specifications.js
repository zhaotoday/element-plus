const specifications = (() => {
  let ret = []

  for (let i = 1; i <= 10; i++) {
    ret.push({
      id: i,
      value: `1:${i}`,
      label: `${i} 斤`
    })
  }

  return [
    {
      id: 0,
      value: '1:0.5',
      label: '0.5 斤'
    },
    ...ret
  ]
})()

export default [
  {
    value: '1',
    label: '农产品',
    specifications
  }
]
