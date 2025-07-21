const {Ajax} = await import(`../../Hooks/Ajax/Ajax.js${app_version}`)
const {$_GET} = await import(`../../Hooks/$_GET/$_GET.js${app_version}`)
const {colors} = await import(`../Planner/Components/Components/Plugins.js${app_version}`)


export class History{
    constructor(props){
      
        this.props = props
        this.user  = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetch",procedure:"getUserData",parameters:`'${$_GET().user}'`}
        })

        this.dataSet = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetchAll",procedure:"getLogEmpDay",parameters:`'${$_GET().user}','${$_GET().date}'`}
        })

        this.commentsData = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetchAll",procedure:"getCommentsEmpDay",parameters:`'${$_GET().user}','${$_GET().date}'`}
        })

    }
    init(){
       
        return `
        <div class="text-center">
            <div class="h3 text-secondary">${this.props.lang.title} ${$_GET().date}</div>
        <div class="p-2 ">
            <div>${this.props.lang.user}: <label class="h5">${this.user.userName}</label></div>
            <div>${this.props.lang.supervisor}: <label class="fst-italic">${this.user.bossName}</label></div>
        </div>
        <div class="row">
            <div class="p-2 col-12 col-lg-6">
                <div class="h3">${this.props.lang.events}</div>
                ${ this.context()}
            </div>
            <div class="p-2 col-12 col-lg-6">
                <div class="h3">${this.props.lang.announcements}</div>
                ${ this.comments()}
            </div>
        </div>
            
        </div>`
    }
    context(){
        let context = ""
        this.dataSet.forEach(itm=>{
            context += `
            <div class="p-2">
                <div>
                    ${itm.created}
                </div>
                <div>
                    <button class="border p-1 pe-4  ${colors[itm.type]}">&nbsp</button> ${itm.editorName}
                </div>
            </div>`
        })
        return context

    }
    comments(){
        let context = ""
        this.commentsData.forEach(itm=>{
            context += `
            <div class="col-10 p-3">
                <div class="card">
                    <div class="card-header">
                        <label class="float-start">${itm.userName}</label>
                        <label class="float-end">${itm.created}</label>
                        
                    </div>
                    <div class="card-body text-start" style=" white-space: pre;">${itm.comment}</div>
                </div>
            </div>
            `
        })
        return context
    }

    events(){
        
    }
}