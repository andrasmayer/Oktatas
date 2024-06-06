const {path} = await import(`./Components/path/path.js${app_version}`)
const {router} = await import(`./Components/router/router.js${app_version}`)
const {Navbar} = await import(`./Components/Navbar/Navbar.js${app_version}`)

export const App = () =>{
    const nav = document.getElementById("nav") //hivatkozás a root id-jú div elemre
    const content = document.getElementById("content")

    nav.innerHTML = Navbar(path)
    const currentRoute = new router(path)
    currentRoute.events()

    onhashchange = () => { 
        nav.innerHTML = Navbar(path)
        const currentRoute = new router(path)
        currentRoute.events()
    }
}