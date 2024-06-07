let shop = document.getElementById('shop');

let shopItemsData =[{
    id: 'one',
    name: 'Casual Shirt',
    price: 50,
    desc: 'Nulla imperdiet semper justo vitae fringilla',
    img: 'images/img-1.jpg'
},{
    id: 'two',
    name: 'Office Shirt',
    price: 39,
    desc: 'Nulla imperdiet semper justo vitae fringilla',
    img: 'images/img-2.jpg'
},{
    id: 'three',
    name: 'T-shirt',
    price: 70,
    desc: 'Nulla imperdiet semper justo vitae fringilla',
    img: 'images/img-3.jpg'
},{
    id: 'four',
    name: 'Mens Suit',
    price: 203,
    desc: 'Nulla imperdiet semper justo vitae fringilla',
    img: 'images/img-4.jpg'
}]

let basket =[];

let generateShop =()=>{
    return (shop.innerHTML= shopItemsData.map((x)=>{
        let {id, name, price, desc, img} = x
        return `
        <div class='item' id=product-id-${id}>
            <img width='220' src=${img} alt=''>
            <div class='details'>
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class='price-quantity'>
                    <h2>${ price}</h2>
                    <div class='buttons'>
                        <i onclick='decrement(${id})' class='bi bi-dash-lg'></i>
                        <div class='quantity' id=${id} >0</div>
                        <i onclick='increment(${id})' class='bi bi-plus-lg'></i>
                    </div>
                </div>
            </div>
        </div>        
        `
    }).join(''));
};

generateShop();

let increment =(id)=> {
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id)

    if (search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else{
        search.item += 1;
    }

    console.log(basket)
};

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id)

    if (search.item ===  0){
       return;
    } else{
        search.item -= 1;
    }

    console.log(basket);
};

let update =() => {};