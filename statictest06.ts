/** 
* Copyright (c) Hidekazu Kubota 
* This source code is licensed under the Mozilla Public License Version 2.0 found in the LICENSE file in the root directory of this source tree.
*/
/* Tested with tsc 3.8.3 with strict compiler options */

export {}

/**
 * Interfaces for static side and instance side of a class (6)
 * 
 * Using abstract class, namespace and declaration merging.
 * (Not using interface)
 * https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-namespaces-with-classes-functions-and-enums
 * https://www.typescriptlang.org/docs/handbook/declaration-files/deep-dive.html#adding-using-a-namespace
 * 
 */

abstract class AbstractCalc06 {
    abstract x: number;
    abstract mul(y: number): void;
}
namespace AbstractCalc06 {
    // A static method is implemented in namespace.    
    export function meter2yard(m: number){
        console.log(m / 0.9144);
    }
}

class Calc06 extends AbstractCalc06{
    // static side
    constructor(_x: number) { super(); this.x = _x; }

    // instance side
    x: number;
    mul(y: number) {
        console.log(this.x * y);
    }
}

const myCalc06 = new Calc06(3);
const yourCalc06 = new Calc06(5);

console.log(myCalc06.x); // 3
console.log(yourCalc06.x); // 5

myCalc06.mul(7); // 21
yourCalc06.mul(7); // 35

Calc06.meter2yard(7); // 7.655293088363955
