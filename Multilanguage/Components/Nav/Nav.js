import {path} from "../Router/path.js"
import {langSelect} from "../langSelect/langSelect.js"


export const Nav = (activeLang,Langs,Lang)=>{
    const navBar = document.getElementById("navBar")
    let context = ``
    Object.keys(path).forEach(key=>{
        context += `
            <div>
                <a href="${key}">${activeLang[key].title}</a>
            </div>
            `
    })

    navBar.innerHTML = context

    const ls =  new langSelect(Langs,Lang,[activeLang,Langs,Lang])

    navBar.innerHTML += ls.init()
    ls.events()
}
