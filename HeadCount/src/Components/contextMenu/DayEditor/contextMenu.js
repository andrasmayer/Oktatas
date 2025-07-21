export const {Toast} = await import(`../../../Hooks/Toast/Toast.js${app_version}`)
const {Ajax} = await import(`../../../Hooks/Ajax/Ajax.js${app_version}`)
const {Langs} = await import(`../../../Components/Langs/Langs.js${app_version}`)
const {events} = await import(`./events.js${app_version}`)

const lang =  window.localStorage.getItem("Lang")
const curLang = Langs[lang]




export const contextMenu = (props) =>{

    const sel = document.querySelectorAll(".popoverDay")
    sel.forEach(itm=>{
        itm.addEventListener("contextmenu",(e)=>{

            const temp = itm.parentNode.parentNode.getAttribute("user")

            props.user = temp != null ? temp : props.user
            const date = itm.getAttribute("data-date")

            e.preventDefault()
            const menu = `
            <div class="contextMenuCtn" style="max-width:300px;position:absolute;top:${e.pageY};left:${e.pageX}">
                <ul class="list-group">
                    <li class="list-group-item context-option" data-type="history"">${curLang.dayContext.events}</li>
                    <li class="list-group-item context-option" data-type="comment"  data-bs-toggle="modal" data-bs-target="#contextModal">${curLang.dayContext.announcements}</li>
                    
                    <div class="border-bottom text-center p-2 " style="background-color:white;"><b>Munkaidő beállítás</b></div>

                    <li class="list-group-item context-option bg-secondary text-light" data-type="state" data-value="0">Kezdő állapot</li>
                    <li class="list-group-item context-option bg-success text-light" data-type="state"  data-value="1">Munkanap</li>
                    <li class="list-group-item context-option bg-primary text-light" data-type="state"  data-value="2">Szabadnap</li>
                    <li class="list-group-item context-option bg-danger text-light" data-type="state"  data-value="3">Betegség</li>
                    <li class="list-group-item context-option bg-warning text-light" data-type="state"  data-value="4">Nem fizetett távollét</li>


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
            document.querySelector("context").innerHTML = menu
            const contextOptions = document.querySelectorAll(".context-option")
            contextOptions.forEach(itm2=>{
                itm2.addEventListener("click",()=>{
                    const type = itm2.getAttribute("data-type")
                    if(type == "history"){
                        window.open(`#history?user=${props.user}&date=${date }`)
                    }
                    else if(type == "state"){
                        const value = itm2.getAttribute("data-value")
                        
                        events({user:props.user, state:value, target:itm,colors:props.colors})
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
                    data:{mode:"fetchColumn",procedure:"createUserComment",parameters:`'${props.user}','${props.editor}','${date}','${comment.value}'`}
                })
                
                response == 0 ?
                    Toast({header:`<label class="text-danger">${curLang.dayContext.comment_error}</label>`, time:"",body:curLang.dayContext.comment_error}):
                    Toast({header:`<label class="text-secondary">${curLang.dayContext.msg_ok}</label>`, time:"",body:curLang.dayContext.commentSaved})

            })
            
            
        })
        if(  ["#hr","#supervisor"].includes(location.hash) ){   props.user = null   }
    })
    document.addEventListener("click",()=>{
        document.querySelector("context").innerHTML = ""
    })

    
}