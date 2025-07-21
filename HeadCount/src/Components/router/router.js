const {Ajax} = await import(`../../Hooks/Ajax/Ajax.js${app_version}`)
const {Langs} = await import(`../Langs/Langs.js${app_version}`)
export class router{
    constructor(props){

        const user = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetch",procedure:"userToken",parameters:`'${props.authToken.jwt}'`}
        })
    
        //Kiléptetés invalid tokennél
        if(user.id == null && props.authToken.jwt !== null){
            window.localStorage.removeItem("authToken")
            if(location.hash != "#home" ){
                location.hash = "#home" 
            }
            else{
                location.reload()
            }
            
        }

        if(user === false && props.authToken.jwt != null){
            window.localStorage.removeItem("authToken")
            location.reload()
        }

        if(user.passwordChanged == 0 && location.hash != "#profile"){
            location.hash = "#profile"
        }

        const path = {}
        Object.keys(props.path).forEach(key=>{
            const itm = props.path[key]
            if( 
 
                itm.login == null && key != "#login" || 
                props.authToken.jwt == null && itm.login == null ||
                props.authToken.jwt != null && itm.login == true  && ( itm.auth.includes( parseInt(user.jobCode) ) || itm.auth == null) || 
                props.authToken.jwt != null && itm.login == true && ( itm.auth == null || itm.auth.length == 0)

            ){
                path[key] = itm
            }
        })
        this.path = path
        let route = location.hash.split("?")[0]

        if( ["","#"].includes(route) ){ route = "#home" }
        if( this.path[route] == null){ route = "#error404"}
        const languagePackage = Langs[props.langCode].views[route];
        const content= document.getElementById("pageContent")
        const activeRoute = new this.path[route].page({lang:languagePackage,authToken:props.authToken,langCode:props.langCode})
        content.innerHTML = activeRoute.init()
        activeRoute.events()
        document.title = languagePackage.title
    }
}