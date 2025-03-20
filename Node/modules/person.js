export default class Person {
    constructor(name) {
        this.name = name;
    }
    sayHello() {
        return `Hello, I am ${this.name}`;
    }
}
export const greet = (name) => `Hi, ${name}!`;
