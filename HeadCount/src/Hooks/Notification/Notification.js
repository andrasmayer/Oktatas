const {Ajax} = await import(`../Ajax/Ajax.js${app_version}`)

export class Notification{
    constructor(){}
    container(props){
        this.resource = props.resource
        this.id = props.id
        this.loggedUser = props.loggedUser


        return `
        <div class="notification" target="${props.id}">
            <div class="notificationControls">
                <button class="btn btn-primary fa fa-plus addNotification"></button>
            </div>
            <div class="notificationContent"></div>
        </div>`
    }
    task(resource){
        return `
            <div class="task rounded mt-4 p-2 bg-secondary text-light" resourceId="${resource.id}">
                <i class="fa fa-trash float-end btn btn-sm btn-danger notificationDelete" role="button"></i>
                <div class="p-2">
                    <label>Részletek</label>
                    <textarea class="notificationDetails form-control">${resource.content == null ? "" : resource.content}</textarea>
                </div>
                <div class="p-2">
                    <label>Kezdés</label>
                    <input type="datetime-local" class="notificationStartAt form-control" value="${resource.scheduleNext}">
                </div>
                <div class="p-2">
                    <label>Ismétlés</label>
                    <select class="notificationInterval form-control">
                        <option value="" ${resource.scheduleInterval == "" && "selected"}>Nincs ismétlés</option>
                        <option value="1 day"${resource.scheduleInterval == "1 day" && "selected"}>Naponta</option>
                        <option value="1 week"${resource.scheduleInterval == "1 week" && "selected"}>Hetente</option>
                        <option value="1 month"${resource.scheduleInterval == "1 month" && "selected"}>Havonta</option>
                    </select>
                </div>                        
            </div>`

    }
    events(){
        const addNotification = document.querySelectorAll(".addNotification")
        addNotification.forEach(itm=>{
            itm.addEventListener("click",()=>{
                const parent = itm.parentNode.parentNode
                const user = parent.parentNode.parentNode.getAttribute("id").split("userAccordion_").join("")
                const notificationContent = parent.querySelector(".notificationContent")
                const record = Ajax({
                            url:"./server/Procedures/Fetch.php",
                            method:"post",
                            response:"json",
                            data:{mode:"fetch",procedure:"notificationCreate",parameters:`'${this.loggedUser}','${user}','${this.resource}','${0}'`}
                        })      
                notificationContent.innerHTML += this.task(record)
                this.formEvents(notificationContent)
                
            })

        })


        //Accordion eventek
        const $this = this    //belső ciklus miatt
        const accordions = document.querySelectorAll('.userNotificationAccordion')
        accordions.forEach((accordion,key) => {
            const collapseElement = accordion.querySelector('.accordion-collapse')
            if (collapseElement) {
                collapseElement.addEventListener('shown.bs.collapse', function () {
                    const parent = this.parentNode.parentNode
                    const user = parent.parentNode.parentNode.parentNode.getAttribute("user-id")
                    const notificationContent = parent.querySelector(".notificationContent")
                    const tasks = notificationContent.querySelectorAll(".task")
                    if(tasks.length == 0){
                        const data = Ajax({
                            url:"./server/Procedures/Fetch.php",
                            method:"post",
                            response:"json",
                            data:{mode:"fetchAll",procedure:"notificationByEmp",parameters:`'${user}'`}
                        })
                        data.forEach(itm=>{
                            notificationContent.innerHTML += $this.task(itm)
                        })
                        $this.formEvents(notificationContent)
                    }
                })
            }
             
        })
      











    }
    formEvents(target){
        
        //Esemény törlése   
        const notificationDelete = target.querySelectorAll(".notificationDelete")
        if(notificationDelete.length >0){

            notificationDelete.forEach(itm=>{
                itm.addEventListener("click",()=>{
                    const parent = itm.parentNode.parentNode
                    const task = itm.parentNode
                    const taskId = task.getAttribute("resourceId")
                    const res = Ajax({
                                url:"./server/Procedures/Fetch.php",
                                method:"post",
                                response:"json",
                                data:{mode:"fetch",procedure:"notificationEmpRemove",parameters:`'${taskId}'`}
                            })
                    task.remove()
                })
            })

            const notificationDetails = target.querySelector(".notificationDetails")
            notificationDetails.addEventListener("keydown",(e)=>{
                if(e.keyCode == 13){
                    const parent = notificationDetails.parentNode.parentNode
                    const taskId = parent.getAttribute("resourceId")
                    Ajax({
                        url:"./server/Procedures/Fetch.php",
                        method:"post",
                        response:"json",
                        data:{mode:"fetch",procedure:"notificationUpdate",parameters:`'content','${notificationDetails.value}','${taskId}'`}
                    })

                }
            })
            notificationDetails.addEventListener("change",(e)=>{
                    const parent = notificationDetails.parentNode.parentNode
                    const taskId = parent.getAttribute("resourceId")
                    Ajax({
                        url:"./server/Procedures/Fetch.php",
                        method:"post",
                        response:"json",
                        data:{mode:"fetch",procedure:"notificationUpdate",parameters:`'content','${notificationDetails.value}','${taskId}'`}
                    })
            })




            const notificationStartAt  = target.querySelector(".notificationStartAt")
            notificationStartAt.addEventListener("change",(e)=>{
                const parent = notificationStartAt.parentNode.parentNode
                const taskId = parent.getAttribute("resourceId")
                Ajax({
                    url:"./server/Procedures/Fetch.php",
                    method:"post",
                    response:"json",
                    data:{mode:"fetch",procedure:"notificationUpdate",parameters:`'scheduleNext','${notificationStartAt.value}','${taskId}'`}
                })
            })

            const notificationInterval  = target.querySelector(".notificationInterval")
            notificationInterval.addEventListener("change",(e)=>{
                const parent = notificationInterval.parentNode.parentNode
                const taskId = parent.getAttribute("resourceId")
                Ajax({
                    url:"./server/Procedures/Fetch.php",
                    method:"post",
                    response:"json",
                    data:{mode:"fetch",procedure:"notificationUpdate",parameters:`'scheduleInterval','${notificationInterval.value}','${taskId}'`}
                })
            })
        }


    }
}