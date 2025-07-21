const {Ajax} = await import(`../../Hooks/Ajax/Ajax.js${app_version}`)


export class Notifications{
    constructor(props){
        this.props = props

        this.user  = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetch",procedure:"userToken",parameters:`'${props.authToken.jwt}'`}
        })

        this.notification = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetch",procedure:"getUserNotification",parameters:`'${this.user.id}'`}
        })


    }
    prepare(){
        let prepare = {}
        if(this.notification == false){
            const emailCategory = document.querySelectorAll(".emailCategory")
            emailCategory.forEach(itm=>{
                prepare[itm.name] = {user:this.user.id, type:itm.name, value:false}

            })
            this.notification = prepare
        }
        else{
            const keys = Object.keys(this.notification).filter(key=>{
                return ["uid","id"].includes(key) === false
            })

            keys.forEach(itm=>{
                prepare[itm] = {user:this.user.id, type:itm, value:this.notification[itm]}
            })
            this.notification = prepare

        }
    }
    init(){
        return `
            <div class="p-2">
                <div>
                    <label>Szabadság és betegség</label>
                    <input class="emailCategory sickAndHolyday" name="sickAndHolyday" type="checkbox">
                </div>
            </div>
            `
    }
    events(){
        const emailCategory = document.querySelectorAll(".emailCategory")
        this.prepare()


        emailCategory.forEach(itm=>{
            itm.checked = this.notification[itm.name].value == 1
            itm.addEventListener("change",()=>{
               const res =  Ajax({
                    url:"./server/Procedures/Fetch.php",
                    method:"post",
                    //response:"json",
                    data:{mode:"fetchColumn",procedure:"updateUserNotification",parameters:`'${this.user.id}','${itm.name}','${itm.checked === true ? 1 : 0}'`}
                })
                console.log(res)


            })


        })
    }
}