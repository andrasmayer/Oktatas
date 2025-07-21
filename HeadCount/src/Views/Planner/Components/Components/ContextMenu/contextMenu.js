export const {Toast} = await import(`../../../../../Hooks/Toast/Toast.js${app_version}`)
const {Ajax} = await import(`../../../../../Hooks/Ajax/Ajax.js${app_version}`)
const {Langs} = await import(`../../../../../Components/Langs/Langs.js${app_version}`)
const {events} = await import(`./events.js${app_version}`)
export const {colors, updateColumns, insertColumns} = await import(`../Plugins.js${app_version}`)
export const {dateFormat,dateDiff} = await import(`../../../../../Hooks/Date/Date.js${app_version}`)
const lang =  window.localStorage.getItem("Lang")
const curLang = Langs[lang]


let parent
export const contextMenu = (props) =>{
    const token =  JSON.parse(window.localStorage.getItem("authToken") )
    let editor = 0
    if(token != null){
        editor = Ajax({
                url:"./server/Procedures/Fetch.php",
                method:"post",
                response:"json",
                data:{mode:"fetch",procedure:"userToken",parameters:`'${JSON.parse(window.localStorage.getItem("authToken") ).jwt 
                }'`}
            }).id
    }

    const dayTrigger = document.querySelectorAll(".dayTrigger")
    let user = null;
    dayTrigger .forEach(itm=>{
        itm.addEventListener("click",(e)=>{
            if(itm.tagName == "BUTTON"){ parent = itm}
            else{ parent = itm.parentNode}
            user = itm.parentNode.getAttribute("data-user")
            let date = itm.parentNode.getAttribute("data-date")
            const state = parseInt(itm.parentNode.getAttribute("data-state") )
            let hash = location.hash.split("?")[0]



            let canSetHolyday = true
            if( ["#supervisor","#hr"].includes(hash) ){
                user = itm.getAttribute("data-id")
                date = itm.getAttribute("data-date")
            }
            else{
                const today = dateFormat( new Date() ).date
                canSetHolyday = dateDiff( {date:today}, {date:date} ) >= 5
            }

//const today = dateFormat( new Date() ).date
//console.log("k: " + dateDiff( {date:today}, {date:date} ))

            const options = `
            <div class="border-bottom text-center p-2 " style="background-color:white;"><b>${curLang.dayContext.settings}</b></div>
                    <li class="list-group-item context-option bg-secondary text-light" data-type="state" data-value="0">${curLang.dayContext.emptyDay}</li>
                    <li class="list-group-item context-option bg-success text-light" data-type="state"  data-value="1">${curLang.dayContext.workDay}</li>
                    ${ 
                        canSetHolyday === true ?
                            `<li class="list-group-item context-option bg-primary text-light" data-type="state"  data-value="2">${curLang.dayContext.dayOff}</li>`
                            :
                            ""
                    }
                    <li class="list-group-item context-option bg-danger text-light" data-type="state"  data-value="3">${curLang.dayContext.sickDay}</li>
                    <li class="list-group-item context-option bg-warning text-light" data-type="state"  data-value="4">${curLang.dayContext.nonPaidDay}</li>
            `

            const menu = `
            <div class="contextMenuCtn" style="max-width:300px;position:absolute;top:${e.pageY};left:${e.pageX}">
                <ul class="list-group">
                    <li class="list-group-item context-option" data-type="history"">${curLang.dayContext.events}</li>
                    <li class="list-group-item context-option" data-type="comment"  data-bs-toggle="modal" data-bs-target="#contextModal">${curLang.dayContext.announcements}</li>
                    ${ [5,6,7].includes(state) ?  "" : options}
                </ul>
            </div>
            <div class="modal fade" id="contextModal" tabindex="-1" aria-labelledby="contextModal" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <textarea class="form-control comment"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${curLang.dayContext.cancel}</button>
                        <button type="button" class="btn btn-primary saveComment"  data-bs-dismiss="modal">${curLang.dayContext.save}</button>
                    </div>
                    </div>
                </div>
            </div>`
            const contextMenuContent = document.querySelector("context")
            contextMenuContent.innerHTML = menu
            const contextOptions = document.querySelectorAll(".context-option")
            contextOptions.forEach(itm2=>{
                itm2.addEventListener("click",()=>{
                    const type = itm2.getAttribute("data-type")
                    if(type == "history"){
                        window.open(`#history?user=${user}&date=${date }`)
                    }
                    else if(type == "state"){
                        const value = itm2.getAttribute("data-value")
                        events({user:user,date:date, state:value, target:parent,colors:colors, updateColumns:updateColumns, insertColumns:insertColumns,lang:curLang})
                    }
                })
            })

            const comment = document.querySelector(".comment")
            const saveComment = document.querySelector(".saveComment")
            saveComment.addEventListener("click",()=>{
                const response = Ajax({
                    url:"./server/Procedures/Fetch.php",
                    method:"post",
                    response:"json",
                    data:{mode:"fetchColumn",procedure:"createUserComment",parameters:`'${user}','${editor}','${date}','${comment.value}'`}
                })
                
                response == 0 ?
                    Toast({header:`<label class="text-danger">${curLang.dayContext.comment_error}</label>`, time:"",body:curLang.dayContext.comment_error}):
                    Toast({header:`<label class="text-secondary">${curLang.dayContext.msg_ok}</label>`, time:"",body:curLang.dayContext.commentSaved})
            })
        })
        if(  ["#hr","#supervisor"].includes(location.hash) ){   user = null   }
    })

    document.addEventListener("click",(e)=>{
        if( e.target.classList.contains("dayTrigger") === false &&
            e.target.classList.contains("dayCtn") === false &&
            e.target.parentNode.classList.contains("dayCtn") === false 
        ){  document.querySelector("context").innerHTML = ""    }
    })
}