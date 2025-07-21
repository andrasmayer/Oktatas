const {drawRights,drawPlaces} = await import(`../HrAdmin/Components/searchEmp/Components/Panel.js${app_version}`)
const {events,Toast} = await import(`../HrAdmin/Components/searchEmp/Components/events.js${app_version}`)
const {supervisorPanel, supervisorEvents} = await import(`../HrAdmin/Components/searchEmp/Components/supervisorPanel.js${app_version}`)
const {Ajax} = await import(`../../Hooks/Ajax/Ajax.js${app_version}`)
const {$_GET} = await import(`../../Hooks/$_GET/$_GET.js${app_version}`)



const holydaysThisYear = (hireDate) =>{
    const res = Ajax({
        url:"./server/Procedures/Fetch.php",
        method:"post",
        response:"json",
        data:{mode:"fetchAll",procedure:"holydaysThisYear",parameters:`'${new Date().getFullYear()}','${hireDate}'`}
    })
    return res
}




const repair = () =>{
    const list = Ajax({
        url:"./server/Procedures/Fetch.php",
        method:"post",
        response:"json",
        data:{mode:"fetchAll",procedure:"searchEmp",parameters:`''`}
    }).filter(itm=>{ return itm.active == 1})

    list.forEach(itm=>{
        let holdyDaysFromHireDate =  holydaysThisYear(itm.hireDate)

        for(let i=1; i<=12; i++){
            const tmp = Ajax({
                url:"./server/Procedures/Fetch.php",
                method:"post",
                response:"json",
                data:{mode:"fetchAll",procedure:"getRegisterByUser",parameters:`'${itm.id}','${new Date().getFullYear()}','${i}'`}
            }).filter(itm=>{ return ["5","6","7",5,6,7].includes(itm.type) && itm.date >= "2025-01-01"})
            
            tmp.forEach(itm=>{
                holdyDaysFromHireDate = holdyDaysFromHireDate.filter(itm2=>{ return  itm.date.includes(itm2.date) == false })
            })
        }
        holdyDaysFromHireDate.forEach(itm3=>{
            
    
                const res =Ajax({
                    url:"./server/Procedures/Fetch.php",
                    method:"post",
                    data:{mode:"fetchColumn",procedure:"setRegister",parameters:`'${itm.id}','${itm3.date}','${itm3.type}','${1}'`}
                })
                    
        })

    })
}


if($_GET().repair != null){
    repair()
    alert("Javítás befejeződött!")
    location.href = "#createUser"
}





