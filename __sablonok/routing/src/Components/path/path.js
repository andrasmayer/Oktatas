const {Home} = await import(`../../Views/Home/Home.js${app_version}`)
const {About} = await import(`../../Views/About/About.js${app_version}`)
const {Error404} = await import(`../../Views/Error404/Error404.js${app_version}`)

export const path = {
    ""      :{title:"Főoldal", page:Home},
    "#"     :{title:"Főoldal", page:Home},
    "#home" :{title:"Főoldal", page:Home},
    
    "#about":{title:"Rólunk", page:About},
    "#error404":{title:"404-es hiba", page:Error404},
}
