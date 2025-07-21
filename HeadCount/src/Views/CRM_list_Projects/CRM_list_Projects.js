const {Ajax} = await import(`../../Hooks/Ajax/Ajax.js${app_version}`)

export class CRM_list_Projects{
    constructor(props){
        this.props = props
        this.pid = ""
    }
    init(){
        return `
        <div class="p-2">
            <div class="h3 text-center" >Projectek</div>
            <input class="pid" placeholder="Project ID">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>CO3 ID</th>
                        <th>Megjegyzés</th>
                        <th>Létrehozva</th>
                    </tr>
                <thead>
                <tbody class="projects"></tbody>
            </table>
        
        </div>
        `
        
    }
    clickEvents(){
        const projects = document.querySelector(".projects")
        const rows = projects.querySelectorAll(".id")
        rows.forEach(itm=>{
            itm.addEventListener("click",()=>{
                //window.open(`#CRM_details?pid=${itm.getAttribute("data-id")}`)
                window.open(`#CRM_subprojects?id=${itm.getAttribute("data-id")}`)
            })
        })
    }
    searchProject(data){
        const projects = document.querySelector(".projects")
        projects.innerHTML = ""
        const res = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetchAll",procedure:"crm_list_projects",
                parameters:`'${this.pid}'`}
        })
        console.log(res)
        res.forEach(itm=>{
            console.log(itm)
            projects.innerHTML += `
                <tr>
                    <td class="id" data-id="${itm.did}">${itm.id}</td>
                    <td><a target="co3" href="https://sb.co3app.com/salisbury/?f=4&do=4&id=${itm.co3id}">${itm.co3id}</a></td>
                    <td>${itm.details}</td>
                    <td>${itm.created}</td>
                </tr>`
        })
        this.clickEvents(projects)
    }

    events(){
        const pid = document.querySelector(".pid")
        pid.addEventListener("keyup",()=>{
            console.log(pid.value)
            this.pid = pid.value
            this.searchProject()
        })


        this.searchProject()
      

    }
}