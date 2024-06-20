import {path} from "../Router/path.js"
import {Nav} from "../Nav/Nav.js"

export const router = (activeLang, Langs, Lang)=>{
    let route = ["","#"].includes(window.location.hash) ? "#home" : window.location.hash
    if(path[route] == null){ route = "#error404" }

    document.title =  activeLang[route].title

    const view = new path[route](activeLang[route])
    root.innerHTML = view.init()
    view.events()
    Nav(activeLang, Langs, Lang)
}