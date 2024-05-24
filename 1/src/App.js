const {Sample} = await import(`./Components/Sample/Sample.js${app_version}`)

export const App = ()=>{
    const root = document.getElementById("root")
    const context = new Sample({name:"Béla"})

    root.innerHTML = `
    <div>
        <h1>Helló világ</h1>
        ${context.init()}
    </div>`
    context.events()
}