const {Ajax} = await import(`../../../../../Hooks/Ajax/Ajax.js${app_version}`)
export const {Toast} = await import(`../../../../../Hooks/Toast/Toast.js${app_version}`)
const {calculateHolyDays} = await import(`../../../../../Hooks/calculateHolyDays/calculateHolyDays.js${app_version}`)
export const events = (lang,isList) =>{
    const empName = document.querySelectorAll(".empName")
    const birthYear = document.querySelectorAll(".birthYear")
    const childCount = document.querySelectorAll(".childCount")
    const comments = document.querySelectorAll(".comments")
    const authLevel = document.querySelectorAll(".authLevel")
    const location = document.querySelectorAll(".location")
    const location2 = document.querySelectorAll(".location2")
    const otherHolydays = document.querySelectorAll(".otherHolydays")
    const maternityLeave = document.querySelectorAll(".maternityLeave")

    empName.forEach(itm=>{
        itm.addEventListener("keyup",(e)=>{
            if( e.keyCode == 13){
                const id = isList === false ?
                    itm.parentNode.parentNode.parentNode.getAttribute("user-id") :
                    itm.parentNode.parentNode.getAttribute("user-id")
                const data = itm.value
                if(id == null){ return false }
                const res = Ajax({
                    url:"./server/Procedures/Fetch.php",
                    method:"post",
                    response:"json",
                    data:{mode:"fetch",procedure:"emp_admin_name",parameters:`'${id}','${data}'`}
                })
                Toast({header:`<label class="text-secondary">${lang.success}</label>`, time:"",body:lang.msg_ok})
            }
        })
    })

    comments.forEach(itm=>{
        itm.addEventListener("focus",(e)=>{
            e.target.classList.add("textarea_open")
        })
        itm.addEventListener("focusout",(e)=>{
            e.target.classList.remove("textarea_open")
        })
        itm.addEventListener("keyup",(e)=>{
            if( e.keyCode == 13){
                const id = itm.parentNode.parentNode.parentNode.getAttribute("user-id")
                const data = itm.value
                if(id == null){ return false }
                Ajax({
                    url:"./server/Procedures/Fetch.php",
                    method:"post",
                    response:"json",
                    data:{mode:"fetch",procedure:"emp_admin_comments",parameters:`'${id}','${data}'`}
                })
                Toast({header:`<label class="text-secondary">${lang.success}</label>`, time:"",body:lang.msg_ok})
            }
        })
    })

    birthYear.forEach(itm=>{
        itm.addEventListener("keyup",(e)=>{
            if( e.keyCode == 13){
                const parent = itm.parentNode.parentNode.parentNode
                const id = parent.getAttribute("user-id")
                const data = itm.value
                if( new Date().getFullYear() - data < 16  || data < new Date().getFullYear() - 100 ){
                    Toast({header:`<label class="text-danger">${lang.msg_error}</label>`, time:"",body:lang.msg_age_low})
                }
                else{
                    const childs = parent.querySelector(".childCount").value
                    const holydays = parent.querySelector(".holydays")
                    holydays.textContent = calculateHolyDays({birth:data,childs:childs}) 
                    const usedHolyday = parent.querySelector(".usedHolyday")
                    const freeHolyday = parent.querySelector(".freeHolyday")
                    freeHolyday.textContent = holydays.textContent - usedHolyday.textContent
                    if(id == null){ return false }
                    Ajax({
                        url:"./server/Procedures/Fetch.php",
                        method:"post",
                        response:"json",
                        data:{mode:"fetch",procedure:"emp_admin_age",parameters:`'${id}','${data}'`}
                    })
                    console.log(`'${id}','${data}'`)
                    Toast({header:lang.success, time:"",body:lang.msg_ok})
                }
            }
        })
    })

    childCount.forEach(itm=>{
        itm.addEventListener("change",(e)=>{
            const parent = itm.parentNode.parentNode.parentNode
            const id = parent.getAttribute("user-id")
            const data = itm.value
            const birthYear  = parent.querySelector(".birthYear").value
            const holydays = parent.querySelector(".holydays")
            holydays.textContent = calculateHolyDays({birth:birthYear,childs:data})
            const usedHolyday = parent.querySelector(".usedHolyday")
            const freeHolyday = parent.querySelector(".freeHolyday")
            freeHolyday.textContent = holydays.textContent - usedHolyday.textContent
            if(id == null){ return false }
            Ajax({
                url:"./server/Procedures/Fetch.php",
                method:"post",
                response:"json",
                data:{mode:"fetch",procedure:"emp_admin_childs",parameters:`'${id}','${data}'`}
            })
            Toast({header:lang.success, time:"",body:lang.msg_ok})
        })
    })

    authLevel.forEach(itm=>{
        itm.addEventListener("change",(e)=>{
            const parent = itm.parentNode.parentNode.parentNode
            const id = parent.getAttribute("user-id")
            const data = itm.value
            if(id == null){ return false }
            Ajax({
                url:"./server/Procedures/Fetch.php",
                method:"post",
                response:"json",
                data:{mode:"fetch",procedure:"emp_admin_auth",parameters:`'${id}','${data}'`}
            })
            Toast({header:lang.success, time:"",body:lang.msg_ok})
        })
    })

    location.forEach(itm=>{
        itm.addEventListener("change",(e)=>{
            const parent = itm.parentNode.parentNode.parentNode
            const id = parent.getAttribute("user-id")
            const data = itm.value
            if(id == null){ return false }
            Toast({header:lang.success, time:"",body:lang.msg_ok})
            Ajax({
                url:"./server/Procedures/Fetch.php",
                method:"post",
                response:"json",
                data:{mode:"fetch",procedure:"emp_admin_location",parameters:`'${id}','${data}'`}
            })
        })
    })

    location2.forEach(itm=>{
        itm.addEventListener("change",(e)=>{
            const parent = itm.parentNode.parentNode.parentNode
            const id = parent.getAttribute("user-id")
            const data = itm.value
            if(id == null){ return false }
            Toast({header:lang.success, time:"",body:lang.msg_ok})
            Ajax({
                url:"./server/Procedures/Fetch.php",
                method:"post",
                response:"json",
                data:{mode:"fetch",procedure:"emp_admin_location2",
                    parameters:`'${id}','${data}'`}
            })
        })
    })

    const activator = document.querySelectorAll(".activator")
    activator.forEach(itm=>{
        itm.addEventListener("change",()=>{
            const parent = itm.parentNode.parentNode.parentNode
            const id = itm.getAttribute("uid")
            const status = itm.checked === true ? 1 :0
            const activator_ = parent.querySelector(".activator")
            activator_.disabled = true
            activator_.checked = true
            const activeLabel = parent.querySelector(".activeLabel")
            activeLabel.textContent = lang.active
            const terminateDate_ = parent.querySelector(".terminateDate")
            terminateDate_.value = null
            Ajax({
                url:"./server/Procedures/Fetch.php",
                method:"post",
                response:"json",
                data:{mode:"fetch",procedure:"emp_admin_status",parameters:`'${id}','${status}'`}
            })
            Toast({header:lang.success, time:"",body:lang.msg_ok})
        })
    })
    const hireDate = document.querySelectorAll(".hireDate")
    hireDate.forEach(itm=>{
        itm.addEventListener("change",()=>{
            const parent = isList === false ?
                itm.parentNode.parentNode.parentNode.parentNode :
                itm.parentNode.parentNode
            const id = parent.getAttribute("user-id")
            if(id == null){ return false }
            Ajax({
                url:"./server/Procedures/Fetch.php",
                method:"post",
                response:"json",
                data:{mode:"fetch",procedure:"emp_admin_hireDate",parameters:`'${id}','${itm.value}'`}
            })
            Toast({header:lang.success, time:"",body:lang.msg_ok})
        })
    })
    const email = document.querySelectorAll(".email")
    email.forEach(itm=>{
        itm.addEventListener("keyup",(e)=>{
            if( e.keyCode == 13){
                const id = itm.parentNode.parentNode.parentNode.getAttribute("user-id")
                const data = itm.value

                if(id == null){ return false }
                let response = Ajax({
                    url:"./server/Procedures/Fetch.php",
                    method:"post",
                    data:{mode:"fetch",procedure:"emp_admin_email",parameters:`'${id}','${data}'`}
                })
                Toast({header:`<label class="text-secondary">${lang.success}</label>`, time:"",body:lang.msg_ok})
            }
        })
    })

    const terminateDate = document.querySelectorAll(".terminateDate")
    terminateDate.forEach(itm=>{
        const parent = isList === false ?
        itm.parentNode.parentNode.parentNode :
        itm.parentNode.parentNode

        const id = parent.getAttribute("user-id")
        itm.addEventListener("change",(e)=>{

            if(isList === false){
                const activator_ = parent.querySelector(".activator")
                activator_.disabled = false
                activator_.checked = false
                const activeLabel = parent.querySelector(".activeLabel")
                activeLabel.textContent = lang.inactive
            }
            Ajax({
                url:"./server/Procedures/Fetch.php",
                method:"post",
                data:{mode:"fetch",procedure:"emp_admin_terminationDate",parameters:`'${id}','${itm.value}'`}
            })
            Toast({header:`<label class="text-secondary">${lang.success}</label>`, time:"",body:lang.msg_ok})
        })
        if(isList === true){
            itm.addEventListener("contextmenu",(e)=>{
                e.preventDefault()

                Ajax({
                    url:"./server/Procedures/Fetch.php",
                    method:"post",
                    data:{mode:"fetch",procedure:"emp_admin_status",parameters:`'${id}','1'`}
                })
                itm.value = null
            })
        }

    })
    /*
    const labourTime = document.querySelectorAll(".labourTime")
    labourTime.forEach(itm=>{
        itm.addEventListener("change",(e)=>{
            const parent = isList === false ?
            itm.parentNode.parentNode.parentNode :
            itm.parentNode.parentNode

            const id = parent.getAttribute("user-id")
            let response = Ajax({
                url:"./server/Procedures/Fetch.php",
                method:"post",
                data:{mode:"fetch",procedure:"emp_admin_labourTime",parameters:`'${id}','${itm.value}'`}
            })
            Toast({header:`<label class="text-secondary">${lang.success}</label>`, time:"",body:lang.msg_ok})
        })
    })
*/
    const prevHolydays = document.querySelectorAll(".prevHolydays")
    prevHolydays.forEach(itm=>{
        itm.addEventListener("keyup",(e)=>{
            if( e.keyCode == 13){
                const id = itm.parentNode.parentNode.parentNode.getAttribute("user-id")
                const data = itm.value
                if(id == null){ return false }
                Ajax({
                    url:"./server/Procedures/Fetch.php",
                    method:"post",
                    response:"json",
                    data:{mode:"fetch",procedure:"emp_admin_prevHolydays",parameters:`'${id}','${data}'`}
                })
                Toast({header:`<label class="text-secondary">${lang.success}</label>`, time:"",body:lang.msg_ok})
            }
        })
    })

    const labourTime1 = document.querySelectorAll(".labourTime1")
    labourTime1.forEach(itm=>{
        itm.addEventListener("keyup",(e)=>{
            if(e.keyCode == 13){
                const parent =  itm.parentNode.parentNode.parentNode
                const sibling = parent.querySelector(".labourTime2") 
                const id = parent.getAttribute("user-id")
                const data = `["${itm.value}","${sibling.value}"]`
                Ajax({
                    url:"./server/Procedures/Fetch.php",
                    method:"post",
                    data:{mode:"fetch",procedure:"emp_admin_labourTime",parameters:`'${id}','${data}'`}
                })
                Toast({header:`<label class="text-secondary">${lang.success}</label>`, time:"",body:lang.msg_ok})
            }
        })
    }) 

    const labourTime2 = document.querySelectorAll(".labourTime2")
    labourTime2.forEach(itm=>{
        itm.addEventListener("keyup",(e)=>{
            if(e.keyCode == 13){
                const parent =  itm.parentNode.parentNode.parentNode
                const location = parent.querySelector(".location2").value
                const sibling = parent.querySelector(".labourTime1") 
                const id = parent.getAttribute("user-id")
                const data = `["${sibling.value}","${itm.value}"]`
                if(location == "null" && itm.value != 0){
                    return false
                }
                Ajax({
                    url:"./server/Procedures/Fetch.php",
                    method:"post",
                    data:{mode:"fetch",procedure:"emp_admin_labourTime",parameters:`'${id}','${data}'`}
                })
                Toast({header:`<label class="text-secondary">${lang.success}</label>`, time:"",body:lang.msg_ok})
            }
        })
    }) 

    otherHolydays.forEach(itm=>{
        itm.addEventListener("keyup",(e)=>{
            if( e.keyCode == 13){
                const id = isList === false ?
                    itm.parentNode.parentNode.parentNode.getAttribute("user-id") :
                    itm.parentNode.parentNode.getAttribute("user-id")
                const data = itm.value
                if(id == null){ return false }
               
                const res = Ajax({
                    url:"./server/Procedures/Fetch.php",
                    method:"post",
                    response:"json",
                    data:{mode:"fetch",procedure:"emp_admin_otherholydays",parameters:`'${id}','${data}'`}
                })
                Toast({header:`<label class="text-secondary">${lang.success}</label>`, time:"",body:lang.msg_ok})
            }
        })
    })

    maternityLeave.forEach(itm=>{
        itm.addEventListener("change",(e)=>{
                const parent =  itm.parentNode.parentNode.parentNode
                const id = parent.getAttribute("user-id")
                const data = itm.checked === true ? 1 :0
                const res = Ajax({
                    url:"./server/Procedures/Fetch.php",
                    method:"post",
                    response:"json",
                    data:{mode:"fetch",procedure:"emp_admin_maternityLeave",parameters:`'${id}','${data}'`}
                })
                Toast({header:`<label class="text-secondary">${lang.success}</label>`, time:"",body:lang.msg_ok})
        })
    })
    
}