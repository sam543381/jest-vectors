import VectorImpl from './VectorImpl';

let constructor = null

/**
 * Sets the vector implementation
 * @param constructor The constructor implementation
 */
export function setImplementation(c) {
    constructor = c
}

/**
 * Creates a new vector
 * @param args The vector constructor arguments
 * @throws An error if no valid implementation has been provided so far
 */
export function createVector(args: Array<number|string>): Vector {

    if (constructor === null) throw Error('No valid implementation currently avaible')

    return new constructor(args)
}

export function init() {
    constructor = VectorImpl
}

init()



/**
 * A Vector based on the mathematical model
 */
export default interface Vector {



    /* Public variables */

    /**
     * The vector dimension aka. vector cardinality or parameters length
     */
    dimensions: number



    /* Vector component management */

    /**
     * Retreives a component based on its index
     * @param i The index of the component to be retreived
     * @returns The component value or null if the index is out of range
     * @throws An error when provided with a negative, decimal, undefined or null index
     */
    get(i: number): number

    /**
     * Pushes a component into the vector
     * @param o The component to be pushed
     * @returns The newly-pushed component index
     * @throws An error when provided with a null or undefined component
     */
    push(o: number): number

    /**
     * Remove a component from the vector based on its index
     * @param i The index of the component to be removed
     * @returns The removed component value or null if i is out of range
     * @throws An error when provided with a negative, decimal, undefined or null index
     */
    remove(i: number): number

    /**
     * Removes all the content of the vector
     * @returns The modified vector
     */
    clear(): Vector



    /* Vector operations */

    /**
     * Add operation
     * @param v The vector to be added
     * @returns The operation result
     */
    add(v: Vector): Vector

    /**
     * Substraction operation
     * @param v The vector to be substracted
     * @returns The operation result
     */
    sub(v: Vector): Vector
    /**
     * Multiplication operation
     * @param v The vector to be multiplied by
     * @returns The operation result
     */
    mul(v: Vector): Vector
    /**
     * Division operation
     * @param v The vector to be divided by
     * @returns The operation result
     */
    div(v: Vector): Vector
    /**
     * Computes the vector (geometrical) length
     * @returns The vector length
     */
    length(): number

    /**
     * Converts the vector to a string
     * @returns A string representation of the vector
     */
    toString(): string

    /**
     * Checks whether two vectors are equal
     * @param a The vector to be checked against
     * @returns Whether the two vectors are equal
     */
    equals(a: Vector): boolean

}
