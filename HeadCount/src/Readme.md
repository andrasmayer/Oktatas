path sources

core : Components/path/path.js
translation: Components/Langs/Langs.js   //Needed for all language
nav-menu : Components/Navbar/Components/navMenu.js	//Needed for all language


db user 
CREATE USER 'db_user'@'localhost' IDENTIFIED BY '1Btm2';
GRANT ALL PRIVILEGES ON * . * TO 'db_user'@'localhost';
FLUSH PRIVILEGES;



setRegister eljárás törölhető, de a rá utaló részeket módosítani kell az updateRegisterre.
Ez erőző verzió duplikált, azokat törölni kell.