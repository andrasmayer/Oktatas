const section1 = document.querySelector("#section1")
    const data = [
    [
        {
            size:"w-100",
            title:"A Tesla-Edison-csörte, avagy az áramrendszerek háborúja",
            content:"Thomas Edison és Nicola Tesla. Két lángelme egyazon korban, akik emberileg sajnos – ám a tudomány szempontjából mégis szerencsére – képtelenek voltak összefogni, vagy együttműködni egymással. Az emberiség történetének számos nagy formátumú alakját ismerjük, akik hozzásegítettek minket hétköznapjaink megkönnyítéséhez. A fenti úriemberek kétségkívül közéjük tartoznak, ugyanakkor még így is kiemelkednek, hiszen nem csupán egy, de számos létfontosságú találmány fűződik a nevükhöz. Háborújuk története legendás, érdemeiket pedig nem, hogy nem mosta el az idő, sokkal inkább csak nemesítette őket.",
            imgUrl:"https://res.cloudinary.com/teepublic/image/private/s--f7NP9teB--/t_Resized%20Artwork/c_fit,g_north_west,h_954,w_954/co_000000,e_outline:48/co_000000,e_outline:inner_fill:48/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/t_watermark_lock/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1567993192/production/designs/5891274_0.jpg",
            wikiUrl:"https://ectopolis.hu/tudomany/a-tesla-edison-csorte-avagy-az-aramrendszerek-haboruja/"
        },
        {
            size:"w-sm-50",
            title:"Nikola Tesla",
            content:"Szerb-amerikai fizikus, feltaláló, villamosmérnök, gépészmérnök, filozófus. Életében 146 szabadalmat jegyeztek be a neve alatt (ebből 112-t az USA-ban). Róla nevezték el a mágneses indukció SI-mértékegységét (lásd: Tesla).",
            imgUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Tesla_circa_1890.jpeg/640px-Tesla_circa_1890.jpeg",
            wikiUrl:"https://hu.wikipedia.org/wiki/Nikola_Tesla_(feltal%C3%A1l%C3%B3)"
        },
        
        {
            size:"w-sm-50",
            title:"Thomas Alva Edison",
            content:"Amerikai feltaláló és üzletember, egyes vélemények szerint minden idők egyik legnagyobb feltalálója. Az Egyesült Államokban 1093, az egész világon 2332 szabadalmat jegyeztetett be. Találmányai – mint a fonográf, a mikrofon, a tökéletesített elektromos izzólámpa, a kinetoszkóp – nagy hatással voltak a modern ipari társadalom életmódjára. Az elsők között alkalmazta az ipari fejlesztés területén a szervezett csapatmunkát.",
            imgUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Thomas_Edison2.jpg/250px-Thomas_Edison2.jpg",
            wikiUrl:"https://hu.wikipedia.org/wiki/Thomas_Alva_Edison"
        },
        
        
        {
            size:"w-sm-25",
            title:"Aszinkron gép",
            content:"Más néven indukciós motor a legáltalánosabban használt, legegyszerűbb szerkezetű villamos forgógép, egy forgó és egy álló részből tevődik össze. A gyakorlatban az egyik legelterjedtebb villamos gép. Kisebb teljesítményre általában egyfázisú, míg nagyobb teljesítmény esetében kizárólag háromfázisú kivitelben készül.",
            imgUrl:"https://elektrorostov.ru/assets/mifullsizeky48e4.jpg",
            wikiUrl:null
        },
        {
            size:"w-sm-25",
            title:"Tesla tekercs",
            content:"Nikola Tesla 1891-ben építette meg először a róla elnevezett Tesla-tekercset. Ő volt az első, aki az elektromos rezonancia jelenségét a gyakorlatban is megvalósította és felhasználta. A Tesla-tekercs legalább két légmagos tekercsből áll, ami nagyfeszültséget állít elő magas frekvencián.",
            imgUrl:"https://ae01.alicdn.com/kf/Hbeac02be7ba14ee0a05d08a6a6bf4801M/Music-Tesla-Coil-Finsihed-Product-High-Frequency-Model-Generator-Ignition-Diy-Set-Drive-Plate-Lightning.jpg",
            wikiUrl:null
        },
        {
            size:"w-sm-25",
            title:"Elektromos izzólámpa",
            content:"Edison 1878-ban állt neki egy elektromos világítóeszköz kidolgozásának, ez reményei szerint felváltotta volna a gáz- és petróleumlámpákat.[38] Az izzólámpát kezdte el tökéletesíteni, melynek elve akkor már jól ismert volt, és többen próbálkoztak a gyakorlatban is használható villanykörte kifejlesztésével.",
            imgUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Edison_bulb.jpg/220px-Edison_bulb.jpg",
            wikiUrl:null
        },
        {
            size:"w-sm-25",
            title:"Fonográf",
            content:"Görög szó, magyar jelentése: hangíró készülék. Az első olyan hangfelvételre és lejátszásra is alkalmas készülék volt, mely a gyakorlatban is bevált. Thomas Alva Edison találmánya volt, 1877-ben készült el az első működő készülék. A különféle harangjátékok, zenélődobozok, gépzongorák már korábban is képesek voltak hangokat, vagy akár összetettebb dallamokat visszaadni.",
            imgUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/EdisonPhonograph.jpg/230px-EdisonPhonograph.jpg",
            wikiUrl:null
        },
    ],
    [
        {
            size:"w-sm-50",
            title:"2.szekció első eleme",
            content:"Random",
            imgUrl:"https://yt3.googleusercontent.com/K8WVrQAQHTTwsHEtisMYcNai7p7XIlyEAdZg86qYw78ye57r5DRemHQ9Te4PcD_v98HB-ZvQjQ=s900-c-k-c0x00ffffff-no-rj",
            wikiUrl:null
        },
    ]
]


data.forEach(section=>{
    section.forEach(itm=>{
        const wikiUrl = itm.wikiUrl ==  null ? "" : `<a class="btn-link" target="${itm.title}" href="${itm.wikiUrl}">Wiki</a>`
        section1.innerHTML += `
            <div class="box ${itm.size}">
            <div class="box-content">
                <div class="box-body container">
                    <div class="w-25 text-center">
                        <img class="img" src="${itm.imgUrl}"> 
                    </div>
                    <div class="w-75">
                        <div class="p-2">
                            <h1>${itm.title}</h1>
                            <div>${itm.content}</div>
                            ${wikiUrl}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    })
})
