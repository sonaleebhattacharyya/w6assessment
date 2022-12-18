import {expect, jest, test} from '@jest/globals';
const {shuffleArray} = require('./utils')
// Test checks whether the shuffled array is the same length as the original. So if you input 
// [1, 2, 3], and shuffle it, the shuffled array should also have length 3. 

describe('shuffleArray should', () => {
    test('be of the same length as original',()=> {
        let newarray = shuffleArray([1, 2, 3])
        expect(newarray.length).toBe(3) 
    } )

    test('should be of the same type', ()=> {
        let newarray = shuffleArray([])
        expect(Array.isArray(newarray)).toBe(true)
    } )
})


