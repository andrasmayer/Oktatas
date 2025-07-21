export const Langs = {
    "hu" : {
        dayNames : [
            "Hét",
            "Kedd",
            "Szer",
            "Csüt",
            "Pén",
            "Szo",
            "Vas"
        ],
        navBar:{
            navBrand: "Jelenlét",
            adminMenu:"Adminisztráció",
            taskManager:"Feladatok",
            CRM : "Project Management",
            notifications : "Értesítések",
        },
        dayContext:{
            announcements:"Közlemények",
            events:"Események",
            save:"Mentés",
            cancel:"Mégsem",
            commentSaved:"Megjegyzés rögzítve",
            msg_ok : "Megjegyzés rögzítve!",
            comment_error : "Rögzítési hiba!",
            settings:"Jelenlét beállítása",
            emptyDay:"Üres nap",
            workDay:"Munkanap",
            dayOff:"Fizetett szabadság",
            sickDay:"Betegség",
            nonPaidDay:"Nem fizetett távollét",
            mailSent:"Értesítő email kiküldve a felettesnek",
            serverError:"Levél küldési hiba",
            outOfHolyday:"Nincs elegendő szabadság",
            pleaseChose:"Válassz távollét kategóriát"           
        },
        title : "Magyar",
        views:{
            "#home":{
                title:"Főoldal",
                header:`<div>Az oldal a munkaidő nyilvántartás hatékony követésének érdekében készült.</div>
                        <div>Néhány kattintással beállítható a munkanap/szabadság/betegség.</div>`,
                colorCodes:"Színkódok",
                color:"Szín",
                meaning:"Jelentés",
                null: "Nincs beállítva",
                work:"Munkanap",
                hDay:"Szabadság",
                sick:"Betegség",
                nonPaid:"Nem fizetett szabadnap",
                mandatoryHoliday: "Kötelező szabadság",
                paidHolyDay:"Ünnepnap",
                restDay:"Pihenőnap",
            },
            "#about":{
                title:"Rólunk"
            },
            "#error404":{
                title:"Az oldal nem található"
            },
            "#login":{
                title:"Bejelentkezés",
                loginName:"Felhasználónév",
                passWord:"Jelszó",
            },
            "#loginTest":{
                title:"loginTest",
                accessDenied:"Hozzáférés megtagadva!"
            },
            "#profile":{
                title:"Adatlapom",
                info:"Információk",
                lastLogin:"Utolsó belépés időpontja",
                pwChange:"Jelszó váltás",
                curPw : "Jelenlegi jelszó",
                newPw : "Új jelszó",
                newPwAgain : "Jelszó újra",
                update:"Módosítás",
                success:"Siker",
                msg_ok:"Módosítás sikeres",
                msg_error:"Hiba",
                passwordError:"Nem ez a jelenlegi jelszavad",
                passwordsNotMatch:"Jelszavak nem egyeznek",
                changePW:"Változtasd meg a jelszavad",
                passwordShort:"A jelszó túl rövid, minimum 5 karakter kell",
            },
            "#planner":{
                holydayCore:"Alap szabadság",
                holydayTotal:"Éves szabadságkeret",
                details:"Részletek",
                title:"Tervező",
                monthClosed: "A hónapot zárolta a HR",
                prevHolydays:"Áthozott szabadság",
                holyDaysBase:"Éves szabadságkeret:",              
                used:"Kivett szabadság",              
                holyDaysTotal:"Összesen:",              
                holyDaysRemaining:"Felhasználható:",              
                holyDaysFromLastYear:"Előző év (Jan. 8-ig kivehető):",
                schedule:" évi kötelező szabadságok",
                age:"Életkor:",
                children:"Gyermekek után:",
                otherHolyday:"Egyéb jogcím:",
                yearCalendar:"Éves naptár",
                multiDays:"Több napi távollét beállítása",

                           
            },
            "#hr":{
                title:"Hr adminisztráció",
                name:"Név",
                supervisor:"Felettes",
                summary:"Összegzés",
                closeMonth:"Hózárás",

                sum:"Keret",
                work:"M",
                hDay:"FSZ",
                sick:"BSZ",
                nonPaid:"FNSZ",
                multiDays:"Több napi távollét beállítása",

            
            },
            "#supervisor":{
                title:"Beosztottaim",
                name:"Név",
                supervisor:"Felettes",
                summary:"Összegzés",
            },
            
            "#adminEmp":{
                title:"Dolgozók",
                search:"Keresés",

                name:"Dolgozó neve",
                authLevel:"Jogosultság",
                birthYear:"Születési dátum",
                childCount:"Gyermekek száma",
                holydays:"Szabadságok száma",
                msg_error : "Hiba!",
                success: "Siker",
                msg_ok : "Adatok módosítva!",
                msg_age_low : "Életkor kisebb, mint 18 év",
                place:"Telephely",
                createUser:"Új felhasználó",
                supervisor:"Felettes",
                chose :"Kérlek válassz",
                hireDate:"Belépés",
                active:"Aktív",
                inactive:"Újra aktiválás",
                terminateDate:"Kilépés",
                jobType:"Munkaidő (óra)",
                prevHolydays:"Áthozott szabadságok",
                otherHolydays:"Egyéb szabadságok",
                otherHolydays:"Egyéb jogcím",            
                holyDayTotal:"Összes szabadság",            
                holyDayCurrent:"Fennmaradó szabadság",            
                holyDayTotal:"Összes szabadság",
                holydayTab:"Szabadságok",
                logTab:"Előzmények",
                notifications:"Értesítések",           
               

            },
            "#createUser":{
                title:"Új felhasználó",
                name:"Dolgozó neve",
                authLevel:"Jogosultság",
                birthYear:"Születési dátum",
                childCount:"Gyermekek száma",
                holydays:"Szabadságok száma",
                msg_error : "Hiba!",
                success: "Siker",
                msg_ok : "Felhasználói fiók látrehozva!",
                msg_age_low : "Életkor kisebb, mint 18 év",
                place:"Telephely",
                tips:"Gépeld be a felhasználó nevét, majd nyomj ENTER-t, ezzel létrehozod a fiókot.<br>A további adatokat ezután tudod megadni",
                save:"Mentés",
                msg_name_short:"Nem adtál meg nevet",
                supervisor:"Felettes",
                chose :"Kérlek válassz",
                loginName :"Felhasználónév",
                loginNameMissing :"Felhasználónév hiányzik",
                loginNameExists :"Felhasználónév már létezik",
                hireDate:"Belépés",
                hireDateEmpty:"Belépés dátuma üres",
             },
            "#orgChart":{
                title:"OrgChart"
            },
            "#history":{
                title:"Történet"  ,
                user:"Érintett",
                supervisor:"Felettes",
                events:"Események",
                announcements:"Közlemények",
            }, 
            "#mandatoryHoliday"   :{
                title: "Kötelező szabadság",
                mandatoryHoliday: "Kötelező szabadság",
                paidHolyDay:"Fizetett ünnep",
                replace:"Pihenőnap",
                success:"Siker",
                msg_ok:"Módosítás sikeres",
                remove:"Eltávolítás"
            },
            "#tasks":{
                title:"Feladatok"
            },
            "#taskCategories":{
                title:"Kategóriák"
            },   
            "#downloads":{
                title:"Letöltések"
            },
            "#userComments":{
                title :"Események"
            },
            "#CRM_start":{
                title :"Új Project",
                idInvalid : "Project azonosító már létezik",
                co3IdInvalid : "CO3 azonosító már létezik",
                success : "Project sikeresen létrehozva",

            },
            "#CRM_subprojects":{
                title :"Alprojectek"
            }, 
            "#CRM_list":{
                title :"Project kereső"
            },
            "#CRM_details":{
                title :"Project adatok"
            },
            "#SystemLogs":{
                title:"Rendszer logok",
                userName : "Név",
                hireDate : "Belépés dátuma",
                terminateDate : "Kilépés dátuma",
                active : "Státusz",
                email : "Email",
                labourTime : "Munkaidő",
                location:"Telephely",
                location2:"Másodlagos telephely",
                birthYear:"Születési idő",
                childBirthdays:"Gyermekek adatai",
                childCount:"Gyermekek száma",
                prevHolydays:"Áthozott szabadságok",
                otherHolydays:"Szabadságok (egyéb jogcím)",
                supervisorId:"Felettes",
                super2id:"Felettes 2",
                comments:"Megjegyzés",
                active:"Aktív",
                inactive:"Kilépett",
                changed:"Módosult",
                changedFrom:"Miről",
                changedTo:"Mire",
                changedWhen:"Mikor",
                 
            },
            "#notifications":{
                title:"Értesítések"
            }
        }
    },

    "en" : {

        dayNames : [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
        ],

        navBar:{
            navBrand: "Headcount",
            adminMenu:"Administration",
            taskManager:"Task Manager",
            CRM : "Project Management",
            notifications : "notifications",

        },
        dayContext:{
            announcements:"Announcements",
            events:"Events",
            save:"Save",
            cancel:"Cancel",
            commentSaved:"Announcement saved",
            msg_ok : "Success!",
            comment_error : "Server error!",
            settings:"Settings",
            emptyDay:"Empty day",
            workDay:"Working day",
            dayOff:"Dayoff",
            sickDay:"Silk leave",
            nonPaidDay:"Non paid dayoff",
            serverError:"Mail service error",
            mailSent:"Email sent",
            outOfHolyday:"Not enough dayoff",
            pleaseChose:"Pick leave category"  
        },


        title : "English",
        views:{
            "#home":{
                title:"Home",
                header:`<div>The site was created to effectively reduce working time.</div>
                        <div>The working day/vacation/sickness can be set with a few clicks.</div>`,
                colorCodes:"Color codes",
                color:"Color",
                meaning:"Meaning",
                null: "Not set",
                work:"Work",
                hDay:"Holyday",
                sick:"Sick leave",
                mandatoryHoliday: "Mandatory holiday",
                paidHolyDay:"National holiday",
                restDay:"Rest day",

            },
            "#about":{
                title:"About"
            },
            "#error404":{
                title:"Page not found"
            },
            "#login":{
                title:"Log In",
                loginName:"loginName",
                passWord:"Password",
            },
            "#loginTest":{
                title:"loginTest",
                accessDenied:"Access denied!"
            },
            "#profile":{
                title:"My dashboard",
                info:"information",
                lastLogin:"Last login",
                pwChange:"Change password",
                curPw : "Current password",
                newPw : "Password",
                newPwAgain : "Confirm password",
                update:"Update",
                sucFcess:"Success",
                msg_ok:"Update succesful",
                msg_error:"Error",
                passwordError:"This isn't your current password",
                passwordsNotMatch:"Password doesn't match",
                changePW:"Please change your password",
                passwordShort:"Password is short. At least 5 characters required."

            },
            "#planner":{
                holydayCore:"Yearly holyday rules",
                details:"Details",
                title:"Planner",
                monthClosed: "The month has beed closed by HR",
                prevHolydays:"Holyday from last year",
                holyDaysTotal:"Total:",              
                holyDaysRemaining:"Remaining:",              
                holyDaysFromLastYear:"From last year (till Jan.):",
                holyDaysBase:"Base holydays:",              
                used:"Used:", 
                schedule:"Schedule",
                age:"Age:",
                children:"Childeren:",
                otherHolyday:"Other:",
                yearCalendar:"Yearly calendar",
                multiDays:"Set multiple days",
        



            },
            "#hr":{
                title:"Hr administration",
                name:"Name",
                supervisor:"Supervisor",
                summary:"Summary",
                closeMonth:"Month Close",

                sum:"Sum",
                work:"W",
                hDay:"PH",
                sick:"SD",
                nonPaid:"NP",
                multiDays:"Set dayoff range",

            },
            
            "#supervisor":{
            title:"My underlings",
                name:"Name",
                supervisor:"Supervisor",
                summary:"Summary",
            },
            "#adminEmp":{
                title:"Employees",
                search:"Search",
                name:"Employee name",
                authLevel:"Rights",
                birthYear:"Birth date",
                childCount:"Number of childs",
                holydays:"Number of holydays",
                msg_error : "Error!",
                success: "Success",
                msg_ok : "Update succesful!",
                msg_age_low : "Age is lower than 18",
                place:"Site",
                createUser:"Create user",
                supervisor:"Supervison",
                chose :"Please chose",
                hireDate:"Hire Date",
                active:"Active",
                inactive:"Reactivate",
                terminateDate:"Terminate Date",
                jobType:"Labour-time (hours)",
                prevHolydays:"Holydays from last year",
                otherHolydays:"Other Holydays",
                holyDayUsed:"Holydays used",            
                holyDayCurrent:"Holydays remaining",            
                holyDayTotal:"Holydays total",  
                holydayTab:"Holydays",
                logTab:"History",
                notifications:"Notifications",            
            },
            "#createUser":{
                title:"Create user",
                name:"Employee name",
                authLevel:"Rights",
                birthYear:"Birth date",
                childCount:"Number of childs",
                holydays:"Number of holydays",
                msg_error : "Error!",
                success: "Success",
                msg_ok : "User account created!",
                msg_age_low : "Age is lower than 18",
                place:"Site",
                tips:"Type the name of the user then press ENTER. After that you can set the remaining data",
                msg_error : "Error!",
                save:"Save",
                msg_name_short:"No name given",
                supervisor:"Supervison",
                chose :"Please chose",
                loginName :"Login Name",
                loginNameMissing :"Login name missing",
                loginNameExists :"Login name exists",
                hireDate:"Hire Date",
                hireDateEmpty:"Hire Date is empty",
            },
            "#orgChart":{
                title:"orgChart"  ,
            },
            "#history":{
                title:"History"  ,
                user:"Employee",
                supervisor:"Supervisor",
                events:"Events",
                announcements:"Announcements",
            }, 
            "#mandatoryHoliday"   :{
                title: "Mandatory holiday",
                mandatoryHoliday: "Mandatory holiday",
                paidHolyDay:"National holiday",
                replace:"Transfer of working hours",
                success:"Success",
                msg_ok:"Insert successful",
                remove:"Remove"
            },
            "#tasks":{
                title:"Tasks"
            },
            "#taskCategories":{
                title:"Categories"
            },   
            "#downloads":{
                title:"Downloads"
            },
            "#userComments":{
                title :"UserComments"
            },
            "#CRM_start":{
                title :"New Project",
                idInvalid : "Project ID already exists",
                co3IdInvalid : "CO3 ID already exists",
                success : "Project created successfully",
            },
            "#CRM_subprojects":{
                title :"Sub projects"
            },            
            "#CRM_list":{
                title :"Search Project"
            },
            "#CRM_details":{
                title :"Project details"
            }            ,
            "#SystemLogs":{
                title:"System logs",
                userName : "Name",
                hireDate : "Hire date",
                terminateDate : "Terminate date",
                active : "Status",
                email : "Email",
                labourTime : "Labour time",
                location:"Location",
                location2:"Location 2", 
                birthYear:"Date of birth",
                childBirthdays:"Date of children",
                childCount:"Number of children",
                prevHolydays:"Holydays from last year",
                otherHolydays:"Other holydays",
                supervisorId:"Supervisor",
                super2id:"Supervisor 2",
                comments:"Comments",
                active:"Active",
                inactive:"Terminated",

            },
            "#notifications":{
                title:"Notifications",
            }
        }
    },

}