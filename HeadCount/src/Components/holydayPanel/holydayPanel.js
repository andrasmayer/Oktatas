const {holyDayRules} = await import(`../../Rules/holyDayRules.js${app_version}`)
const {Ajax} = await import(`../../Hooks/Ajax/Ajax.js${app_version}`)
const {$_GET} = await import(`../../Hooks/$_GET/$_GET.js${app_version}`)
let { dateFormat} = await import(`../../Hooks/Date/Date.js${app_version}`)
const today = dateFormat(new Date() )
export const getMandatoryHolydays = () =>{
    return Ajax({
        url:"./server/Procedures/Fetch.php",
        method:"post",
        response:"json",
        data:{mode:"fetchAll",procedure:"getMandatoryHolydays",
            parameters:`'${$_GET().y == null ? new Date().getFullYear() :$_GET().y}'`}
    })
}
export const usedHolydaysDropdown = (obj) =>{
    let mandatoryList = ``
    getMandatoryHolydays().forEach(day=>{
        if(day.type == 6){
            const suffix = today.date > day.date ?  `<i class="fa fa-check"></i>` : ""
            mandatoryList += `<div class="p-2">
                                <div style="font-size:14px;">${suffix} ${day.date}</div>
                            </div>`
        }
    })
    let context = ""
    obj.list.forEach(itm=>{
        context += `<li><div class="dropdown-item" href="#">${itm.date}</div></li>`
    })
    
    const dropdown = `
    <div class="dropdown-toggle" role="button" id="usedHolyDaysDropdownMenu" data-bs-toggle="dropdown" aria-expanded="false">
        ${obj.label} : ${obj.list.length}
    </div>
    <ul class="dropdown-menu uhdContent" style="z-index:2000 !important;" aria-labelledby="usedHolyDaysDropdownMenu">${context}</ul>    `
    return {dropdown:dropdown, mandatoryList:mandatoryList}
}
export const holydayPanel = (obj) =>{
    obj.remainingHolydays = obj.holydayTotal - Object.keys(obj.allUsedHolydays).length
    if(obj.props == null){ obj.props = obj}
    if(obj.planner != null){ obj.props.lang = obj.planner}


    const dropdown = usedHolydaysDropdown({list:obj.allUsedHolydays, label:obj.props.lang.used, parent:obj})
    let context = `
<div class="holyDayCtn  text-start ">
            <div>
                <div>${obj.props.lang.holydayTotal}:<b> ${obj.holydayTotal}</b></div>   
                <div>${ dropdown.dropdown }</div>
                <div>${obj.props.lang.holyDaysRemaining} <available class="h4">${obj.remainingHolydays}</available></div>   
            </div>
            <div class="accordion accordion-flush ps-1 position-absolute  " id="accordionCore" >
                <div class="accordion-item" >
                    <div class="accordion-header " id="flush-headingCore">
                        <button  class="text-left p-0 h4 accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseCore" aria-expanded="false" aria-controls="flush-collapseCore">
                            ${obj.props.lang.details}
                        </button>
                    </div>
                    <div id="flush-collapseCore" class="accordion-collapse collapse" aria-labelledby="flush-headingCore" data-bs-parent="#accordionCore">
                        <div class="accordion-body p-2 ">
                            <p>${obj.props.lang.holyDaysBase}<b>20</b></p>
                            <p>${obj.props.lang.age} (${obj.age}) -> <b>${obj.holydayFromAge}</b></p>                         
                            <p>${obj.props.lang.children} (${obj.holydays.childCount}) -> <b>${holyDayRules.clildren[obj.holydays.childCount]}</b></p>                         
                            
                            
                            ${today.date <= `${dateFormat(new Date() ).year}-01-08` ? 
                                `<p>${obj.props.lang.holyDaysFromLastYear} ${obj.holydays.prevHolydays} <strong class="text-success">(${obj.usedHolyDaysBeforeJan8})</strong></p>`
                                : ""                       
                            }
                            <p>${obj.props.lang.otherHolyday} ${obj.holydays.otherHolydays}</p>                         
                        </div>
                    </div>
                </div>
                <div class="accordion-item " >
                    <div class="accordion-header " id="flush-headingOne">
                        <button style="margin-left:-10px;" class="text-left ps-2 h4 p-0 accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            ${obj.firstDay.year} ${obj.props.lang.schedule}
                        </button>
                    </div>
                    <div id="flush-collapseOne" class="accordion-collapse collapse " style="margin-left:-10px;" aria-labelledby="flush-headingOne" data-bs-parent="#accordionCore">
                        <div class="accordion-body  p-0  ">${dropdown.mandatoryList}</div>
                    </div>
                </div>

            </div>
        </div>
        `
    return context
    
}