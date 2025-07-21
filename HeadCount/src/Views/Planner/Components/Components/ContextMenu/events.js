const {Ajax} = await import(`../../../../../Hooks/Ajax/Ajax.js${app_version}`)




const sendMail =(props)=>{
    if( ["#hr","#supervisor"].includes(location.hash) == false){ //Csak akkor meg mail, ha az érintett állít
        const user = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetch",procedure:"getUserById",parameters:`'${props.user}'`}
        })


        const emails = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetchAll",procedure:"getNotificaionRecipe",parameters:`'sickAndHolyday'`}
        })

        


        //Felettes
        emails.push(
            Ajax({
                url:"./server/Procedures/Fetch.php",
                method:"post",
                response:"json",
                data:{mode:"fetch",procedure:"getSupervisorId",parameters:`'${props.user}'`}
            })
        )

        const holydayCatList = {2:props.lang.dayOff, 3:props.lang.sickDay}

        const mailMsg = 
        `<div>
            <h3>${user.username}</h3>
            <b>${props.date}</b> napra <b>${holydayCatList[props.state]}</b> került beállításra.
        </div>`


        
        emails.forEach(mail=>{
            const data = {mail:mail.email,message:mailMsg}
            Ajax({
                url:"./server/vendor/phpmailer/sendmail_any.php",
                method:"post",
                data:data
            })
        })

        
        //alert(props.lang[emailStatus])
    }
}
export const events = (props) =>{
    
    const jwt = JSON.parse(localStorage.getItem("authToken")).jwt
    const editor =  Ajax({
        url:"./server/Procedures/Fetch.php",
        method:"post",
        response:"json",
        data:{mode:"fetch",procedure:"userToken",parameters:`'${jwt}'`}
    }).id

    const available = location.hash == "#planner" ? document.querySelector("available") : props.target.parentNode.parentNode.querySelector("available")
    const clickedDay = props.target.getAttribute("data-date")
    const originalState = parseInt(props.target.getAttribute("data-state"))
    const newState = props.state

    if(available.innerHTML <= 0 && newState == 2){
        alert(props.lang.dayContext.outOfHolyday)
        return false
    }

    if(newState != originalState){
        props.target.setAttribute("data-state", newState)
        if(props.target.querySelector(".dayCtn") !== null){
            props.target.querySelector(".dayCtn").classList.remove("bg-light","bg-success","bg-primary","bg-danger","bg-warning")
            props.target.querySelector(".dayCtn").classList.add(props.colors[ newState])
        }
        else{
            props.target.classList.remove("bg-light","bg-success","bg-primary","bg-danger","bg-warning")
            props.target.classList.add(props.colors[ newState]) 

            if(originalState != 0){ 
                document.querySelector(`#s_${props.user}_${originalState}`).innerHTML--
            }
            if(newState != 0){ 
                document.querySelector(`#s_${props.user}_${newState}`).innerHTML++
            }
        }
        if(originalState == 2){
            available.innerHTML++
        }
        else if(newState == 2){
            available.innerHTML--
        }

        



        if( ["2","3"].includes(newState) ){
           sendMail({user:props.user, date:props.date, state:props.state, editor:editor, lang:props.lang.dayContext})
        }

        const getRegister = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetchColumn",procedure:"getRegister",parameters:`'${props.user}','${clickedDay}'`}
        })

        getRegister == 0 ? 
        props.insertColumns(props.user, props.date, props.state, editor) 
        :
        props.updateColumns(props.user, props.date, props.state, editor) 



    }
}