/** 
* Copyright (c) Hidekazu Kubota 
* This source code is licensed under the Mozilla Public License Version 2.0 found in the LICENSE file in the root directory of this source tree.
*/
/* Tested with tsc 3.8.3 with strict compiler options */

export {}

/**
 * Interfaces for both static side and instance side of a class (1)
 *
 * Using factory function
 * https://www.typescriptlang.org/docs/handbook/interfaces.html#class-types
 *
 */

// This is a static side.
interface CalcInterfaceStatic {
    new (_x: number): CalcInterface;
    meter2yard(m: number): void;
}

// This is a instance side.
interface CalcInterface {
    x: number;
    mul(y: number): void;
}

// Factory function. 
// The first parameter of createCalc checks that Calc class has correct static members defined in CalcInterfaceStatic.
function createCalc(ctor: CalcInterfaceStatic, x: number): CalcInterface {
    return new ctor(x);
}

// Class
class Calc implements CalcInterface {
    // static side
    constructor(_x: number) { this.x = _x; }
    public static meter2yard(m: number){
        console.log(m / 0.9144);
    }

    // instance side
    x: number;
    mul(y: number) {
        console.log(this.x * y);
    }
}

// Use the factory function to create new instance.
const myCalc = createCalc(Calc, 3);
const yourCalc = createCalc(Calc, 5);

console.log(myCalc.x); // 3
console.log(yourCalc.x); // 5

myCalc.mul(7); // 21
yourCalc.mul(7); // 35

Calc.meter2yard(7); // 7.655293088363955

// 'new' is still allowed to create new instance.
// If you don't like it, use 'private constructor(_x: number) { this.x = _x; }'.
let ourCalc = new Calc(10);
ourCalc.mul(7); // 70
