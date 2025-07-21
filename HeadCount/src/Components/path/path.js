const {Home} = await import(`../../Views/Home/Home.js${app_version}`)
const {About} = await import(`../../Views/About/About.js${app_version}`)
const {Error404} = await import(`../../Views/Error404/Error404.js${app_version}`)
const {Login} = await import(`../../Views/Login/Login.js${app_version}`)
const {Profile} = await import(`../../Views/Profile/Profile.js${app_version}`)
const {Planner} = await import(`../../Views/Planner/Planner.js${app_version}`)
const {Planner_hr} = await import(`../../Views/Planner_hr/Planner_hr.js${app_version}`)
const {Planner_supervisor} = await import(`../../Views/Planner_supervisor/Planner_supervisor.js${app_version}`)
const {HrAdmin} = await import(`../../Views/HrAdmin/HrAdmin.js${app_version}`)
const {createUser} = await import(`../../Views/createUser/createUser.js${app_version}`)
const {OrgChart} = await import(`../../Views/OrgChart/OrgChart.js${app_version}`)
const {History} = await import(`../../Views/History/History.js${app_version}`)
const {MandatoryHoliday} = await import(`../../Views/MandatoryHoliday/MandatoryHoliday.js${app_version}`)

const {TaskManager} = await import(`../../Views/TaskManager/TaskManager.js${app_version}`)
const {taskCategories} = await import(`../../Views/taskCategories/taskCategories.js${app_version}`)
const {Downloads} = await import(`../../Views/Downloads/Downloads.js${app_version}`)
const {UserComments} = await import(`../../Views/UserComments/UserComments.js${app_version}`)

const {SystemLogs} = await import(`../../Views/SystemLogs/SystemLogs.js${app_version}`)
const {Notifications} = await import(`../../Views/Notifications/Notifications.js${app_version}`)



const {CRM_createProject} = await import(`../../Views/CRM_createProject/CRM_createProject.js${app_version}`)
const {CRM_list_Projects} = await import(`../../Views/CRM_list_Projects/CRM_list_Projects.js${app_version}`)
const {CRM_details} = await import(`../../Views/CRM_details/CRM_details.js${app_version}`)
const {CRM_subprojects} = await import(`../../Views/CRM_subprojects/CRM_subprojects.js${app_version}`)

export const path = {
    "#home" :{page:Home},
    "#about":{ page:About,login:true,auth:[999]},
    "#login":{ page:Login},
    "#profile":{ page:Profile,login:true,auth:[]},
    "#planner":{ page:Planner,login:true,auth:[]},
    "#hr":{ page:Planner_hr,login:true,auth:[1]},
    "#supervisor":{ page:Planner_supervisor,login:true,auth:[1,2]},
    "#adminEmp":{ page:HrAdmin,login:true,auth:[1]},
    "#createUser":{ page:createUser,login:true,auth:[1]},
    "#orgChart":{ page:OrgChart,login:true,auth:[]},
    "#history":{ page:History,login:true,auth:[]},
    "#mandatoryHoliday":{ page:MandatoryHoliday,login:true,auth:[1]},
    "#downloads":{ page:Downloads,login:true,auth:[1]},
    "#SystemLogs":{ page:SystemLogs,login:true,auth:[1]},
    "#notifications":{ page:Notifications,login:true,auth:[1]},


    "#tasks":{ page:TaskManager,login:true,auth:[]},
    "#taskCategories":{ page:taskCategories,login:true,auth:[1]},


    "#userComments":{ page:UserComments,login:true,auth:[1]},


    //
    "#CRM_start":{ page:CRM_createProject,login:true,auth:[1,2]},
    "#CRM_list":{ page:CRM_list_Projects,login:true,auth:[1,2]},
    "#CRM_details":{ page:CRM_details,login:true,auth:[1,2]},
    "#CRM_subprojects":{ page:CRM_subprojects,login:true,auth:[1,2]},
    


    "#error404":{ page:Error404},
}


