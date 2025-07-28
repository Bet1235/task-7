const submitButton = document.getElementById('submitOrder');
const printButton = document.getElementById('printOrder');
const submitLoading = document.getElementById('submitLoading');
const printLoading = document.getElementById('printLoading');


const foods = [
    {
        image: 'https://thumbs.dreamstime.com/b/close-up-african-beef-stew-plate-tomato-sauce-spices-herbs-served-rice-old-wooden-table-west-cuisine-156889376.jpg',
        name: 'White rice and stew',
        price: 2500,
        description:'a beautiful plate of long grain rice and chicken stew.',
    },
    {
        image:'https://sisijemimah.com/wp-content/uploads/2015/06/IMG_7971.jpg',
        name: 'Smoky Jollof Rice with Plantains',
        price: 2000,
        description:'basmatti rice cooked over firewood and fried plantains',

    },
    {
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSJtzRxlHrAtZNPhMcRG_0V93hQiQ2twnagg&s',
        name: 'White Rice and Akwu Stew',
        price: 4000,
        description:'Basmatti rice served with palm oil sauce made with fresh ingredients',
    },
    {
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp5fdzFv5zF42q37CTN9Hr7kxVNuAMrRsoaQ&s',
        name: 'Okro Soup and pounded yam',
        price: 5500,
        description: 'Pounded yam served with okro soup made seafoods and meat',
    },
    {
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzvk1DMZu-d45M2yZRWkVUvW_6un84JuV78Q&s',
        name:'Agidi and assorted peppersoup',
        price: 3500,
        description:'Freshly-made agidi with peppersoup made with meat',
    },
    {
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgxowVs081dbCwdsrNLcYVk0nVcCyi5fPRgw&s',
        name:'Moi-moi and pap',
        price: 3000,
        description: 'For breakfast, freshly-made moi-moi alongside pap',
    }
]
// let submitCard = false
let cart = [];
const listDiv = document.getElementById('list');
// console.log(listDiv);
// listDiv.textContent = 'rice';
const listCard = document.getElementById('listCard');

const totalId = document.getElementById('total');
const quantity = document.getElementById('quantity');

// console.log(foods)

foods.forEach((plate, index) => {
    //  console.log(plate)
    const Div = document.createElement('div') 
    Div.classList = 'plateCard';
    // console.log(Div);
    Div.innerHTML = `
    <h4>${plate.name}</h4>
    <p>${plate.description}</p>
    <p> ₦${plate.price}</p>
    <div class='plate-image' style='background-image:url(${plate.image})'>
    
    </div>
    <div class='addButton button'>
    <button onclick="addToPlate(${index})">Add to Plate</button>
    </div>
    `;
    
    listDiv.appendChild(Div);
    console.log(Div);
    
})

function addToPlate(index){
    const plate = foods[index]
    cart.push(plate)
    updateCart()
    saveCart()

}

function updateCart(){
    listCard.innerHTML = ''
    let total = 0

    cart.forEach((item) => {
        const li = document.createElement('li')
        li.textContent = `${item.name} - ${item.price}`
        listCard.appendChild(li)
        total += item.price
    })
    totalId.textContent = total
}
function submitOrder(){
    submitLoading.style.display = "block"
if(cart.length === 0){
   setInterval(() => {
     submitLoading.style.display = "none"
   }, 2000);
   window.alert("add some plates to the cart")
    return
}else{
    window.alert(" cart submitted successfully")
   
    cart = []
    saveCart()
    updateCart()
    removeItem()
    setInterval(() => {
        submitLoading.style.display = "none"
      }, 2000);
}
  
}
function printOrder(){
    printLoading.style.display = "block"
    if(cart.length === 0){
        window.alert("add some plates to the cart  before printing")
        setInterval(() => {
            printLoading.style.display = "none"
          }, 2000);
        return
    }else{
        let printWindow = window.open("", "printWindow", "width=300,height=300");
        cart.forEach((item)=>{
            printWindow.document.write(`<li> ${item.name}, ${item.price} </li>`);
        })
        printWindow.document.write(`<li> total ${totalDisplay.textContent} </li>`);
      
       printWindow.print();
       printWindow.document.close();
       printWindow.print();
       setInterval(() => {
        printLoading.style.display = "none"
      }, 2000);
        
    }
}

function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart))
}
window.onload = function(){
  const savedCart = localStorage.getItem("cart")
  if(savedCart){
    cart = JSON.parse(savedCart)
    console.log(cart)
    updateCart()
  } else{
    cart = []
    updateCart()
  }
}

