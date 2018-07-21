export class WFMEvent {

    public type: string;
    public amount: number;
    public category: string;
    public date: string;
    public description: string;
    public id: number;

    constructor(type: string, amount: number, category: string, date: string, description: string, id?: number) {
        this.type = type;
        this.amount = amount;
        this.category = category;
        this.date = date;
        this.description = description;
        if (id) {
            this.id = id;
        }
    }

    getData(): object {
        const result = {};
        Object.keys(this).map(key => result[key] = this[key]);
        return result;
    }
}
