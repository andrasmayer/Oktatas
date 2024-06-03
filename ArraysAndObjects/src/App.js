const {myObject} = await import(`./Components/data.js${app_version}`)
const {filterTable} = await import(`./Components/filterTable.js${app_version}`)
const {filterEvents} = await import(`./Components/events.js${app_version}`)

export class App {
    constructor(tableID){
        this.tableID = tableID
        this.myObject = myObject
        this.filterOptions = {name:"", age:"", gender:""}
        this.filteredArray = []
    }
    init(){ return filterTable(this.tableID) }
    events(){ 
        this.filterEvents = filterEvents(this)
     }
    render(source){
        this.tbody.innerHTML = ""
        source.forEach(itm=>{
            this.tbody.innerHTML += `
                <tr>
                    <td>${itm.name}</td>
                    <td>${itm.age}</td>
                    <td>${itm.gender}</td>
                </tr>
                `
        })
    }

}