const {Ajax} = await import(`../../../../../Hooks/Ajax/Ajax.js${app_version}`)
const {dateDiff,dateFormat} = await import(`../../../../../Hooks/Date/Date.js${app_version}`)
const today = dateFormat(new Date()).date
export const childCtn = (data) =>{
    const data_ = [{"name":"", "birth":""},{"name":"", "birth":""},{"name":"", "birth":""}]
    data.forEach((itm,key)=>{
        data_[key] = itm
    })
    return `
        <div class="childsBirthDate pt-4">
            <div class="mt-1 row">
                <div class="col-7">
                    <input class="form-control childName" value="${data_[0].name}">
                </div>
                <div class="col-5">
                    <input class="form-control birthDate" type="date" value="${data_[0].birth}">
                </div>
            </div>
            <div class="mt-1 row">
                <div class="col-7">
                    <input class="form-control childName" value="${data_[1].name}">
                </div>
                <div class="col-5">
                    <input class="form-control birthDate" type="date" value="${data_[1].birth}">
                </div>
            </div>
            <div class="mt-1 row">
                <div class="col-7">
                    <input class="form-control childName" value="${data_[2].name}">
                </div>
                <div class="col-5">
                    <input class="form-control birthDate" type="date" value="${data_[2].birth}">
                </div>
            </div>
        </div>
    `
}

const event = (obj) =>{
    const parent = obj.parent.parentNode.parentNode.parentNode
    const childCount = parent.parentNode.querySelector(".childCount")
    const childs = parent.querySelectorAll(".row")
    let holyDayFromKids = 0
    childs.forEach(row=>{
        let curName = row.querySelector(".childName").value
        let curBirthday = row.querySelector(".birthDate").value
        const childAge = dateDiff({date:curBirthday},{date:today})
        if(obj.type == "name" && curName == ""){
            curBirthday = "" 
            row.querySelector(".birthDate").value = null
        }
        if(curName != "" || curBirthday != ""){
            obj.list.push({"name":curName, "birth":curBirthday})
            if( dateDiff({date:curBirthday},{date:today})/365 < 16 ){
                holyDayFromKids++
            }
        }
    })

    Ajax({
        url:"./server/Procedures/Fetch.php",
        method:"post",
        response:"json",
        data:{mode:"fetchAll",procedure:"emp_admin_childList",parameters:`'${obj.userId}','${JSON.stringify(obj.list)}'`}
    })

    Ajax({
        url:"./server/Procedures/Fetch.php",
        method:"post",
        response:"json",
        data:{mode:"fetch",procedure:"emp_admin_childs",parameters:`'${obj.userId}','${holyDayFromKids}'`}
    })
    childCount.value = holyDayFromKids
}

export const childEvents = (lang) =>{
    const childName = document.querySelectorAll(".childName")
    const birthDate = document.querySelectorAll(".birthDate")
    childName.forEach(itm=>{
        itm.addEventListener("change",(e)=>{
            const parent = itm.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
            const userId = parent.getAttribute("id").split("emp_").join("")
            const list  = []
            event({list:list, userId:userId, type:"name", lang:lang, parent:itm})
        })
    })

    birthDate.forEach(itm=>{
        itm.addEventListener("change",(e)=>{
            const parent = itm.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
            const userId = parent.getAttribute("id").split("emp_").join("")
            const list  = []
            event({list:list, userId:userId, type:"name", lang:lang, parent:itm})

        })
    })
}