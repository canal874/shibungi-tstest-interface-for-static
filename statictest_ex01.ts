/**
 * This is revised version of the original code https://github.com/Microsoft/TypeScript/issues/13462#issuecomment-272669082
 * The original code does not work expected. 
 */
export {}

interface JsonSerializableStatic<C extends new (...args: any[]) => JsonSerializable<C>> {
    new (id:number, name:string): JsonSerializable<C>;
    fromJson(json: string): JsonSerializable<C>;
}

interface JsonSerializable<C extends new (...args: any[]) => any> {
    toJson: () => string;
    constructor: C; // NOTE: a property named constructor will not work. https://stackoverflow.com/a/46977622
}

interface A extends JsonSerializable<typeof A>{}
class A implements JsonSerializable<typeof A> {
    constructor(readonly id: number, readonly name: string) { }
    toJson() { return JSON.stringify(this); }

    static fromJson(json: string): A {
        const obj = JSON.parse(json);
        return new A(obj.id, obj.name);
    }

}

function createA(ctor: JsonSerializableStatic<typeof A>, id: number, name:string): JsonSerializable<typeof A>{
    return new ctor(id, name);
}

const a = createA(A, 1, 'Charlize');

const json = a.toJson();

const y = A.fromJson(json);
console.info(a, json, y);
console.info(new a.constructor(1, 'Theron'));
const m = new A.prototype.constructor(1, 'Charlize Theron');
console.info(m);