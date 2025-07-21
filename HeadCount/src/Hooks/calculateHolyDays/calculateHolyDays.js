const {holyDayRules} = await import(`../../Rules/holyDayRules.js${app_version}`)
export const calculateHolyDays = (data) =>{
    const age = new Date().getFullYear()-data.birth
    let holyDays = 0
    if(age < 18){   holyDays = holyDayRules.age["18-"] }
    else if(age < 25){   holyDays = holyDayRules.age["18-24"] }
    else if(age < 28){   holyDays = holyDayRules.age["25-27"] }
    else if(age < 31){   holyDays = holyDayRules.age["28-30"] }
    else if(age < 32){   holyDays = holyDayRules.age["31-32"] }
    else if(age < 35){   holyDays = holyDayRules.age["33-34"] }
    else if(age < 37){   holyDays = holyDayRules.age["35-36"] }
    else if(age < 39){   holyDays = holyDayRules.age["37-38"] }
    else if(age < 41){   holyDays = holyDayRules.age["39-40"] }
    else if(age < 43){   holyDays = holyDayRules.age["41-42"] }
    else if(age < 45){   holyDays = holyDayRules.age["43-44"] }
    else{   holyDays = holyDayRules.age["45"] }
    const fromChild = holyDayRules.clildren[data.childs]
    return  20 + holyDays + fromChild
}