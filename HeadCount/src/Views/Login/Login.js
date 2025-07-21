const {Ajax} = await import(`../../Hooks/Ajax/Ajax.js${app_version}`)

export class Login{
    constructor(props){
        this.props = props
        this.lang = props.lang
    }
    init(){
        return `
        <div class="bg-light"  style="min-height:calc(100vh - 56px)">
            <div class="d-flex justify-content-center">
                <div class="mt-5 col-10 col-lg-3 bg-secondary p-3 rounded">
                    <div class="text-center h4 text-light">${this.lang.title}</div>
                    <div class="p-3 ">
                        <input id="loginName" class="form-control" placeholder="${this.lang.loginName}">
                    </div>
                    <div class="p-3 ">
                        <input id="passWord" class="form-control" placeholder="${this.lang.passWord}" type="password">
                    </div>
                    <div class="text-center">
                        <button id="logInBtn" class="btn btn-primary">Belépés</button>
                    </div>
                </div>

            </div>
            <div id="errorMessage" class="h3 text-danger text-center p-3"></div>

        </div>
        `
    }
    events(){
        const loginName = document.getElementById("loginName")
        const passWord = document.getElementById("passWord")
        const logInBtn = document.getElementById("logInBtn")
        const errorMessage = document.getElementById("errorMessage")


        const loginCheck = () =>{
            const res = Ajax({
                url:"./server/Login/Login.php",
                method:"post",
                response:"json",
                data:{loginName:loginName.value,passWord:passWord.value}
             })
            
            errorMessage.innerHTML = ""
            if( res == false ){ 
                errorMessage.innerHTML = "Hibás adatok"
            }
            else{
                console.log(res)
                window.localStorage.setItem( "authToken",JSON.stringify(res) )
                location.href = "#home"
                location.reload()
            }
        }
        loginName.addEventListener("keyup",(e)=>{ if( e.keyCode == 13 ){ loginCheck() } })
        passWord.addEventListener("keyup",(e)=>{ if( e.keyCode == 13 ){ loginCheck() } })
        logInBtn.addEventListener("click",(e)=>{ loginCheck() })
    }
}