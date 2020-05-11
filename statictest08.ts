/** 
* Copyright (c) Hidekazu Kubota 
* This source code is licensed under the Mozilla Public License Version 2.0 found in the LICENSE file in the root directory of this source tree.
*/
/* Tested with tsc 3.8.3 with strict compiler options */

export {}

/**
 * Interfaces for both static side and instance side of a class (8)
 * 
 * Using class decorator with type parameter
 * https://github.com/Microsoft/TypeScript/issues/13462#issuecomment-295685298
 *  
 */

// Type of construct signature
interface Type<T> {
    new (...args: any[]): T;
}

interface CalcInterface08 {
    x: number;
    mul(y: number): void;
}

// Static construct signature 'new (_x: number): CalcInterface08' is put out to interface Type<T>.
// Relation between static side and instance side is clealy described by using 'extends',
// but a little redundant.
interface CalcInterfaceStatic08 extends Type<CalcInterface08>{
    mul_static(y: number): void;
}


/**
 * @bindStaticAndInstance<T extends new (...args: any[]) => void>() 
 * is a facrtory function of 'class decorator'.
 * Set the compiler option experimentalDecorators to true in tsconfig.json
 * to use class decorator.
 * 
 * <T extends new (...args: any[]) => void> should be used instead of <T>
 */
function bindStaticAndInstance<T extends new (...args: any[]) => any>(): (c: T) => void {
    return (_ctor: T): void => {};
}
/* 
// Appendix (1)
// Compiler passes, but this cannot check the lack of the declaration of 'new (...args: any[]): T;' in interface Type<T>.
function bindStaticAndInstance<T>() {
    return (_ctor: T): void => {}
}

// Appendix (2) 
// See https://github.com/microsoft/TypeScript/issues/14600#issuecomment-488817980
// This is an alternative, but requires a little inference.
// The inference is that construct signature that returns non-void type is assinable to the construct signature that returns void type.
// See https://canal874.github.io/typescript/2020/04/30/type-compatibility-of-function.html
function bindStaticAndInstance<T extends new (...args: Array<unknown>) => void>(): (c: T) => void {
    return (_ctor: T): void => {};
}

// Appendix (3)
// Stricter notation, but a little redundant.
function bindStaticAndInstance<U, T extends new (...args: any[]) => U>(): (c: T) => void {
    return (_ctor: T): void => {};
}
@bindStaticAndInstance<CalcInterface08, CalcInterfaceStatic08>()
*/

@bindStaticAndInstance<CalcInterfaceStatic08>()
class Calc08 {
    // static side
    constructor(_x: number) { this.x = _x; }
    public static mul_static(y: number){
        console.log(100 * y);
    }

    // instance side
    x: number;
    mul(y: number) {
        console.log(this.x * y);
    }
}

const myCalc08 = new Calc08(3);
const yourCalc08 = new Calc08(5);

console.log(myCalc08.x); // 3
console.log(yourCalc08.x); // 5

myCalc08.mul(7); // 21
yourCalc08.mul(7); // 35

Calc08.mul_static(7); // 700
