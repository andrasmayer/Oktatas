const {Ajax} = await import(`../../../../../Hooks/Ajax/Ajax.js${app_version}`)
const {Toast} = await import(`../../../../../Hooks/Toast/Toast.js${app_version}`)

export const supervisorPanel = (data) =>{
    return `
    <input class="col-12 border p-2 ${data.role}" value="${data.name == null ? "" : data.name}" sup_id="${data.empNo}"> 
    <div class="searchResult"></div>`
}
export const supervisorEvents = (lang,isList) =>{
    const supervisor = document.querySelectorAll(".supervisorId")
    supervisor.forEach(itm=>{
        itm.addEventListener("keyup",(e)=>{
            //Felettes törlése
            const id = isList === false ?
                itm.parentNode.parentNode.parentNode.getAttribute("user-id") : 
                itm.parentNode.parentNode.getAttribute("user-id")  

            if(itm.value == "" && e.keyCode == 13){               
                const res = Ajax({
                    url:"./server/Procedures/Fetch.php",
                    method:"post",
                    data:{mode:"fetch",procedure:"emp_admin_supervisor_remove",parameters:`'${id}'`}
                })
                Toast({header:lang.success, time:"",body:lang.msg_ok})
            }

            const searchResult = e.target.parentNode.querySelector(".searchResult")
            searchResult.innerHTML = ``
            let context = `<option value="0">${lang.chose}</option>`
            if(itm.value.length < 4 ){ return false }
            const empDatas = Ajax({
                url:"./server/Procedures/Fetch.php",
                method:"post",
                response:"json",
                data:{mode:"fetchAll",procedure:"searchEmp",parameters:`'${itm.value}'`}
            })

            empDatas.forEach(itm2=>{
                const selected = itm.getAttribute("sup_id") == itm2.id ? "selected" : ""
                context += `<option ${selected} value="${itm2.id}">${itm2.username}</option>`
            })

            searchResult.innerHTML = `<select class="col-12 border p-2 float-end supervisor_list">${context}</select>`
            const supervisor_list = document.querySelectorAll(".supervisor_list")
            supervisor_list.forEach(sel=>{
                sel.addEventListener("change",(e)=>{
                    const parent = isList === false ? 
                        itm.parentNode.parentNode.parentNode :
                        itm.parentNode.parentNode
                    const id = parent.getAttribute("user-id")
                    const data = sel.value
                    itm.parentNode.querySelector("input").setAttribute("sup_id",sel.value)
                    if(id == null){ return false }
                    Ajax({
                        url:"./server/Procedures/Fetch.php",
                        method:"post",
                        data:{mode:"fetch",procedure:"emp_admin_supervisor",parameters:`'${id}','${data}'`}
                    })
                    Toast({header:lang.success, time:"",body:lang.msg_ok})
                })
            })
        })
    })

    const supervisor2 = document.querySelectorAll(".super2id")
    if(supervisor2 != null){
        supervisor2.forEach(itm=>{
            itm.addEventListener("keyup",(e)=>{
            //Felettes törlése
            if(itm.value == "" && e.keyCode == 13){  
                
                const id = isList === false ?
                    itm.parentNode.parentNode.parentNode.getAttribute("user-id") : 
                    itm.parentNode.parentNode.getAttribute("user-id")  

                const res = Ajax({
                    url:"./server/Procedures/Fetch.php",
                    method:"post",
                    data:{mode:"fetch",procedure:"emp_admin_supervisor_2_remove",parameters:`'${id}'`}
                })
                Toast({header:lang.success, time:"",body:lang.msg_ok})
            }
                const searchResult = e.target.parentNode.querySelector(".searchResult")
                searchResult.innerHTML = ``
                let context = `<option value="0">${lang.chose}</option>`
                if(itm.value.length < 4 ){ return false }
                const empDatas = Ajax({
                    url:"./server/Procedures/Fetch.php",
                    method:"post",
                    response:"json",
                    data:{mode:"fetchAll",procedure:"searchEmp",parameters:`'${itm.value}'`}
                })
                empDatas.forEach(itm2=>{
                    const selected = itm.getAttribute("sup_id") == itm2.id ? "selected" : ""
                    context += `<option ${selected} value="${itm2.id}">${itm2.username}</option>`
                })
                searchResult.innerHTML = `<select class="col-12 border p-2 float-end supervisor_list">${context}</select>`
                const supervisor_list = document.querySelectorAll(".supervisor_list")
                supervisor_list.forEach(sel=>{
                    sel.addEventListener("change",(e)=>{
                        const parent = isList === false ? 
                            itm.parentNode.parentNode.parentNode :
                            itm.parentNode.parentNode
                        const id = parent.getAttribute("user-id")
                        const data = sel.value
                        itm.parentNode.querySelector("input").setAttribute("sup_id",sel.value)
                        if(id == null){ return false }
                        Ajax({
                            url:"./server/Procedures/Fetch.php",
                            method:"post",
                            response:"json",
                            data:{mode:"fetch",procedure:"emp_admin_supervisor_2",parameters:`'${id}','${data}'`}
                        })
                        Toast({header:lang.success, time:"",body:lang.msg_ok})
                    })
                })
            })
        })    
    }
}