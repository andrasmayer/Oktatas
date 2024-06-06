export class router{
    constructor(path){
        this.path = path
    }
    events(){
        let route = location.hash

        if( this.path[route] == null){
            route = "#error404"
        }
        const activeRoute = new this.path[route].page()
        content.innerHTML = activeRoute.init()
        //return  activeRoute.events
        activeRoute.events()
    }
}