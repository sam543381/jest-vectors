import Vector, { createVector } from "./Vector";

export default class VectorImpl implements Vector {

    values = new Array<number>()

    constructor(
        private input: Array<number|string>
    ) {
        if (input === null)
            throw Error('Vector constructor cannot be called with null, you may want to use [] in order to create empty vectors')

        if (input.filter(val => val === null || val === undefined).length != 0)
            throw Error('Vector values can not be null or undefined')

        // @ts-ignore
        this.values = input

        this.input
            .forEach((val, index, arr) => {

                if (typeof val !== 'string')
                    return

                // @ts-ignore
                this.values[index] = parseInt(val)
            })

        if (this.values.filter(val => typeof val !== 'number' || isNaN(val)).length != 0)
            throw Error('Vector cannot be constructed from non-number values')

        this.dimensions = this.values.length
    }


    dimensions: number = 0


    get(i: number): number {

        if (i === null || i === undefined)
            throw Error('Index can be neither null nor undefined')

        if (i < 0)
            throw Error('Index should not be negative')

        if (this.dimensions <= i)
            return null

        if (Math.floor(i) != i)
            throw Error('Index should be an integer')

        return this.values[i]
    }

    push(o: number): number {

        if (o === undefined || o === null)
            throw Error('Pushed component cannot be null or undefined')

        ++this.dimensions
        this.values.push(o)

        return this.dimensions - 1
    }

    remove(i: number): number {

        if (i === null || i === undefined)
            throw Error('Index can be neither null nor undefined')

        if (i < 0)
            throw Error('Index should not be negative')

        if (this.dimensions <= i)
            return null

        if (Math.floor(i) != i)
            throw Error('Index should be an integer')

        let a = this.values
        --this.dimensions
        let old = this.values.splice(i, 1)

        return old[0]
    }

    clear(): Vector {

        this.dimensions = 0
        this.values.splice(0, this.values.length)

        return this

    }

    add(v: Vector): Vector {

        if (v === null || v === undefined)
            throw Error('Input vector cannot be null or undefined')

        if (v.dimensions !== this.dimensions)
            throw Error('Input vector must have same length as current')

        let res = []
        this.values.forEach((val, i) => res.push(val + v.get(i)))

        return createVector(res)
    }

    sub(v: Vector): Vector {

        if (v === null || v === undefined)
            throw Error('Input vector cannot be null or undefined')

        if (v.dimensions !== this.dimensions)
            throw Error('Input vector must have same length as current')

        let res = []
        this.values.forEach((val, i) => res.push(val - v.get(i)))

        return createVector(res)
    }

    mul(v: Vector): Vector {

        if (v === null || v === undefined)
            throw Error('Input vector cannot be null or undefined')

        if (v.dimensions !== this.dimensions)
            throw Error('Input vector must have same length as current')

        let res = []
        this.values.forEach((val, i) => res.push(val * v.get(i)))

        return createVector(res)
    }

    div(v: Vector): Vector {

        if (v === null || v === undefined)
            throw Error('Input vector cannot be null or undefined')

        if (v.dimensions !== this.dimensions)
            throw Error('Input vector must have same length as current')

        let res = []
        this.values.forEach((val, i) => {

            if (v.get(i) == 0)
                throw Error('Division by 0 are forbidden')

            res.push(val / v.get(i))
        })

        return createVector(res)
    }

    length(): number {

        if (this.dimensions === 0)
            throw Error('Cannot compute length on vector with cardinality 0')

        return Math.sqrt(this.values.reduce((acc, val) => acc + Math.pow(val, 2), 0))

    }

    toString(): string {
        return `Vector[${this.dimensions == 0 ? 'Empty' : this.values.join(' ')}]`
    }

    equals(a: Vector): boolean {

        if (a.dimensions !== this.dimensions)
            return false

        let r = true

        this.values.forEach((val, index) => {

            if (a.get(index) !== val)
                r = false

        })

        return r

    }

}