const {Langs} = await import(`../../Components/Langs/Langs.js${app_version}`)

export let dayNames = []

export const dateSetup = (Lang) =>{
    dayNames = Langs[Lang].dayNames
    return dayNames
}


export const dateFormat = (e) =>{
    let yy = e.getFullYear()
    let mm = e.getMonth()+1
    if(mm<10){ mm = `0${mm}` }
    let dd = e.getDate()
    if(dd<10){ dd = `0${dd}` }
    return({date:`${yy}-${mm}-${dd}`, year:yy,month:mm,day: dd, dayName:dayNames[ e.getDay() == 0 ? 6 : e.getDay()-1],dayOfWeek:e.getDay()})
}
export const dateDiff = (date1,date2) =>{
    date1 = new Date(date1.date)
    date2 = new Date(date2.date)
    const Difference_In_Time = date2.getTime() - date1.getTime()
    const Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
    return Difference_In_Days
}
export const firstDateOfMonth = (e) =>{
    const date = e == null ? new Date() : new Date(e)
    const month = date.getMonth(); // January
    const d = new Date(date.getFullYear(), month, 1);
    return  dateFormat(d)
}
export const lastDateOfMonth = (e) =>{
    const date = e == null ? new Date() : new Date(e)
    const month = date.getMonth(); // January
    const d = new Date(date.getFullYear(), month + 1, 0);
   return  dateFormat(d)
}

export const addXDays = (obj)=>{
    const dateTime =  obj.date.setDate(    obj.date.getDate() + obj.days)
    return dateFormat( new Date(dateTime) )
}

export const calendar = (obj) =>{
    const dayNames = dateSetup(obj.lang)
    const cal = {}
    const first = firstDateOfMonth(obj.date)
    const last = lastDateOfMonth(obj.date)
    for(let i= parseInt(first.day); i <= parseInt(last.day); i++){
       cal[i] = dateFormat( new Date(`${first.year}-${first.month}-${i}`) )
    }
    return cal
}

export const today = () =>{
    return dateFormat(new Date())
}