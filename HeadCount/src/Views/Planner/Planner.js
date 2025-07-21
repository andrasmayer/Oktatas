const {Api} = await import(`./Components/Api.js${app_version}`)
//const {YearlyCalendar} = await import(`../../Hooks/YearlyCalendar/YearlyCalendar/YearlyCalendar.js${app_version}`)
export class Planner{
    constructor(props){
        this.props = props
    }
    init(){
        this.API = new Api( this.props)
        return `
        <div>
            ${this.API.init()}
        </div>`
    }
    events(){
        this.API.events()
    }
}