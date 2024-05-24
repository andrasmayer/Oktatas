const {TableHandler} = await import(`./Components/TableHandler/TableHandler.js${app_version}`)
const {list} = await import(`./Components/list/list.js${app_version}`)
const {list2} = await import(`./Components/list/list2.js${app_version}`)

export const App = () =>{
    const root = document.getElementById("root")
    const context = new TableHandler()
    
    root.innerHTML = `<section>${context.init(list)}</section>`
    root.innerHTML += `<section>${context.init(list2)}</section>`
    context.events()
   
}