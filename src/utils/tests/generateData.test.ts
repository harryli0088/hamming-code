import generateData from "../generateData"
import validateDataArray from "../validateDataArray"

it('generates the right 2d data array', () => {
  [1,2,3,4,5,6,7,8].forEach(dimension => {
    for(let i=0; i<10; ++i) { //run each dimension multiple times
      const data = generateData(dimension*dimension)

      expect(Array.isArray(data)).toEqual(true)
      expect(data.length).toEqual(dimension*dimension)
      data.forEach(cell => {
        expect(cell===1 || cell===0).toEqual(true)
      })
      expect(validateDataArray(data)).toEqual({
        doubleError: false,
        errorIndex: 0,
        parity: 0,
      })

      //expect the overall parity to be 0
      expect(
        data.reduce((accumulator, currentValue) => accumulator^=currentValue, 0)
      ).toEqual(0)
    }
  })
});
