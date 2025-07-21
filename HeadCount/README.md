After install todo list:

Core:
install nodejs

Apps:
    name : Orgchart.js
    src : vendor/OrgChart-master

    commands:
        npm install
        npm install -g gulp-cli
        gulp build

db user:
    CREATE USER 'db_user'@'localhost' IDENTIFIED BY '1Btm2';
    GRANT ALL PRIVILEGES ON *.* TO 'db_user'@'localhost' WITH GRANT OPTION;
    FLUSH PRIVILEGES;