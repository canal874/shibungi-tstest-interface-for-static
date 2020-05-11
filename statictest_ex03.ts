interface JsonSerializableStatic3{
    new (id:number, name:string): JsonSerializable3;
    fromJson(json: string): JsonSerializable3;
}

interface JsonSerializable3 {
    toJson: () => string;
}

const A3: JsonSerializableStatic3 = class A3 implements JsonSerializable3 {
    constructor(readonly id: number, readonly name: string) { }
    toJson() { return JSON.stringify(this); }

    static fromJson(json: string): A3 {
        const obj = JSON.parse(json);
        return new A3(obj.id, obj.name);
    }

}

const a3 = new A3(1, 'Charlize');

const json3 = a3.toJson();

const y3 = A3.fromJson(json3);
console.info(a3, json3, y3);
