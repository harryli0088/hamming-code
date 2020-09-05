import generateData from "../generateData"

it('generates the right 2d data array', () => {
  [1,2,3,4,5,6,7,8].forEach(dimension => {
    const data = generateData(dimension)

    expect(Array.isArray(data)).toEqual(true)
    expect(data.length).toEqual(dimension*dimension)
    data.forEach(cell => {
      expect(cell===1 || cell===0).toEqual(true)
    })
  })
});
