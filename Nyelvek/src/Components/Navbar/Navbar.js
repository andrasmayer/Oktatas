export const Navbar = (path,lang) =>{
    let context = `<div>`
    Object.keys(path).forEach(index=>{
        if( ["","#","#error404"].includes(index) === false){
            if( ["","#"].includes(index) ){ index = "#home" }
            context += `
                <div>
                    <a href="${index}">${lang.langs[lang.langCode].path[index].title}</a>
                </div>
            `
       }
    })
    context += `</div>`
    return context
}