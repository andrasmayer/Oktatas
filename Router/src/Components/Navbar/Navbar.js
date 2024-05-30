export const Navbar = (path) =>{
    let context = ``

    Object.keys(path).forEach(index=>{
        if( ["","#","#error404"].includes(index) === false){
            context += `
                <div>
                    <a href="${index}">${path[index].title}</a>
                </div>
            `
       }
    })
    return context
}