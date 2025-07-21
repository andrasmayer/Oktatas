const {Ajax} = await import(`../../../../../Hooks/Ajax/Ajax.js${app_version}`)
const {dateFormat,dateDiff} = await import(`../../../../../Hooks/Date/Date.js${app_version}`)
const {calculateHolyDays} = await import(`../../../../../Hooks/calculateHolyDays/calculateHolyDays.js${app_version}`)
const {supervisorPanel,supervisorEvents} = await import(`./supervisorPanel.js${app_version}`)
const {childCtn,childEvents} = await import(`./children.js${app_version}`)
const {Notification} = await import(`../../../../../Hooks/Notification/Notification.js${app_version}`)

const Notify = new Notification()


const today = dateFormat(new Date()).date
const recountChilds = (obj) =>{
    const birthDays = JSON.parse(obj.childBirthdays)
    let holyDayFromKids = 0
    birthDays.forEach(itm=>{
        if( dateDiff({date:itm.birth},{date:today})/365 < 16 ){
            holyDayFromKids++
        }
    })
    if(holyDayFromKids != obj.childCount){
        Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetch",procedure:"emp_admin_childs",parameters:`'${obj.id}','${holyDayFromKids}'`}
        })      
    }
    return holyDayFromKids
}
export const workTypes = [8,6,4]
export const drawWorkTypes = (type) =>{
    let context = ``
     Object.keys(workTypes).forEach( key=>{
         const selected = type == key ? "selected" : ""
         context += `<option ${selected} value="${key}">${workTypes[key]}</option>`
    })
    return `<select class="col-4 border p-2 float-end labourTime">${context}</select>`
}    
export const Rights = Ajax({
    url:"./server/Procedures/Fetch.php",
    method:"post",
    response:"json",
    data:{mode:"fetch_unique",procedure:"getRights",parameters:``}
})
export const drawRights = (jobCode) =>{
   let context = ``
    Object.keys(Rights).forEach( key=>{
        const selected = jobCode == key ? "selected" : ""
        context += `<option ${selected} value="${key}">${Rights[key].jobName }</option>`
   })
    return `<select class="col-4 border p-2 float-end authLevel">${context}</select>`
}
export const Places = Ajax({
    url:"./server/Procedures/Fetch.php",
    method:"post",
    response:"json",
    data:{mode:"fetchAll",procedure:"getPlaces",parameters:``}
})
export const drawPlaces = (location,part) =>{
    part = part == null ? "" : part
    let context = `<option value="${null}"></option>`
        Places.forEach( itm=>{
            const selected = location == itm.id ? "selected" : ""
            context += `<option ${selected} value=${itm.id}">${itm.locationName }</option>`
    })
    return `<select class="col-8 border p-2 float-end location${part}">${context}</select>`
}
export const Panel = (empDatas, lang, isList, loggedUser) =>{
    let cards = ``
    const results = document.querySelector(".results")
    results.innerHTML = ``
    empDatas.forEach(itm=>{
        itm.labourTime = JSON.parse(itm.labourTime)
        const totalHolyday = calculateHolyDays({birth:itm.birthYear,childs:itm.childCount})
        const isProbation = dateDiff({date:itm.hireDate}, dateFormat(new Date())) <= 90
        cards = `
        <div class="p-2 co-12 col-lg-4">
            <div class="card" id="emp_${itm.id}" user-id="${itm.id}">
                <div class="card-header">
                    <div class="card-title">
                        <input class="form-control empName" value="${itm.username}">
                    </div>
                </div>
                <div class="card-body">
                    <div class="p-3">
                        <label>${lang.hireDate} 
                        ${
                            isProbation === true ? '<i class="fa fa-bell text-danger"></i></label>' : ""
                        }
                    <input type="date" class="form-control hireDate" value="${itm.hireDate}">
                    </div>
                    <div class="p-3">
                        <div class="mb-2">
                            <label class="activeLabel">${ itm.active == 1 ? lang.active : lang.inactive}</label>
                            <input type="checkbox" class="ms-2 activator" uid="${itm.id}" ${itm.active == 1 ? "checked disabled":""}>
                        </div>
                        <label>${lang.terminateDate}</label>
                    <input type="date" class="form-control terminateDate" value="${itm.terminateDate}">
                    </div>
                    <div class="p-3">
                        <label>E-mail</label>
                    <input  class="form-control email" value="${itm.email}">
                    </div>
                    <div class="p-3">
                        <label>${lang.authLevel}</label>
                        ${ drawRights( itm.jobCode) }
                    </div>

                    <div class="p-3 border-top mt-4">
                        <label>${lang.place}</label>
                        ${ drawPlaces( itm.location) }
                    </div>
                    <div class="p-3 border-bottom pb-4">
                        <label>${lang.jobType}</label>
                        <input type="number" class=" form-control labourTime1 float-end" value="${itm.labourTime[0]}">
                    </div>                     
                    <div class="p-3">
                        <label>${lang.place} 2</label>
                        ${ drawPlaces( itm.location2,2) }
                    </div>
                    <div class="p-3 border-bottom pb-4">
                        <label>${lang.jobType}</label>
                        <input type="number" class=" form-control labourTime2 float-end" value="${itm.labourTime[1]}">
                    </div>                     
                    <div class="p-3">
                        <label>${lang.birthYear}</label>
                        <input class="birthYear col-4 border p-2 float-end" value="${itm.birthDate}">
                    </div>
                    <div class="p-3">
                        <label>${lang.childCount}</label>
                        <select class="childCount col-4 border p-2 float-end " disabled>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3+</option>
                        </select>
                        ${childCtn( JSON.parse(itm.childBirthdays) ) }
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
                        <label>${lang.prevHolydays}</label>
                        <input type="number" class="prevHolydays col-4 border p-2 float-end" value="${itm.prevHolydays}">
                    </div>
                    <div class="p-3">
                        <label>${lang.otherHolydays}</label>
                        <input type="number" class="otherHolydays col-4 border p-2 float-end" value="${itm.otherHolydays}">
                    </div>
                    <div class="p-3">
                        <label>${lang.otherHolydays} szülési szabi</label>
                        <input type="checkbox" class="maternityLeave col-4 border p-2 float-end" ${itm.maternityLeave == 1 ? "checked" : "" }>
                    </div>
                    <div class="p-3">
                        <label>${lang.supervisor} #1</label>
                        ${supervisorPanel({empNo:itm.supervisorId,name:itm.supervisorName, role:"supervisorId"})}
                    </div>
                    <div class="p-3">
                        <label>${lang.supervisor} #2</label>
                        ${supervisorPanel({empNo:itm.supervisor2Id,name:itm.supervisor2Name, role:"super2id"})}
                    </div>
                    <div class="p-3">
                        <textarea class="comments form-control">${itm.comments}</textarea>
                    </div>









<div>
    <div class="accordion userNotificationAccordion">
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#userAccordion_${itm.id}" aria-expanded="true" aria-controls="collapseOne">
                    ${lang.notifications}
                </button>
            </h2>
            <div id="userAccordion_${itm.id}" class="accordion-collapse collapse " >
                <div class="accordion-body">
                    ${Notify.container({resource:"user", id:itm.id, loggedUser:loggedUser})}
                           
                </div>
            </div>
        </div>
    </div>
</div>






                </div>
            </div>
        </div>
        `
        const newChildCount = recountChilds(itm)
        itm.childCount = newChildCount
        results.innerHTML += cards
        const childBox = document.querySelector(`#emp_${itm.id}`).querySelector(".childCount")
        childBox.querySelectorAll("option")[itm.childCount].setAttribute("selected",true)
    })
    supervisorEvents(lang,isList)
    childEvents(lang)
    Notify.events()
}




