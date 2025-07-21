const {getSystemLogs} = await import(`../../Components/getSystemLogs/getSystemLogs.js${app_version}`)


export class SystemLogs{
    constructor(props){
        this.props = props
        this.logs = new getSystemLogs({table:"users", id:1, langCode:props.langCode})
        
    }
    init(){
        return `
            <div>
                <div>getSystemLogs</div>
                <div id="putItHere"></div>
                <div>${ this.logs.css()} </div>
            </div>
            `
    }
    events(){
        this.logs.css()
        this.logs.get()
        this.logs.grid()
    }
}