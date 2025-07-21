export let dayNames = []

export const dateFormat = (e) =>{
    let yy = e.getFullYear()
    let mm = e.getMonth()+1
    if(mm<10){ mm = `0${mm}` }
    let dd = e.getDate()
    if(dd<10){ dd = `0${dd}` }
    let dayNameLong = e.toLocaleDateString(navigator.language, { weekday: 'long' })
    dayNameLong = dayNameLong.charAt(0).toUpperCase() + dayNameLong.slice(1) 
    let dayNameShort = e.toLocaleDateString(navigator.language, { weekday: 'short' })
    dayNameShort = dayNameShort.charAt(0).toUpperCase() + dayNameShort.slice(1) 
    let monthNameLong = e.toLocaleDateString(navigator.language, { month: 'long' })
    monthNameLong = monthNameLong.charAt(0).toUpperCase() + monthNameLong.slice(1) 
    let monthNameShort = e.toLocaleDateString(navigator.language, { month: 'short' })
    monthNameShort = monthNameShort.charAt(0).toUpperCase() + monthNameShort.slice(1).split(".").join("")

    return({
        date:`${yy}-${mm}-${dd}`, 
        year:yy,
        month:mm,
        day: dd, 
        dayNameLong: dayNameLong,
        dayNameShort:dayNameShort,
        monthNameLong: monthNameLong,
        monthNameShort: monthNameShort,
        isWeekday: [6,0].includes(e.getDay()) === false,
        dayOfWeek:e.getDay()
    })
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
    const cal = {}
    const first = firstDateOfMonth(obj.date)
    const last = lastDateOfMonth(obj.date)
    for(let i= parseInt(first.day); i <= parseInt(last.day); i++){
       cal[i] = dateFormat( new Date(`${first.year}-${first.month}-${i}`) )
    }
    return cal
}

export const today = dateFormat(new Date())
