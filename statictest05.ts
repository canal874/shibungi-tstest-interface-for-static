/** 
* Copyright (c) Hidekazu Kubota 
* This source code is licensed under the Mozilla Public License Version 2.0 found in the LICENSE file in the root directory of this source tree.
*/
/* Tested with tsc 3.8.3 with strict compiler options */

export {}

/**
 * Interfaces for static side and instance side of a class (5)
 * 
 * Using namespace and declaration merging
 * https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-namespaces-with-classes-functions-and-enums
 * 
 */

interface CalcInterface05 {
    x: number;
    mul(y: number): void;
}
namespace CalcInterface05 {
    // A static method is implemented in namespace.
    export function meter2yard(m: number){
        console.log(m / 0.9144);
    }
}

class Calc05 implements CalcInterface05{
    // static side
    constructor(_x: number) { this.x = _x; }

    // instance side
    x: number;
    mul(y: number) {
        console.log(this.x * y);
    }
}

const myCalc05 = new Calc05(3);
const yourCalc05 = new Calc05(5);

console.log(myCalc05.x); // 3
console.log(yourCalc05.x); // 5

myCalc05.mul(7); // 21
yourCalc05.mul(7); // 35

CalcInterface05.meter2yard(7); // 7.655293088363955
