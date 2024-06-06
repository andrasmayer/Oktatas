const {ajax} = await import(`../../Hooks/ajax/ajax.js${app_version}`)



export class Login{
    constructor(props){
        this.props = props
    }
    init(){





        return `
        <div class="d-flex justify-content-center">
            <form class="col-12 col-lg-4 p-3 ps-4 pe-4  bg-light rounded">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input class="form-control" id="userName" aria-describedby="emailHelp">
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="passWord">
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button class="btn btn-primary submit" >Submit</button>
            </form>
        </div>
            `
    }
    events(){
        const body = document.querySelector("body")
        body.classList.add("bg-dark")

        const userName = document.getElementById("userName")
        const passWord = document.getElementById("passWord")
        const submit = document.querySelector(".submit")

        submit.addEventListener("click",()=>{

            if(userName.value.length == 0 || passWord.value.length == 0){
                alert("Valamelyik mező üres") 
            }
            else{
                const res =  ajax("post","server/Login/Login.php","json",{userName:userName.value, passWord:passWord.value})

                res === false ?   alert("Hibás adatok")  : console.log(res)
            }

 

            //console.log( `${userName.value} ${passWord.value}` )

        })


    }
}