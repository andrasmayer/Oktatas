const {Ajax} = await import(`../../Hooks/Ajax/Ajax.js${app_version}`)
export class TaskManager{
    constructor(props){
        this.props = props
        this.tasks =  Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetchAll",procedure:"list_tasks",parameters:``}
        }) 
        this.header = ["ID","Kategória","Részletek","Felvéve","Határidő","Befejezve","Állapot","Iktatta","Felelős"]
        console.log(this.tasks)
    }
    createHeader(){
        let context = ``
        this.header.forEach(th=>{
            context += `<th>${th}</th>`
        })
        return `<tr>${context}</tr>`
    }
    createBody(){
        let context = ``
        this.tasks.forEach(td=>{
            context += `
            <tr>
                <td>${td.id}</td>
                <td>${td.category}</td>
                <td>${td.description}</td>
                <td>${td.created}</td>
                <td>${td.deadline}</td>
                <td>${td.id}</td>
                <td>${td.id}</td>
                <td>${td.id}</td>
                <td>${td.id}</td>
            </tr>
            `
        })
        return context
    }
    init(){
        
        return  `
        <div>
            <button class="fa fa-plus btn btn-primary newTask" data-bs-toggle="modal" data-bs-target="#newTaskModal"></button>
            <table class="table table-striped">
                <thead class="bg-dark text-light">${this.createHeader()}</thead>
                <tbody>${this.createBody()}</tbody>
            </table>
        
        </div>
        
        <div class="modal fade" id="newTaskModal" tabindex="-1"  aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" >Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>


        `

    }
    events(){}
}