export class Bill{

    constructor(
        public value: number,
        public currency: string
    ){
    }

    getData(): object {
        const result = {};
        Object.keys(this).map(key => result[key] = this[key]);
        return result;
    }
}