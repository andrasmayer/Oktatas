const {Ajax} = await import(`../../Hooks/Ajax/Ajax.js${app_version}`)

export const updateUserData = (uid)=>{
    console.log(uid)

    const emp = Ajax({
        url:"./server/Procedures/Fetch.php",
        method:"post",
        response:"json",
        data:{mode:"fetch",procedure:"empCore",parameters:`'${uid}','${null}'`}
    })

    let EMP_DAYS = {}
    for(let i=1; i<=12; i++){
       const d_ = Ajax({
                    url:"./server/Procedures/Fetch.php",
                    method:"post",
                    response:"json",
                    data:{mode:"fetchAll",procedure:"getRegisterByUser",parameters:`'${uid}','${2025}','${i}'`}
                })

        d_.forEach(d=>{
            if( [5,6,7].includes(parseInt(d.type)) ){
                EMP_DAYS[d.date] = d.type
            }
        })
    }

    
    days.forEach(day=>{
        if(  day.date >= emp.hireDate && EMP_DAYS[day.date] == null){
            console.log(`'${uid}','${day.date}','${day.type}','${1}'`)

            Ajax({
                url:"./server/Procedures/Fetch.php",
                method:"post",
                //response:"json",
                data:{mode:"fetchAll",procedure:"updateRegister",parameters:`'${uid}','${day.date}','${day.type}','${1}'`}
            })

        }
    })



}

const days = Ajax({
    url:"./server/Procedures/Fetch.php",
    method:"post",
    response:"json",
    data:{mode:"fetchAll",procedure:"getMandatoryHolydays",parameters:`'${new Date().getFullYear()}'`}
})


export const MandatoryLeaves = (button) =>{

    //Dolgozók listája
    const users = Ajax({
        url:"./server/Procedures/Fetch.php",
        method:"post",
        response:"json",
        data:{mode:"fetchAll",procedure:"list_users",parameters:`'1'`}
    })

    let counter = 1
    console.log(users.length)
    users.forEach(user=>{
        updateUserData(user.id)
    
        if(counter == users.length){
            if(button != null){
                button.classList.remove("btn-danger")
            }
            alert("Javítás kész")
        }
        counter++
    })
   
    
}

