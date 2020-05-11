/** 
* Copyright (c) Hidekazu Kubota 
* This source code is licensed under the Mozilla Public License Version 2.0 found in the LICENSE file in the root directory of this source tree.
*/
/* Tested with tsc 3.8.3 with strict compiler options */

export {}

/**
 * Interfaces for both static side and instance side of a class (4)
 * 
 * Using abstract class
 * 
 */

interface CalcInterface04 {
    x: number;
    mul(y: number): void;
}

abstract class AbstractCalcStatic{
    public static mul_static(y: number){
        console.log(100 * y);
    }
}

class Calc04 extends AbstractCalcStatic implements CalcInterface04{
    // static side
    constructor(_x: number) { super(); this.x = _x; }

    // instance side
    x: number;
    mul(y: number) {
        console.log(this.x * y);
    }
}

const myCalc04 = new Calc04(3);
const yourCalc04 = new Calc04(5);

console.log(myCalc04.x); // 3
console.log(yourCalc04.x); // 5

myCalc04.mul(7); // 21
yourCalc04.mul(7); // 35

Calc04.mul_static(7); // 700
