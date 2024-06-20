import {Langs} from "./Components/Langs/Langs.js"
import {router} from "./Components/Router/router.js"
  
const root = document.getElementById("root")

let Lang = window.localStorage.getItem("Lang")
if(Lang == null){
    window.localStorage.setItem("Lang","hu")
    const Lang = "hu"
}
let activeLang = Langs[Lang]

router(activeLang,Langs,Lang)

onhashchange = (event) => {
    router(activeLang,Langs,Lang)
}

