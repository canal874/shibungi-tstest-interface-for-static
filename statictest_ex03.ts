/**
 * Original source of https://github.com/Microsoft/TypeScript/issues/13462#issuecomment-272669082
 */
export {}

interface JsonSerializableStatic<C extends new (...args: any[]) => JsonSerializable<C>> {
    fromJson(json: string): JsonSerializable<C>;
}

interface JsonSerializable<C extends new (...args: any[]) => any> {
    toJson: () => string;
    constructor: C;
}

interface A extends JsonSerializable<typeof A> { }
class A implements JsonSerializable<typeof A> {

    constructor(readonly id: number, readonly name: string) { }
    toJson() { return JSON.stringify(this); }

    static fromJson(json: string): A {
        const obj = JSON.parse(json);
        return new A(obj.id, obj.name);
    }
}

const a = new A(1, 'Charlize');
