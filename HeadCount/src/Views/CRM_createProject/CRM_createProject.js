const {Ajax} = await import(`../../Hooks/Ajax/Ajax.js${app_version}`)
export class CRM_createProject{
    constructor(props){
        this.props = props
    }
    init(){
        return `
        <div class="d-flex justify-content-center">
            <div class="col-12 col-lg-4 border mt-4 bg-light">
                <div class="p-5 pb-2 pt-2">
                    <h2 class="text-center">Project id</h2>
                    <input class="form-control pid" placeholder="Project id">
                </div>
                <div class="p-5 pb-2 pt-2">
                    <h2 class="text-center">CO3 id</h2>
                    <input class="form-control co3id" type="number" placeholder="CO3 id">
                </div>
                <div class="p-5 pb-2 pt-2">
                    <h2 class="text-center">Megjegyzés</h2>
                    <textarea class="form-control description" placeholder="Megjegyzés"></textarea>
                </div>
                <div class="p-5 pb-2 pt-2 text-center">
                    <button class="btn btn-success save">Létrehoz</button>
                </div>
                <div class="p-5 pb-2 pt-2 text-center msg"></div>
            </div>
        </div>`
    }
    events(){
        const pid = document.querySelector(".pid")
        const co3id = document.querySelector(".co3id")
        const description = document.querySelector(".description")
        const save = document.querySelector(".save")
        const msg = document.querySelector(".msg")
        save.addEventListener("click",()=>{
            const data = {pid:pid.value, co3id:co3id.value, description:description.value }
            let errors = ""
            if(data.pid.length == 0){   errors += "<div>Nem adtál meg <b>Project id-t</b></div>" }
            if(data.co3id.length == 0){   errors += "<div>Nem adtál meg <b>Co3 id-t</b></div>" }
            msg.innerHTML = errors.length != 0 ? 
                `<div class="text-danger">${errors}</div>` 
                : 
                `<div class="text-success">${errors}</div>`
            if(errors.length == 0){
               const res = Ajax({
                    url:"./server/Procedures/Fetch.php",
                    method:"post",
                    response:"json",
                    data:{mode:"fetch",procedure:"crm_create_project",
                        parameters:`'${data.pid}','${data.co3id}','${data.description}'`}
                })

                const message = res.pid == null ? 
                    `<div class="text-danger">${this.props.lang[res.msg]}</div>` 
                    : 
                    `<a href="#CRM_subprojects?id=${res.pid}" class="text-success">${this.props.lang[res.msg]} </a>`

                msg.innerHTML = message
            }
        })
    }
}