const {buildForm} = await import(`./Components/buildForm.js${app_version}`)
export class CRM_createProject{
    constructor(props){
        this.props = props
        this.Form = {
            projectId : "",
            co3Id:"",
            fieldTasks:[],
            labTasks:[]
        }
    }
    init(){
        return `<div class="handler"></div>`
    }
    events(){
        buildForm(this.Form,"labTasks")
    }
}