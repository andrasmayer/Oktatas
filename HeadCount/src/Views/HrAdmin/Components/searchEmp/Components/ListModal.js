const {holydayPanel} = await import(`../../../../../Components/holydayPanel/holydayPanel.js${app_version}`)
const {getUser} = await import(`../../../../../Components/getUser/getUser.js${app_version}`)
const {getSystemLogs} = await import(`../../../../../Components/getSystemLogs/getSystemLogs.js${app_version}`)
export class listModal{
    constructor(props){
        this.props = props

        this.modal = `
        <div class="modal fade" id="empDetailsModal" tabindex="-1" aria-labelledby="empDetailsModalLabel" >
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                <div class="modal-body" style="min-height:800px;overflow:auto;">

                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#hdays_" type="button" role="tab" aria-controls="home" aria-selected="true">${this.props.lang.holydayTab}</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#logs_" type="button" role="tab" aria-controls="profile" aria-selected="false">${this.props.lang.logTab}</button>
                        </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="hdays_" role="tabpanel" aria-labelledby="home-tab">
                            szabik
                        </div>
                        <div class="tab-pane fade" id="logs_" role="tabpanel" aria-labelledby="profile-tab"></div>
                    </div>

                </div>
                    <div id="customCss"></div>
                </div>
            </div>
        </div>`
    }
    init(){
        return this.modal
    }
    getLogs(user){

        this.logs = new getSystemLogs({table:"users",target:"#logs_", id:user, langCode:this.props.langCode})


        document.querySelector("#customCss").innerHTML = this.logs.css()
        this.logs.get()
        

        this.logs.grid()


    }
    events(){
        const modal = document.querySelector('#empDetailsModal')
        const target = modal.querySelector("#hdays_")
        const triggers = document.querySelectorAll(".trigger")
        triggers.forEach(itm=>{
            itm.addEventListener("click",()=>{
                const user = itm.getAttribute("data-id")
                const userClass = new getUser({id:user, props:this.props})
                const userData = userClass.init()
                userData.size = "big"
                userData.holyDaysUsed = {}
                //console.log(userData)



                const panel = holydayPanel(userData)

                

                this.getLogs(user)

                target.innerHTML = `<div >
                                        <h1 class="text-center p-3">${userData.userName}</h1>
                                        <div>${panel}</div>
                                    </div>`

            })
        })
    }

}