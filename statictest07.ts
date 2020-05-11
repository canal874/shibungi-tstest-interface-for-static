/** 
* Copyright (c) Hidekazu Kubota 
* This source code is licensed under the Mozilla Public License Version 2.0 found in the LICENSE file in the root directory of this source tree.
*/
/* Tested with tsc 3.8.3 with strict compiler options */

export {}

/**
 * Interfaces for both static side and instance side of a class (7)
 * 
 * Using class decorator
 * 
 */

interface CalcInterface07 {
    x: number;
    mul(y: number): void;
}

interface CalcInterfaceStatic07{
    new (_x: number): CalcInterface07;
    mul_static(y: number): void;
}

/**
 * @bindStaticAndInstance() is a 'class decorator'.
 * Set the compiler option experimentalDecorators to true in tsconfig.json
 * to use class decorator. 
 * https://www.typescriptlang.org/docs/handbook/decorators.html
 * NOTE: Decorator metadata is an experimental feature and may introduce breaking changes in future releases.
 */
function bindStaticAndInstance(_ctor: CalcInterfaceStatic07) {
    // This class decorator do nothing but check type of constructor.
}
@bindStaticAndInstance  // This statement declares implementation of both normal interface and static interface
class Calc07 {
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

const myCalc07 = new Calc07(3);
const yourCalc07 = new Calc07(5);

console.log(myCalc07.x); // 3
console.log(yourCalc07.x); // 5

myCalc07.mul(7); // 21
yourCalc07.mul(7); // 35

Calc07.mul_static(7); // 700