export class createUser{
    constructor(props){
        this.props  = props
        this.login  = {name:null,available:null}
        this.user =  Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetch",procedure:"userToken",parameters:`'${this.props.authToken.jwt}'`}
        }).id
        
    }
    init(){
        const itm = {holydays:0,}
        const lang = this.props.lang
        const totalHolyday = 0
        return `
        <div>
            <div class="alert alert-info text-center ">${lang.tips}.</div>
            <div class="d-flex justify-content-center">
                <div class="p-2 co-12 col-lg-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="card-title">
                                <input class="form-control empName" placeholder="${lang.name}">
                            </div>
                        </div>
                        <div class="card-body">



                            <div class="p-3">
                                <input class="form-control loginName" placeholder="${lang.loginName}">
                            </div>
                            <div class="p-3">
                                <label>${lang.hireDate}</label>
                            <input type="date" class="form-control hireDate" value="${itm.hireDate}">
                            </div>
                            <div class="p-3">
                                <label>E-mail</label>
                                <input  class="form-control email" >
                            </div>

                            <div class="p-3">
                                <label>${lang.authLevel}</label>
                                ${ drawRights( ) }
                            </div>
                            <div class="p-3">
                                <label>${lang.place}</label>
                                ${ drawPlaces( ) }
                            </div>                    
                            <div class="p-3">
                                <label>${lang.birthYear}</label>
                                <input class="birthYear col-4 border p-2 float-end" value="${new Date().getFullYear()-16}-01-01">
                            </div>
                            <div class="p-3">
                                <label>${lang.childCount}</label>
                                <select class="childCount col-4 border p-2 float-end" >
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3+</option>
                                </select>
                            </div>
                            <div class="p-3">
                                <label>${lang.holydays}</label>
                                <label class=" border p-2 float-end col-4">
                                    <strong class="usedHolyday d-none">${itm.holydays}</strong>
                                    <strong class="freeHolyday">${totalHolyday-itm.holydays}</strong> /
                                    <strong class="holydays">${totalHolyday}</strong>
                                </label>
                            </div>
                            <div class="p-3">
                                <label>${lang.supervisor} #1</label>
                                ${supervisorPanel({empNo:0,name:"", role:"supervisorId"})}
                            </div>
                            <div class="p-3">
                                <label>${lang.supervisor} #2</label>
                                ${supervisorPanel({empNo:itm.supervisor2Id,name:itm.supervisor2Name, role:"super2id"})}
                            </div>                            
                            <div class="p-3">
                                <textarea class="comments form-control"></textarea>
                            </div>
                        </div>
                        <div class="text-center pb-4">
                            <button class="btn btn-success save">${lang.save}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }
    events(){
        events(this.props.lang)
        supervisorEvents(this.props.lang)
        const save = document.querySelector(".save")
        const empName = document.querySelector(".empName")
        const authLevel = document.querySelector(".authLevel")
        const birthYear  = document.querySelector(".birthYear")
        const childCount   = document.querySelector(".childCount")
        const comments   = document.querySelector(".comments")
        const location   = document.querySelector(".location")
        const hireDate   = document.querySelector(".hireDate")
        const email   = document.querySelector(".email")
        save.addEventListener("click",()=>{
            const supervisor   = document.querySelectorAll(".supervisor_list")
            const loginName    = this.login.name

            if( empName.value == ""){
                Toast({header:`<label class="text-danger">${this.props.lang.msg_error}</label>`, time:"",body:this.props.lang.msg_name_short})
                return false
            }
            if(this.login.name == null){
                Toast({header:`<label class="text-danger">${this.props.lang.msg_error}</label>`, time:"",body:this.props.lang.loginNameMissing})
                return false
            }            
            if(this.login.available == false){
                Toast({header:`<label class="text-danger">${this.props.lang.msg_error}</label>`, time:"",body:this.props.lang.loginNameExists})
                return false
            }
            if(hireDate.value == ""){
                Toast({header:`<label class="text-danger">${this.props.lang.msg_error}</label>`, time:"",body:this.props.lang.hireDateEmpty})
                return false
            }
            

//setRegister
            
            const res = Ajax({
                url:"./server/Procedures/Fetch.php",
                method:"post",
                response:"json",
                data:{mode:"fetch",procedure:"createUser",parameters:
                    `'${empName.value}', '${authLevel.value}', '${birthYear.value}',
                    '${childCount.value}', '${comments.value}', '${location.value}',
                    '${loginName}', '${supervisor[0] == null ? 0 : supervisor[0].value}',
                    '${supervisor[1] == null ? 0 : supervisor[1].value}','${hireDate.value}','${email.value}'`}
            })

            const emp =  res.id

          
            const holydays = holydaysThisYear(hireDate.value)
            holydays.forEach(itm=>{
                const res =Ajax({
                    url:"./server/Procedures/Fetch.php",
                    method:"post",
                    data:{mode:"fetchColumn",procedure:"updateRegister",parameters:`'${emp}','${itm.date}','${itm.type}','${this.user}'`}
                })
                console.log(`'${emp}','${itm.date}','${itm.type}','${this.user}'`)
            })


            Toast({header:this.props.lang.success, time:"",body:this.props.lang.msg_ok})
           


        })

        const loginName = document.querySelector(".loginName")
        loginName.addEventListener("keyup",()=>{
            this.login.name = loginName.value
            const available=    Ajax({
                    url:"./server/Procedures/Fetch.php",
                    method:"post",
                    response:"json",
                    data:{mode:"fetchColumn",procedure:"checkLoginName",parameters:`'${loginName.value}'`}
                })

                if( available == 1){
                    loginName.classList.add("bg-danger")
                    this.login.available = false
                }
                else{
                    loginName.classList.remove("bg-danger")
                    this.login.available = true
                }
        })
    }
}