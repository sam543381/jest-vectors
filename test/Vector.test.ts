import { createVector, init, setImplementation } from '../src/Vector';


describe('Vector creation', () => {

    it('should allow the creation of empty vectors', () => {

        let arr = []
        createVector(arr)

    })

    it('should throw an error when no valid implementation is avaible', () => {

        setImplementation(null)
        expect(() => createVector([])).toThrowError()
        init()

    })

    it('should throw an error when provided with a null argument', () => {

        let args = null
        expect(() => createVector(args)).toThrowError()

    })

    it('should be createable using an array', () => {

        let arr = [ 1, 2, 3, 4, 5]
        createVector(arr)

    })

    it('should update cardinality based on provided components', () => {

        let v = createVector([1, 2, 3])
        expect(v.dimensions).toBe(3)

    })

    it('should throw errors when supplied with null values', () => {

        let arr = [1, 2, 3, null, 5]
        expect(() => createVector(arr)).toThrowError()

    })

    it('should throw errors when supplied with undefined', () => {

        let arr = [1, 2, 3, undefined, 5]
        expect(() => createVector(arr)).toThrowError()

    })

    it('should be able to parse strings, when provided with', () => {

        let arr = ['1', '2', 3, 4, '5.0']
        let r = createVector([1, 2, 3, 4, 5])

        // @ts-ignore
        expect(createVector(arr).equals(r)).toBe(true)

    })

    it('should throw errorrs when provided with invalid strings', () => {

        let arr = [1, 2, 3, 'foo', 4, 5]

        // @ts-ignore
        expect(() => createVector(arr)).toThrowError()

    })

    it('should throw errors when supplied with non-number values', () => {

        let arr = [1, 2, new Array(), 4, 5]
        // @ts-ignore
        expect(() => createVector(arr)).toThrowError()

    })

})

describe('Vector access', () => {

    let v = createVector([1, 2, 3])

    it('should enable component access', () => {

        expect(v.get(1)).toBe(2)

    })

    it('should throw an error when provided with a negative index', () => {

        expect(() => v.get(-1)).toThrowError()

    })

    it('should return null when provided with an out of range index', () => {

        expect(v.get(3)).toBeNull()

    })

    it('should throw an error when provided with a null index', () => {

        expect(() => v.get(null)).toThrowError()

    })

    it('should throw an error when provided with an undefined index', () => {

        expect(() => v.get(undefined)).toThrowError()

    })

    it('should throw an error when provided with a decimal index', () => {

        expect(() => v.get(1.1)).toThrowError()

    })

})

describe('Vector component push', () => {

    let a = createVector([1, 2, 3])
    let index = a.push(4)

    it('should throw an error when provided with a null or undefined component', () => {

        expect(() => a.push(null)).toThrowError()
        expect(() => a.push(undefined)).toThrowError()

    })

    it('should update vector cardinality', () => {

        expect(a.dimensions).toBe(4)

    })

    it('should perform component push', () => {

        expect(a.get(3)).toBe(4)

    })

})

describe('Vector component removal', () => {

    let a = createVector([1, 2, 3])
    let old = a.remove(2)

    it('should throw an error when provided with a negative index', () => {

        expect(() => a.remove(-1)).toThrowError()

    })

    it('should return null when provided with an out of range index', () => {

        expect(a.remove(3)).toBeNull()

    })

    it('should throw an error when provided with a null, decimal or undefined index', () => {

        expect(() => a.remove(null)).toThrowError()
        expect(() => a.remove(undefined)).toThrowError()
        expect(() => a.remove(1.1)).toThrowError()

    })

    it('should perform component removal', () => {

        expect(a.get(2)).toBeNull()

    })

    it('should update vector cardinality', () => {

        expect(a.dimensions).toBe(2)

    })

    it('should return old component value', () => {

        expect(old).toBe(3)

    })

})

describe('Vector component clearing', () => {

    let a = createVector([1, 2, 3])
    a.clear()

    it('should update cardinality', () => {

        expect(a.dimensions).toBe(0)

    })

    it('should perform clearing', () => {

        expect(a.get(0)).toBeNull()

    })

    it('should return empty vector', () => {

        expect(a.dimensions).toBe(0)

    })

})

let a = createVector([1, 2, 3])
let b = createVector([4, 5, 6])

describe('Vector operations', () => {

    it('should throw errors when provided with null or undefined values', () => {

        expect(() => a.add(null)).toThrowError()
        expect(() => a.add(undefined)).toThrowError()

        expect(() => a.sub(null)).toThrowError()
        expect(() => a.sub(undefined)).toThrowError()

        expect(() => a.mul(null)).toThrowError()
        expect(() => a.mul(undefined)).toThrowError()

        expect(() => a.div(null)).toThrowError()
        expect(() => a.div(undefined)).toThrowError()

    })

    it('should throw errors when provided with vectors with different cardinalities', () => {

        let d = createVector([1, 2, 3])
        let e = createVector([1, 2])

        expect(() => d.add(e)).toThrowError()
        expect(() => d.sub(e)).toThrowError()
        expect(() => d.mul(e)).toThrowError()
        expect(() => d.div(e)).toThrowError()

    })

})

describe('Vector addition', () => {

    it('should perform vector addition', () => {

        let c = createVector([5, 7, 9])
        expect(a.add(b).equals(c)).toBeTruthy()

    })

})

describe('Vector substraction', () => {

    it('should perform vector substraction', () => {

        let c = createVector([-3, -3, -3])
        expect(a.sub(b).equals(c)).toBe(true)

    })

})

describe('Vector multiplication', () => {

    it('should perform vector multiplication', () => {

        let c = createVector([4, 10, 18])
        expect(a.mul(b).equals(c)).toBe(true)

    })

})

describe('Vector division', () => {

    it('should perform vector division', () => {

        let c = createVector([(1 / 4), (2 / 5), (1 / 2)])
        expect(a.div(b).equals(c)).toBe(true)

    })

    it('should throw an error when provided with null divisors', () => {

        let d = createVector([0, 1, 2])
        expect(() => a.div(d)).toThrowError()

    })

})

describe('Vector length', () => {

    it('should perform length calculation', () => {

        expect(a.length()).toBe(3.7416573867739413)

    })

    it('should throw an error when vector has cardinality 0', () => {

        let v = createVector([])
        expect(() => v.length()).toThrowError()

    })

})

describe('Vector string representation', () => {

    let a = createVector([1, 2, 3])
    let b = createVector([])

    it('should return a string representation of the vector', () => {

        a.toString()

    })

    it('should support empty vectors', () => {

        b.toString()

    })

})

describe('Vector equality', () => {

    let a = createVector([1, 2, 3])
    let b = createVector([1, 2, 3])
    let c = createVector([1, 2, 3, 4])
    let d = createVector([1, 3, 2])

    it('should perform equality check', () => {

        expect(a.equals(b)).toBe(true)
        expect(a.equals(d)).toBe(false)

    })

    it('should return false when provided with vectors with differents cardinalities', () => {

        expect(a.equals(c)).toBe(false)

    })

})
