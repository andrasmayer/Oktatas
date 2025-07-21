const {Ajax} = await import(`../../../../Hooks/Ajax/Ajax.js${app_version}`)
export const closeMonthForAll = (data) =>{
    const list = Ajax({
        url:"./server/Procedures/Fetch.php",
        method:"post",
        response:"json",
        data:{mode:"fetchAll",procedure:"list_users",parameters:`'${1}'`}
    })
    const closeMonth = document.querySelectorAll(".closeMonth")
    list.forEach(emp=>{
        Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetchColumn",procedure:"closeMonth",parameters:`'${emp.id}','${data.year}','${data.month}','${emp.supervisorId}','${1}'`}
        })
    })
    closeMonth.forEach(itm=>{
        itm.classList.remove("fa-pencil","text-secondary")
        itm.classList.add("fa-lock","text-danger")
    })
}
export const events = (supervisorId) =>{
    const closeMonth = document.querySelectorAll(".closeMonth")
    const year = document.querySelector("year").textContent
    const month = parseInt(document.querySelector("month").textContent)
    closeMonth.forEach(itm=>{
        itm.addEventListener("click",()=>{
            const uid = itm.getAttribute("uid")
            const status = itm.classList.contains("fa-pencil") ? 1 : 0
            Ajax({
                url:"./server/Procedures/Fetch.php",
                method:"post",
                response:"json",
                data:{mode:"fetchColumn",procedure:"closeMonth",parameters:`'${uid}','${year}','${month}','${supervisorId}','${status}'`}
            })
            if(status == 1){
                itm.classList.remove("fa-pencil","text-secondary")
                itm.classList.add("fa-lock","text-danger")
            }else{
                itm.classList.add("fa-pencil","text-secondary")
                itm.classList.remove("fa-lock","text-danger") 
            }
        })
    })
    const monthControls = document.querySelector(".monthControls")
    monthControls.querySelectorAll("i").forEach(itm=>{
        itm.addEventListener("click",()=>{
            let yy = parseInt(document.querySelector("year").textContent)
            let mm = parseInt(document.querySelector("month").textContent)
            if( itm.classList.contains("prev") ){
                if(mm - 1 < 1){
                    mm = 12
                    yy--
                }
                else{ mm-- }
             }
            else if( itm.classList.contains("next") ){
                if(mm + 1 >12){
                    mm = 1
                    yy++
                }
                else{ mm++ }
            }
            location.href = `${location.origin}${location.pathname}${location.hash.split("?")[0]}?y=${yy}&m=${mm}`;
        })
    })
    const userRow = document.querySelectorAll(".userRow")
    userRow.forEach(itm=>{
        itm.addEventListener("contextmenu",(event)=>{
            const year = document.querySelector("year").textContent
            const month = document.querySelector("month").textContent
            event.preventDefault()
            window.open(`#downloads?year=${year}&month=${month}&emp=${itm.getAttribute("user")}`)
        })
    })
}