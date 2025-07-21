export class localStorageHandler  {
    constructor(){
        this.storage = new Proxy(localStorage, {
            set: (target, key, value) => {
                target.setItem(key, value)
                return true
            },
            get: (target, key) => {
                return target.getItem(key)
            },
            deleteProperty: (target, key) => {
                target.removeItem(key)
                return true
            }
        })
        this.setItem = (key, value) =>{
            this.storage[key] = value
        }
        this.getItem = (key) =>{
            return this.storage[key];
        }
        this.removeItem = (key) =>{
            console.log(`${key} removed`)
            if(key == "ratchetUserToken"){
                this.conn.send(JSON.stringify({type:"logOut", userId:JSON.parse(this.getItem("ratchetUserToken")).userId }))
            }
            delete this.storage[key];
        }
    }
}