const {Card,CardEvents} = await import(`./Components/Card/Card.js${app_version}`)
export class TableHandler{
    constructor(){}
    init(list){
        this.list = list
        let context = ``
        this.list.forEach(itm => {
            context += Card(itm)
        })
        return context
    }
    events(){
        CardEvents()
    }
}