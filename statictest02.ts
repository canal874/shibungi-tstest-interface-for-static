/** 
* Copyright (c) Hidekazu Kubota 
* This source code is licensed under the Mozilla Public License Version 2.0 found in the LICENSE file in the root directory of this source tree.
*/
/* Tested with tsc 3.8.3 with strict compiler options */

export {}

/**
 * Interfaces for both static side and instance side of a class (2)
 * 
 * Using class expression
 * 
 */

// This is a static side.
interface CalcInterfaceStatic02 {
    new (_x: number): CalcInterface02;
    mul_static(y: number): void;
}

// This is a instance side.
interface CalcInterface02 {
    x: number;
    mul(y: number): void;
}

// Using class expressions is concise.
// (Class expressions: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-6.html#class-expressions)
// Compiler tries to assign class definition to CalcInterface2 interface,
// and then it tries to assign structure of the class to CalcInterfaceStatic2 interface.
const Calc02: CalcInterfaceStatic02 = class CalcLocalClassName implements CalcInterface02 {
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

const myCalc02 = new Calc02(3);
const yourCalc02 = new Calc02(5);

console.log(myCalc02.x); // 3
console.log(yourCalc02.x); // 5

myCalc02.mul(7); // 21
yourCalc02.mul(7); // 35

Calc02.mul_static(7); // 700
