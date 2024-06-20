export class router{
    constructor(path,lang){
        this.path = path
        this.lang = lang
    }
    events(){
        let route = location.hash
        if( ["","#"].includes(route) ){ route = "#home" }
        else if( this.path[route] == null){
            route = "#error404"
        }

        const activeRoute = new this.path[route].page()
        content.innerHTML = activeRoute.init( this.lang.path[route] )
        activeRoute.events()
    }
}