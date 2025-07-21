export const {Toast} = await import(`../../../../Hooks/Toast/Toast.js${app_version}`)
const {Ajax} = await import(`../../../../Hooks/Ajax/Ajax.js${app_version}`)
export const contextMenu = (props) =>{
    const sel = document.querySelectorAll(".popoverDay")
    sel.forEach(itm=>{
        itm.addEventListener("contextmenu",(e)=>{
            const date = itm.getAttribute("data-date")
            e.preventDefault()
            const menu = `
            <div class="contextMenuCtn" style="max-width:300px;position:fixed;top:${e.pageY};left:${e.pageX}">
                <ul class="list-group">
                    <li class="list-group-item context-option" data-type="history"">Történet</li>
                    <li class="list-group-item context-option" data-type="comment"  data-bs-toggle="modal" data-bs-target="#contextModal">Megjegyzés</li>
                </ul>
            </div>
            <div class="modal fade" id="contextModal" tabindex="-1" aria-labelledby="contextModal" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="contextModal">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <textarea class="form-control comment"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${props.lang.cancel}</button>
                        <button type="button" class="btn btn-primary saveComment"  data-bs-dismiss="modal">${props.lang.save}</button>
                    </div>
                    </div>
                </div>
            </div>
            `
            document.querySelector("context").innerHTML = menu


            const contextOptions = document.querySelectorAll(".context-option")
            contextOptions.forEach(itm2=>{
                itm2.addEventListener("click",()=>{
                    const type = itm2.getAttribute("data-type")

                    if(type == "history"){
						//alert(props.user)
                        //window.open(`#history?user=${props.user}&date=${date }`)
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
                    data:{mode:"fetchColumn",procedure:"createUserComment",parameters:`'${props.user}','${props.user}','${date}','${comment.value}'`}
                })
           
                response == 0 ?
                    Toast({header:`<label class="text-danger">${props.lang.comment_error}</label>`, time:"",body:props.lang.comment_error}):
                    Toast({header:`<label class="text-secondary">${props.lang.msg_ok}</label>`, time:"",body:props.lang.commentSaved})

            })
        })
    })
    document.addEventListener("click",()=>{
        document.querySelector("context").innerHTML = ""
    })
}
