

const dropDownStatus = {
    on:{ opacity: 1,display:"block" },
    off:{ opacity:0,display:"none" }
}

const dropdowns = document.querySelectorAll(".dropdown-toggle")
dropdowns.forEach((itm,key)=>{
    itm.addEventListener("click",()=>{
        //Ez az elem saját tulajdonsága
        const menu = itm.parentNode.querySelector(".dropdown-menu")
        itm.classList.toggle("toggled")
        const toggled =  itm.classList.contains("toggled") ? "on" : "off"
        menu.animate(dropDownStatus[toggled], {  duration: 100,  fill: "forwards"})


        //Ez az összes többi elem tulajdonsága
        dropdowns.forEach((itm2,key2)=>{
            const inner_toggled =  itm2.classList.contains("toggled") ? "on" : "off"
            const inner_menu = itm2.parentNode.querySelector(".dropdown-menu")
            if(key != key2  && inner_toggled == "on"){
                itm2.classList.toggle("toggled")
                inner_menu.animate(dropDownStatus["off"], {  duration: 100,  fill: "forwards"})
            }
         })
    })
})





const navMenu = document.getElementById("myNav")
const navItem = document.querySelectorAll(".nav-item")
const hamburger = document.querySelector(".hamburger")
const navBrand = document.querySelector(".nav-brand")


//Hash tiltása
const dropdownToggle = document.querySelectorAll(".dropdown-toggle")
dropdownToggle.forEach(itm=>{
    itm.addEventListener("click",(e)=>{
        e.preventDefault()
    })
})



hamburger.addEventListener("click",()=>{
    navItem.forEach(itm=>{
            itm.classList.toggle("d-none")
        })
})

const checkSceenWidth = () =>{
    if(window.innerWidth > window.innerHeight){
        navMenu.classList.remove("nav-minimalized")
        navItem.forEach(itm=>{
            itm.classList.remove("d-none")
            itm.classList.remove("w-100")
        })
        hamburger.classList.add("d-none")
        navBrand.classList.remove("d-block")
    }
    else{
        navMenu.classList.add("nav-minimalized")
        navItem.forEach(itm=>{
            itm.classList.add("d-none")
            itm.classList.add("w-100")

        })
        hamburger.classList.remove("d-none")
        navBrand.classList.add("d-block")
    }
}
checkSceenWidth()

window.addEventListener("resize",()=>{
    checkSceenWidth()
})


window.addEventListener("click",(e)=>{

    const isDropdown = e.target.classList.contains("dropdown-toggle") 
    if( isDropdown === false){
        dropdowns.forEach((itm,key)=>{
            const menu = itm.parentNode.querySelector(".dropdown-menu")
            itm.classList.remove("toggled")
            const toggled =  itm.classList.contains("toggled") ? "on" : "off"
            menu.animate(dropDownStatus["off"], {  duration: 100,  fill: "forwards"})
            })
    }


})



const router = ()=>{
    let hash = ["","#"].includes(location.hash) ? "home" : location.hash
    console.log(hash)
}
router()

onhashchange = (event) => {
    router()
}