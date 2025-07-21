let {navMenu} = await import(`./navMenu.js${app_version}`)
const {Langs} = await import(`../../Langs/Langs.js${app_version}`)
const {Ajax} = await import(`../../../Hooks/Ajax/Ajax.js${app_version}`)
const validateMenu = (itm,url,props,title,jobCode,empCount,view)=>{
    if(view == "#supervisor" && empCount == 0 ){ return false }
    return  itm.login == null && url != "#login" || 
            props.authToken.jwt == null && itm.login == null ||
            props.authToken.jwt != null && itm.login == true  && ( itm.auth.includes(jobCode) || itm.auth == null) || 
            props.authToken.jwt != null && itm.login == true && ( itm.auth == null || itm.auth.length == 0) ||
            view == "#supervisor" && empCount > 0
            ?
            `<li class="nav-item">
                <a class="nav-link active" aria-current="page" href="${url}">${title}</a>
            </li>`
            :
            ""
}

export const navEvents = (props) =>{
  
    const user = Ajax({
        url:"./server/Procedures/Fetch.php",
        method:"post",
        response:"json",
        data:{mode:"fetch",procedure:"userToken",parameters:`'${props.authToken.jwt}'`}
    })
   
    if(user.id == null && props.authToken.jwt != null){
        console.log(window.localStorage.getItem("authToken"))
        console.log(location.hash + " " +user.id )
        window.localStorage.removeItem("authToken")
        location.hash = "#home" 
    }

    const curLang = Langs[props.langCode]

    let NavMenu = ``
    Object.keys(navMenu).forEach(key=>{
        const subLinks = navMenu[key].content
        if( props.path[key] != null ){
            const menu_ = validateMenu(props.path[key],key, props, curLang.views[key].title, parseInt(user.jobCode),user.empCount,key)
            NavMenu += menu_ == false ? "" : menu_
        }
        else if(  subLinks != null){
           
            let dropdownItems = ``
            subLinks.forEach(key2=>{
                const menu_ = validateMenu(props.path[key2],key2, props,curLang.views[key2].title , parseInt(user.jobCode),user.empCount, key2 )
                dropdownItems += menu_ == false ? "" : menu_
            })
            
            if( dropdownItems != ""){
                NavMenu +=  `
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown_${key}" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    ${curLang.navBar[key]}
                    </a>
                    <ul class="dropdown-menu p-2" aria-labelledby="navbarDropdown_${key}">${dropdownItems}</ul>
                </li>`
            }
        }
    })
    

    const navBar = document.getElementById("navBar")
    const navbarSupportedContent = document.getElementById("navbarSupportedContent")
    navbarSupportedContent.innerHTML =  navbarSupportedContent.innerHTML
    const navbar_nav = navbarSupportedContent.querySelector(".navbar-nav")

    navbar_nav.innerHTML += NavMenu

    if( ["null",null].includes(props.authToken.jwt) === false){
        navbar_nav.innerHTML += `<button id="logOut" class="btn btn-danger fa fa-power-off position-absolute" style="right:100px;top:15;"></button>`
    }
    const logOut = document.getElementById("logOut")
    if(logOut != null){
        logOut.addEventListener("click",()=>{
            window.localStorage.removeItem("authToken")
            location.href = "#home"
            location.reload();
        })
    }
}