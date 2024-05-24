const {list} = await import(`./Components/data.js${app_version}`)
const {tableBuilder} = await import(`./Components/tableBuilder.js${app_version}`)
const {getDetails} = await import(`./Components/getDetails.js${app_version}`)

export class Sample{
    constructor(props){
        this.list = list
        this.getDetails = getDetails
    }
    init(){
        return `<div>${tableBuilder(this.list)}</div>`
    }
    events(){
        const root = document.getElementById("root")
        const user = document.querySelectorAll(".user")
        user.forEach((itm,key)=>{
            itm.addEventListener("click",(event)=>{
                this.getDetails( key)
            })
        })
    }
    
}