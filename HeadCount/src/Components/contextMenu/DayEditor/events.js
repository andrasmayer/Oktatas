const {Ajax} = await import(`../../../Hooks/Ajax/Ajax.js${app_version}`)

export const events = (props) =>{


    const available = document.querySelector("available")
    const clickedDay = props.target.getAttribute("data-date")
    const originalState = parseInt(props.target.getAttribute("data-state"))
    const newState = props.state



    if(newState != originalState){
        props.target.setAttribute("data-state", newState)

        if(props.target.querySelector(".dayCtn") !== null){
            props.target.querySelector(".dayCtn").classList.remove("bg-light","bg-success","bg-primary","bg-danger","bg-warning")
            props.target.querySelector(".dayCtn").classList.add(props.colors[ newState])
        }
        else{
            props.target.classList.remove("bg-light","bg-success","bg-primary","bg-danger","bg-warning")
            props.target.classList.add(props.colors[ newState]) 

            console.log(`#s_${props.user}_${originalState}`)
            console.log(`#s_${props.user}_${newState}`)
            document.querySelector(`#s_${props.user}_${originalState}`).innerHTML--
            document.querySelector(`#s_${props.user}_${newState}`).innerHTML++

            
        }

       


        if(originalState == 2){
            available.innerHTML++
        }
        else if(newState == 2){
            available.innerHTML--
        }

        const getRegister = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetchColumn",procedure:"getRegister",parameters:`'${props.user}','${clickedDay}'`}
        })
          console.log(getRegister)
        //getRegister == 0 ? insertColumns(props.user, clickedDay, state, props.user) : updateColumns(props.user, clickedDay, props.state, props.user)
       

    }
           
}