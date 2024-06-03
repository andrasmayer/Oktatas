const {App} = await import(`./src/App.js${app_version}`)
const root = document.getElementById("root")

const myApp = new App("ezegytábla");
root.innerHTML += myApp.init()
myApp.events()

/*
const myApp2 = new App("table2");
root.innerHTML += myApp2.init()
myApp2.events()
*/