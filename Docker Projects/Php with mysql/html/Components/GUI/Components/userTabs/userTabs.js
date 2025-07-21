export class userTabs {
    constructor(){}
    init(){
        return `
        <div class="container mt-4">
            <ul class="nav nav-tabs" id="chatTabs" role="tablist"></ul>
            <div class="tab-content p-3 border border-top-0" id="chatTabsContent"></div>
        </div>
        `
    }
    events(){ 
             
        const tabContainer = document.querySelector('#chatTabs');
        if (!tabContainer) {
          console.warn('.chatTabs elem nem található');
          return
        }
    
        tabContainer.addEventListener('shown.bs.tab', function (event) {
            const aktivTabID = event.target.getAttribute('data-bs-target')
          //const targetTab = document.querySelector(aktivTabID)
            const targetTab = event.target.querySelector(".newMessages")
            targetTab.innerHTML = ""
          //console.log(targetTab)
        });
      
    }
    tmp(){



        return `
        <div class="container mt-4">
             <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home"
                        type="button" role="tab" aria-controls="home" aria-selected="true">Főoldal</button>
                </li>
                <li class="nav-item" role="presentation">
                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile"
                        type="button" role="tab" aria-controls="profile" aria-selected="false">Profil</button>
                </li>
                <li class="nav-item" role="presentation">
                <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact"
                        type="button" role="tab" aria-controls="contact" aria-selected="false">Kapcsolat</button>
                </li>
            </ul>
    
            <!-- Tab tartalmak -->
            <div class="tab-content p-3 border border-top-0" id="myTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                Ez a Főoldal tartalma.
                </div>
                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                Itt van a profilod információja.
                </div>
                <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                Itt vehetsz fel velünk kapcsolatot.
                </div>
            </div>
        </div>
        
        `
    


    }


    


}