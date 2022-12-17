import {expect, jest, test} from '@jest/globals';
const {shuffleArray} = require('./utils')

describe('shuffleArray should', () => {
    test('be of the same length as original',()=> {
        let newarray = shuffleArray([1, 2, 3])
        expect(newarray.length).toBe(3) 
    } )
})
