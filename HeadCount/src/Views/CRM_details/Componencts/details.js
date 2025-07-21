export const details = {
    phases:{
        phase_1:{
            name:"Adatbeérkezés",
            elements:[
                {name:"Összefoglaló jelentés",status:["Nem","Igen"],selected:0},
                {name:"Feltrárási napló",status:["Nem","Igen"],selected:0},
                {name:"Képek",status:["Nem","Részben","Igen"],selected:0},
                {name:"Adatlapok",status:["Nem","Részben","Igen"],selected:0},
                {name:"Leletkísérők",status:["Nem","Igen"],selected:0},
                {name:"Rajzok",status:["Nem","Igen"],selected:0},
            ]
        },
        phase_2:{
            name:"Digitalizálás",
            elements:[
                {name:"Adatbázis",status:["Nem","Igen"],selected:0},
                {name:"Vágás",status:["Nem","Folyamatban","Igen"],selected:0},
                {name:"Georeferálás",status:["Nem","Folyamatban","Igen"],selected:0},
                {name:"Felszín",status:["Nem","Folyamatban","Igen"],selected:0},
                {name:"Metszet",status:["Nem","Folyamatban","Igen"],selected:0},
                {name:"Részlet",status:["Nem","Folyamatban","Igen"],selected:0},
                {name:"Sír",status:["Nem","Folyamatban","Igen"],selected:0},
            ]
        },
   
        phase_3:{
            name:"Leletfeldolgozás",
            elements:[
                {name:"Beérkezés",status:["Nem","Igen"],selected:0},
                {name:"Mosás",status:["Nem","Folyamatban","Igen"],selected:0},
                {name:"Restaurálás",status:["Nem","Folyamatban","Igen"],selected:0},
                {name:"Lelet feldolgozósi dokumentáció",status:["Nem","Folyamatban","Igen"],selected:0},
                {name:"Szállítás",status:["Nem","Igen"],selected:0},
            ]
        },
        phase_4:{
            name:"Leadás",
            elements:[
                {name:"1. javító kör",status:["Nem","Igen"],selected:0},
                {name:"Válasz",status:["Nem","Igen"],selected:0},
                {name:"2. javító kör",status:["Nem","Igen"],selected:0},
                {name:"Válasz",status:["Nem","Igen"],selected:0},
                {name:"Végleges leadás",status:["Nem","Igen"],selected:0},
            ]
        }
    }
}