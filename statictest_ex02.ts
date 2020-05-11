interface JsonSerializableStatic2{
    new (id:number, name:string): JsonSerializable2;
    fromJson(json: string): JsonSerializable2;
}

interface JsonSerializable2 {
    toJson: () => string;
}

class A2 implements JsonSerializable2 {
    constructor(readonly id: number, readonly name: string) { }
    toJson() { return JSON.stringify(this); }

    static fromJson(json: string): A2 {
        const obj = JSON.parse(json);
        return new A2(obj.id, obj.name);
    }

}

function createA2(ctor: JsonSerializableStatic2, id: number, name:string): JsonSerializable2{
    return new ctor(id, name);
}

const a2 = createA2(A2, 1, 'Charlize');

const json2 = a2.toJson();

const y2 = A2.fromJson(json2);
console.info(a2, json2, y2);

/** 
 * a2.constructor() and A2.prototype.constructor cause compile error 
 * because constructor is not defined in 'interface JsonSerializable2'.
 */
//console.info(new a2.constructor(1, 'Theron'));
//const m2 = new A2.prototype.constructor(1, 'Charlize Theron');
//console.info(m2);