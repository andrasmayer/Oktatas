
export const loginCheck = (props) =>{
    let ratchetUserToken = JSON.parse( localStorage.getItem("ratchetUserToken") )
    if(ratchetUserToken == null){
        logInHandler(props)
    }
    else{
        logOutHandler(props)
        const user = document.querySelector(".user")
        const userId = document.querySelector(".userId")
        let ratchetUserToken = JSON.parse( localStorage.getItem("ratchetUserToken") )
        if( ratchetUserToken != null ){
            user.value = ratchetUserToken.userName
            userId.value = ratchetUserToken.userId
        }
    }
}
const logInHandler = (props) =>{
    const loginButton = document.querySelector(".loginButton")
    const user = document.querySelector(".user")
    const userId = document.querySelector(".userId")

    loginButton.addEventListener("click", function (e) {
        props.setItem("ratchetUserToken",`{"userName":"${user.value}","userId":"${userId.value}"}`)
        props.resource.connect( JSON.parse( localStorage.getItem("ratchetUserToken") ) )

        const loginControls = document.querySelector(".loginControls")
        loginControls.innerHTML = `<button class="logOut">LogOut</button>`
        logOutHandler(props)
    })
}
const logOutHandler = (props) =>{
    const logOut = document.querySelector(".logOut")
    logOut.addEventListener("click",()=>{
        props.removeItem("ratchetUserToken")
        const loginControls = document.querySelector(".loginControls")
        loginControls.innerHTML = `<button class="loginButton">LogIn</button>`
        const clients = document.querySelector(".clients")
        clients.innerHTML = ""
        logInHandler(props)

        const messageCTN = document.querySelector(".messageCTN")
        messageCTN.innerHTML = ""

        const userList = document.querySelector(".userList")
        userList.innerHTML = ""
    })
}