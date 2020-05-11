/** 
* Copyright (c) Hidekazu Kubota 
* This source code is licensed under the Mozilla Public License Version 2.0 found in the LICENSE file in the root directory of this source tree.
*/
/* Tested with tsc 3.8.3 with strict compiler options */

export {}

/**
 * Interfaces for both static side and instance side of a class (3)
 * 
 * Using class expression (alternative notation)
 * 
 */

// This is a static side.
interface CalcInterfaceStatic03 {
    new (_x: number): CalcInterface03;
    mul_static(y: number): void;
}

// This is a instance side.
interface CalcInterface03 {
    x: number;
    mul(y: number): void;
}

class Calc03 implements CalcInterface03 {
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

/**
 * https://github.com/Microsoft/TypeScript/issues/13462#issuecomment-275860898
 * is almost the same as  https://www.typescriptlang.org/docs/handbook/interfaces.html#class-types
 * const Clock: ClockConstructor = class Clock implements ClockInterface {}
 */
const __implStaticInstance: CalcInterfaceStatic03 = Calc03;

const myCalc03 = new Calc03(3);
const yourCalc03 = new Calc03(5);

console.log(myCalc03.x); // 3
console.log(yourCalc03.x); // 5

myCalc03.mul(7); // 21
yourCalc03.mul(7); // 35

Calc03.mul_static(7); // 700
