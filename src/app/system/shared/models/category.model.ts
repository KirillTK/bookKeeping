export class Category{

    public name: string;
    public capacity: number;
    public id?: string;

    constructor(name:string, capacity: number, id?:string){
        this.name = name;
        this.capacity = capacity;
        this.id = id;
    }

    getData(): object {
        const result = {};
        Object.keys(this).map(key => result[key] = this[key]);
        return result;
    }
}