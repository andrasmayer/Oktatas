const {Sample} = await import(`./Components/Sample/Sample.js${app_version}`)

export const App = ()=>{
    const root = document.getElementById("root")

    const context = new Sample()
    root.innerHTML = context.init()
    context.events()
}