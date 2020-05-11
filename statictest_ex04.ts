/**
 * Original source of https://github.com/Microsoft/TypeScript/issues/13462#issuecomment-272669082
 * (but changed variable name from A to B)
 */
interface JsonSerializableStatic<C extends new (...args: any[]) => JsonSerializable<C>> {
    fromJson(json: string): JsonSerializable<C>;
}

interface JsonSerializable<C extends new (...args: any[]) => any> {
    toJson: () => string;
    constructor: C;
}

interface B extends JsonSerializable<typeof B> { }
class B implements JsonSerializable<typeof B> {

    constructor(readonly id: number, readonly name: string) { }
    toJson() { return JSON.stringify(this); }

    static fromJson(json: string): B {
        const obj = JSON.parse(json);
        return new B(obj.id, obj.name);
    }
}

const b = new B(1, 'Charlize');
