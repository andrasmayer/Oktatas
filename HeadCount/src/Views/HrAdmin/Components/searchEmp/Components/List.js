const {today, usedHolydays} = await import(`../../../../Planner/Components/Api.js${app_version}`)
const {dateFormat,dateDiff} = await import(`../../../../../Hooks/Date/Date.js${app_version}`)
const {calculateHolyDays} = await import(`../../../../../Hooks/calculateHolyDays/calculateHolyDays.js${app_version}`)
const {supervisorPanel,supervisorEvents} = await import(`./supervisorPanel.js${app_version}`)
const {listModal} = await import(`./listModal.js${app_version}`)
export const List = (empDatas,lang,isList,props) =>{
    const Modal = new listModal(props)
    const results = document.querySelector(".results")
    results.innerHTML = ``
    let rows = ``

    empDatas.forEach(itm=>{
        const usedHolydays_ = usedHolydays({user:itm.id})
        let usedHolyDaysBeforeJan8 = itm.prevHolydays == 0 ? 0 : usedHolydays_.filter(itm=>{ return itm.date < `${today.year}-01-08` }).length
        itm.labourTime = JSON.parse(itm.labourTime)
        const totalHolyday = calculateHolyDays({birth:itm.birthYear,childs:itm.childCount}) 
        + parseInt(usedHolyDaysBeforeJan8) 
        + parseInt(itm.otherHolydays)
        const isProbation = dateDiff({date:itm.hireDate}, dateFormat(new Date())) <= 90

        rows += `<tr user-id="${itm.id}">
                    <td >
                        <i class="fa fa-eye position-absolute btn btn-primary btn-sm trigger" data-id="${itm.id}" data-bs-toggle="modal" data-bs-target="#empDetailsModal" role="button" style="right:50px"></i>
                        <input class="d-inline-block form-control empName noBorder"  value="${itm.username}">
                    </td>
                    <td class="closeableCell"  >
                        <div class="content d-none">
                            ${ supervisorPanel({empNo:itm.supervisorId,name:itm.supervisorName, role:"supervisorId"}) }
                        </div>
                    </td>
                    <td  class="closeableCell">
                        <div class="content d-none">
                            ${supervisorPanel({empNo:itm.supervisor2Id,name:itm.supervisor2Name, role:"super2id"})}
                        </div>
                    </td>
                    <td>
                        <input type="date" class="form-control hireDate" value="${itm.hireDate}">
                    </td>
                    <td>
                        <input type="date" class="form-control terminateDate" value="${itm.terminateDate}">
                    </td>
                    <td  class="closeableCell">
                        <div class="content d-none">${itm.email}</div>
                    </td>
                    <td class="border-start">${totalHolyday}</td>
                    <td>${usedHolydays_.length}</td>
                    <td>${itm.prevHolydays}</td>
                    <td>${itm.otherHolydays}</td>
                    <td>${totalHolyday - usedHolydays_.length }</td>

                    <td>
                        <div>${itm.locationName} <b>/ ${itm.labourTime[0]}</b></div>
                        ${ itm.labourTime[1] != 0 ? `<div class="mt-3">${itm.locationName2} <b> / ${itm.labourTime[1]}</div>` : ""}
                    </td>
                    <td>${itm.birthDate}</td>
                    <td>${itm.childCount}</td>
                </tr>`
    })
    results.innerHTML = `
                        <table class="table table-striped "  >
                            <thead class="sticky-top stict-to-nav bg-light">
                                <tr>
                                    <th>${lang.name}</th>
                                    <th class="closeableCell">
                                        <i class="closeableCell_controlButton fa fa-users"></i>
                                        <label class="d-none">${lang.supervisor}</label>
                                    </th>
                                    <th class="closeableCell">
                                        <i class="closeableCell_controlButton fa fa-users"></i>
                                        <label class="d-none">${lang.supervisor}</label>
                                    </th>
                                    <th>${lang.hireDate}</th>
                                    <th>${lang.terminateDate}</th>
                                    <th>
                                        <i class="closeableCell_controlButton fa fa-envelope"></i>
                                        <label class="d-none">email</label>
                                    </th>
                                    <th class="border-start">${lang.holyDayTotal}</th>
                                    
                                    <th>${lang.holyDayUsed}</th>
                                    <th>${lang.prevHolydays}</th>
                                    <th>${lang.otherHolydays   }</th>
                                    <th>${lang.holyDayCurrent}</th>
                                    <th>${lang.place} / ${lang.jobType}</th>
                                    <th>${lang.birthYear}</th>
                                    <th>${lang.childCount}</th>
                                </tr>
                            </thead>
                            <tbody>${rows}</tbody
                        </table>
                    ${Modal.init()}
                    <link rel="stylesheet" href="./src/Views/HrAdmin/Components/searchEmp/Components/List.css">`
                    Modal.events()
                    supervisorEvents(lang,isList)
                    
    const tbody = document.querySelector("tbody")
    const tr = tbody.querySelectorAll("tr")
    const closeableCell_controlButton = document.querySelectorAll(".closeableCell_controlButton")
    closeableCell_controlButton.forEach((icon,index)=>{
        icon.addEventListener("click",(event)=>{
            const label = icon.parentNode.querySelector("label")
            if(label.classList.contains("d-none")){
                label.classList.remove("d-none")
            }
            else{
                label.classList.add("d-none") 
            }

            const col = icon.parentNode.cellIndex
            tr.forEach((tr_,key)=>{
                const td = tr_.querySelectorAll("td")
                const content = td[col].querySelector(".content")
                if(content.classList.contains("d-none")){
                    content.classList.remove("d-none")
                    content.parentNode.classList.add("openCell")
                }
                else{
                    content.classList.add("d-none") 
                    content.parentNode.classList.remove("openCell")
                }
            })
        })
    })

}