export class Question {
    selected: number;

    constructor (
        public id:number, 
        public question:string,
        public choices:string[],
        public correct:number
        ) {}
}