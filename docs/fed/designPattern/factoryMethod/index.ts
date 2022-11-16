abstract class Creator {
    constructor(parameters) {
        
    }
    public abstract factoryMethod():Product
}

interface Product {
    operation():string
}