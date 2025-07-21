const {Ajax} = await import(`../../Ajax/Ajax.js${app_version}`)
export const PDF = (obj) =>{   
    const labourTime= [8,6,4]
    let list = ""
    obj.emps.forEach(itm=>{
        let startTime = 8
        itm.labourTime = JSON.parse(itm.labourTime)
        const emp = itm

        const dataSet = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetch_unique",procedure:"getRegisterByUser",parameters:`'${itm.id}','${obj.date.year}','${obj.date.month}'`}
        })

        const locations = [itm.locationName]
        if(emp.location2 != null){
            locations.push(itm.locationName2)
        }
        locations.forEach((location,key)=>{    
            let context = ""
            Object.keys(obj.calendar).forEach(itm=>{
                const date = obj.calendar[itm].date
                const dayName = obj.calendar[itm].dayName
                const dayOfWeek = obj.calendar[itm].dayOfWeek
                let content = ""

                if(emp.maternityLeave == 0){

                    if( [6,0].includes(dayOfWeek) && dataSet[date] == null){
                        content = `<div class="col-12">Hétvége</div>`
                    }
                    else if( dataSet[date] != null  && dataSet[date].type > 1 ){
                        const tmp = parseInt(dataSet[date].type)
                        const type =  [2,6].includes(tmp) ? "Szabadság" : obj.stats[tmp]
                        content = `<div class="col-12">${type}</div>`
                    }
                    else if(dataSet[date] != null){
                        content = `
                        <div class="row ${content.class}">
                            <div class="col-4 border-end ">${startTime}:00</div>
                            <div class="col-4 ">${ startTime + parseInt(emp.labourTime[key])}:00</div>
                            <div class="col-4 border-start">${emp.labourTime[key]}</div>
                        </div>`
                    }
                }
                else{
                    if( [6,0].includes(dayOfWeek) && dataSet[date] == null){
                        content = `<div class="col-12">Hétvége</div>`
                    }
                    else{
                        content = `<div class="col-12">Szülési szabi</div>`
                    }
                }
                context += `
                <div class="row  border-start border-end border-bottom m-0 p-0 text-center" >
                    <div class="col-3 ">
                        <div class="row p-0">
                            <div class="col-6 border-end p-0">${date}</div>
                            <div class="col-6 border-end">${dayName}</div>
                        </div>
                    </div>
                    <div class="col-9">${content}</div>    
                </div>`
            })

            const logo = location == "ExVoto" ? "ExVoto.jpg" : "logo.png"
            let userData = `
            <div class=" p-4   PDF ">
                <div class="col-5 text-center">
                    <img class="logo" src="./src/img/${logo}">
                    <div class="h5" >Munkaidő nyilvántartás</div>
                </div>
                <div>
                    <strong>Telephely:</strong> ${location}</div>
                <div class="row  border-top border-start" >
                    <div class="col-3   border-bottom " style="height:64px;font-size:40px;" >${obj.date.year}/${obj.date.month}<br></div>
                    <div class="col-9 ">
                        <div class="row">
                            <div class="col-12 w-100 border-bottom border-start border-end">
                                <strong class="h4">Név:</strong>
                                <label class="h5">${itm.username}</label>
                            </div>
                            <div class="col-12 pb-2 border-start border-end text-center border-bottom">Munkaidő</div>
                        </div>
                    </div>
                </div>
                <div class="row border-bottom border-start border-end" >
                    <div class="col-3">
                        <div class="row">
                            <div class="col-6 border-end">Dátum</div>
                            <div class="col-6 ">Nap</div>
                        </div>
                    </div>
                    <div class="col-9 border-start">
                        <div class="row text-center">
                            <div class="col-4 border-end ">Kezd.</div>
                            <div class="col-4 ">Vége</div>
                            <div class="col-4 border-start">óra</div>
                        </div>     
                    </div>    
                </div>
                <div class="row">
                ${context}
                </div>
            </div>`
            list += userData + "</div>"
            startTime += parseInt(emp.labourTime[key])
        })
    })
    return list
}