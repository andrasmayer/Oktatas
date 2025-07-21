const {Ajax} = await import(`../../Hooks/Ajax/Ajax.js${app_version}`)
const {$_GET} = await import(`../../Hooks/$_GET/$_GET.js${app_version}`)
const {Template} = await import(`./Components/Template.js${app_version}`)
const {modal, Categories} = await import(`./Components/modal.js${app_version}`)
const {Toast} = await import(`../HrAdmin/Components/searchEmp/Components/events.js${app_version}`)
export class CRM_subprojects{
    constructor(props){
        this.template = Template
        this.props = props
        this.projectId = null
        this.subProjectId = null
        this.user = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetch",procedure:"userToken",parameters:`'${this.props.authToken.jwt}'`}
        }).id
        this.core = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetch",procedure:"crm_project_core",
                parameters:`'${$_GET().id}',''`}
        })
    }
    init(){
        return modal    
    }
    listSubProjects(){
        const subProjects = document.querySelector(".subProjects")
        const msg = document.querySelector(".msg")
        subProjects.innerHTML = ""
        this.data = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetchAll",procedure:"crm_subproject_details",
            parameters:`'${$_GET().id}'`}
        })
        if(this.data.length == 0){
            msg.innerHTML = "Még nincsenek adatok"
        }
        else{
            msg.innerHTML = ""
            this.data.forEach( (itm,key)=>{
                this.data[key].details = JSON.parse(this.data[key].details)
                subProjects.innerHTML += `
                    <tr data-id="${key}" data-bs-toggle="modal" data-bs-target="#modal">
                        <td>${itm.subProjectName}</td>
                        <td>${itm.created}</td>
                    </tr>`
            })
        }
        this.clickEvents()
    }
    showModal(itm){
        const modal_header = document.querySelector(".modal-title")
        const modal_body = document.querySelector(".modal-body")
        const jobs = document.querySelector(".jobs")
        this.selectedLocation = itm.querySelectorAll("td")[0].textContent
        const index = itm.getAttribute("data-id")
        this.selectedIndex = index
        const data = this.data[index]

        this.subProjectId = data.id
        

        if(  typeof this.data[index].details == "string" ){
            data.details = JSON.parse(this.data[index].details)
        }
        modal_header.innerHTML = `<h2>${data.subProjectName}</h2>`
        let context = ""
        this.modalEvents(data,index)
        data.details.tasks.forEach(task=>{
            context += `
                <div class="p-2 border-bottom">
                    <label>${Categories[task]}</label>
                    <div class="float-end">
                        <input class="bg-light taskValue" style="border:none;" type="number" task-id="${task}" row-id="${index}" value="${data.details.status[task]}">
                        <button class="btn btn-outline-danger fa fa-trash removeTask" task-id="${task}" row-id="${index}"></button>
                    </div>
                </div>`
        })
        jobs.innerHTML = context
        const taskValue = document.querySelectorAll(".taskValue")
        taskValue.forEach(itm=>{
            itm.addEventListener("keyup",(e)=>{
                if(e.keyCode == 13){
                    const taskId = itm.getAttribute("task-id")
                    const rowId = itm.getAttribute("row-id")
                    if( typeof this.data[rowId].details == "string"){
                        this.data[rowId].details = JSON.parse(this.data[rowId].details)
                    }
                    this.data[rowId].details.status[taskId] = itm.value
                    this.updateDetails(this.data[rowId].id, this.data[rowId].details)
                    Toast({header:`<label>Siker</label>`, time:"",body:"Módosítás sikeres"})
                    this.listSubProjects()
                }
            })
        })
        const removeTask = document.querySelectorAll(".removeTask")
        removeTask.forEach(itm=>{
            itm.addEventListener("click",()=>{
                const parent = itm.parentNode.parentNode
                const taskId = itm.getAttribute("task-id")
                const rowId = itm.getAttribute("row-id")
                const indexToDelete = this.data[rowId].details.tasks.indexOf(taskId)
                if( typeof this.data[rowId].details == "string"){
                    this.data[rowId].details = JSON.parse(this.data[rowId].details)
                }
                this.data[rowId].details.tasks.splice(indexToDelete, 1)
                delete this.data[rowId].details.status[taskId]
                if( typeof this.data[rowId].details == "string"){
                    this.data[rowId].details = JSON.parse(this.data[rowId].details)
                }
                parent.remove()
                this.updateDetails(this.data[rowId].id, this.data[rowId].details)
                Toast({header:`<label>Siker</label>`, time:"",body:"Feladat eltávolítása sikeres"})
                this.listSubProjects()
            })
        })
    }
    clickEvents(){
        const subProjects = document.querySelector(".subProjects")
        const rows = subProjects.querySelectorAll("tr")
        rows.forEach((itm)=>{
            itm.addEventListener("click",()=>{
                this.showModal(itm)
            })
        })
    }
    modalEvents = (data,index) =>{
        const subProjects = document.querySelector(".subProjects")
        const rows = subProjects.querySelectorAll("tr")
        const modalMsg  = document.querySelector(".modalMsg")
        modalMsg.textContent = ""

        const newOption = document.querySelectorAll(".newOption")
        newOption.forEach(itm=>{
            itm.addEventListener("click",()=>{
                const jobiId = itm.getAttribute("data-value")
                if( data.details.tasks.includes(jobiId) ){
                    modalMsg.textContent = "Már benne van"
                }
                else{
                    data.details.tasks.push(jobiId)
                    data.details.status[jobiId] = 0
                    this.data[index] = data   
                    this.updateDetails(data.id, data.details)
                    Toast({header:`<label>Siker</label>`, time:"",body:"Feladat létrehozva"})
                    this.listSubProjects()
                    this.showModal(rows[index])
                }
            })
        })
    }
    updateDetails(id,details){
        Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            data:{mode:"fetchAll",procedure:"crm_subproject_details_update",
                parameters:`'${id}','${JSON.stringify(details)}'`}
        })
    }
    events(){
        document.querySelector(".pName").textContent = this.core.project
        const msg = document.querySelector(".msg")
        const newSubProject = document.querySelector(".newSubProject")
        const save = document.querySelector(".save")
        save.addEventListener("click",()=>{
            if(newSubProject.value.length < 5){
                msg.innerHTML = `<div class="text-danger">Lokáció neve túl rövid (minimum 5 karakter)</div>`
            }
            else{
                msg.innerHTML = ""
                
                const res = Ajax({
                    url:"./server/Procedures/Fetch.php",
                    method:"post",
                    response:"json",
                    data:{mode:"fetchColumn",procedure:"crm_create_subproject",
                        parameters:`'${$_GET().id}','${newSubProject.value}','${this.user}','${JSON.stringify(this.template)}'`}
                })
                newSubProject.value = ""
                newSubProject.focus()

                if(res == 0){
                    this.listSubProjects()
                    Toast({header:`<label>Siker</label>`, time:"",body:"Alproject létrehozása sikeres"})
                }
                else{
                    msg.innerHTML = `<div class="text-danger">Ez a lokáció már létezik</div>`
                }
            }
        })
        this.listSubProjects()


        const redirectToDetails = document.querySelector(".redirectToDetails")
        redirectToDetails.addEventListener("click",(e)=>{
            window.open(`#CRM_details?pid=${$_GET().id}&id=${this.subProjectId}`)
        })

    }    
}