// let currentId = Math.floor(Math.random()*1000)

class GenerateKey {
    id: number
    constructor() {
        this.id = Math.floor(Math.random()*1000)
    }
    generateId() {
        this.id++
        return this.id;
    }
}

export const generateKey = new GenerateKey()

