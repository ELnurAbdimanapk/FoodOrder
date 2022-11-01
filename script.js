//elementterdi baylanishtirabyz getelement jardamynda
const menuList = document.getElementById('menuList')//1 id arkyluu alyp alabyz
const ordersList = document.getElementById("ordersList")
const itemsCount = document.getElementById("itemsCount") //0go ozgortuu kirgizuu uchun baylap alabyz
const sum = document.getElementById("sum")//sum dagy ozgorush uchun peremenniyga salabyz


//menunun itemderin kaytaryp beret
const renderMenuItem = (product) => { //1parametr katary product alat//bul product datadan kelgen danniy//renderMenuItem(menuItems) dep jazsak oshol jerdegi danniylar tushot,birok tuura jerge berebiz azyr emes
    return   `  <div onclick="foodChooser(event)" class="foodCard" data-product='${JSON.stringify(product)}'>  
        <img class='imgFood' src="${product.img}" alt="food"/>
        <div>
            <div class="title2">${product.title}</div>
            <div class="price2">${product.price}</div>  
        </div>
    </div>`            //menuda 6 kartochkany kancha tamak bolso oshoncho kartochka kaytarip berish kk
       //kaytaryp beret degeni uchun return jazabiz
};
// atribut tegke koshumcha jardamchy,data degen atribut bar,oshonu tuzobuz,
// ooznun ichine danniy saktayt,anyn ichine obyekt saktap alyshybyz kk,
// obykt katary saktasak html okuyalbay kalat,ochon uchun JSON stringify mn stringge otkozup alabyz


//jogorudagy funktsiyany bir jerde chakirishibiz kk

const renderOrderItem = (orderItem) => { //zakazdardy render kylyp beret
   return ` <div class="orderItem" >
    <div class="title" >${orderItem.title}</div>
    <div class ="count">count:${orderItem.count}</div>
    <div class ="price">price:${orderItem.price}</div>
    <div onclick="deleteOrders(event)"  data-orders='${JSON.stringify(orderItem)}'>x</div>
    </div>`;

};//kyskartylgan sintaksis returndu alyp,eki figurniy skobkany alyp salsa bolot.
//orderItem .title danniylardy chygarat oshogo figurniyda saktaybiz
//x tin janyna data berilet atribut katary,teksherip ochurulot,oshogo

const renderMenuList = (list) => { //2parametr katary list berilet
    let items = []; //localniy massive achyp alabyz
    list.map((el) => { //list degen parametrge kirip map mn aralayt
        items.push(renderMenuItem(el))      //bul aralap,localniydagy peremenniyga renderMenuItem funktsiyasynyn jardamynda push kylyp beret
    });
    menuList.innerHTML = items.join("") //menuListke kayrilip innerHTML mn join metodu mn kirgizip alat//massivetin elementterinin ortosundagy danniylardy pustoy kylsak ochurup salat//uturlordu alyp salat
    console.log(items);
};

renderMenuList(menuItems)   //bul funktsiyany chakirip danniy kire turganjei bolot



//Orderlerdi Rendeer kylgan Function

const renderOrderList = (list) => {//bunu kachan baskanda gana achylysh kk//
    let items = [];
    list.map((el) => {
        items.push(renderOrderItem(el))
    })
    ordersList.innerHTML = items.join("");//zakazdy baskanda orslistke chygarat
    
};


//renderOrderlist bul kartochkany baskanda gana ishteyt oshogo ushul function jazilat
let foodChooser = (event) => { //luboy function parametr alat//any domdo chakirsak ,al parametr event-sobiyiya kaytarat
    const card = JSON.parse(event.currentTarget.dataset.product);         //bul bizge string bolup kelet,birok biz bunu kayra obyekt kylyshybyz kk,chtoby znacheniyalaryna tochka dep kayrilip
             //eventti renderMenuItemge koshobush,oshol baskanda ushul funktsiya ishtesh kk
    const currentIndex = ordersBasket.findIndex((el) => {//aralaybiz,biz zakaz kylgan tamaktardy saktayt,find index izdeyt
        return el.id === card.id;//massive mn danniydy salishtyrat,kaysil bir nersege tuura kelse ,kayra oshonu kaytarup vurrentIndexkske saktayt
    });
    if(currentIndex === -1) {//findindex  elemnetti tappasa anda -1 kaytarat
        ordersBasket.push(
            {
                ...card, //spread operatoru obyekttin elementterin kaytarip beret
                count: 1,//chygargan obyektke count1 dep koshup koyobuz

            });
    }
    else {
        ordersBasket[currentIndex].count++;
        ordersBasket[currentIndex].price += card.price;
    }
    renderOrderList(ordersBasket)
    console.log(ordersBasket);
    solveSum()
    solveCount()
};///data degen atributta product saktalgan oshonu//data maalymat saktagany jardam beret//dkiyin domgo kayrilip sobitiye bolgon elemennttin currenttargen mn oyektisini alyp atabyz

deleteOrders = (event) => {
    const card = JSON.parse(event.target.dataset.orders);//parse mn targette eventte saktalgan datasetti alabyz,al bizde order dep saktalgan
    const currentIndex = ordersBasket.findIndex((el) => el.id === card.id)//ordersbasketti aralaybiz findindex mn ar bir elementti kaytarat.elementtin idsi carddyn idsine barabar bolso oshonu kaytarat
    const itemPrice = menuItems.find((el) => el.id === card.id).price;
    
    if(card.count > 1 ) {
        ordersBasket[currentIndex].count--;
        ordersBasket[currentIndex].price -= itemPrice;
        renderOrderList(ordersBasket)//deleteti baskanda birden birden azayish kk,anan 1den kichine bolso jogolup ketish kk
        //nege ichinde chakirdik,danniylardy kirgizgenden kiyiiin gana ishtesh kk
    }
    else{
        ordersBasket.splice(currentIndex,1);//splice kesip beret,kaysil jerden kaysil jerge cheyin kashada korsotobuz
        
    }
    renderOrderList(ordersBasket);
    // console.log("deleteOrders");
};




///Obshiy summalardy koshkon Funktsiya achabiz
//kantip? foodChooserge koshsok da bolot,peremenniy achyup
// ..Reduce metodu mn ,i obshiy itemderdin sanyn chygarysh kk
const solveSum = () => {
    sum.innerHTML = ordersBasket.reduce((def,{price}) => def + price, 0  );
};
solveCount = () => {
    itemsCount.innerHTML = ordersBasket.reduce((def, {count}) => def +count,0);
};
renderMenuList(menuItems);
//obyekti destruktizasiya kylyp pricety alyp alabyz//default(nachalnoye znacheniye ogo barabar bolot)
//any priceka koshobuzz//def=0 bolot,nachalnoye znacheniye//koshup kete beret
//solve sum kachan atkaraylat?//kachan foodchooser atkarylganda atkarylysh kk