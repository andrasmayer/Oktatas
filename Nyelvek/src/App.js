const {path} = await import(`./Components/path/path.js${app_version}`)
const {router} = await import(`./Components/router/router.js${app_version}`)
const {Navbar} = await import(`./Components/Navbar/Navbar.js${app_version}`)

const {Languages} = await import(`./Components/Languages/Languages.js${app_version}`)
const {LangSelector} = await import(`./Hooks/LangSelector/LangSelector.js${app_version}`)

export const App = () =>{

    const langCode = localStorage.getItem("langCode") == null ? "hu" : localStorage.getItem("langCode")
    const nav = document.getElementById("nav") //hivatkozás a root id-jú div elemre
    const content = document.getElementById("content")

    const langSel = new LangSelector({langCode:langCode, langs:Languages }) 
    nav.innerHTML = langSel.init()
    nav.innerHTML += Navbar(path,{langCode:langCode, langs:Languages })
    const currentRoute = new router(path,Languages[langCode])
    currentRoute.events()
    langSel.events()


    onhashchange = () => { 
        const langSel = new LangSelector({langCode:langCode, langs:Languages }) 
        nav.innerHTML = langSel.init()
        nav.innerHTML += Navbar(path,{langCode:langCode, langs:Languages })
        const currentRoute = new router(path,Languages[langCode])
        currentRoute.events()
        langSel.events()
    }
}