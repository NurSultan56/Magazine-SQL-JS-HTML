let add = document.querySelector("#add");
let list = document.querySelector("#list");
let changeContainer = document.querySelector(".change-container");
let changeForm = document.querySelector(".change-container form");
let user_id;
let changingElement;

function showList(goods) {
  let li = document.createElement("li");
  li.innerHTML = `<p>ID - <span class="user-id">${goods.id}</span></p>
    <p>NAME - <span class="goodsname">${goods.goodsname}</span></p>
    <p>DESCRIPTION - <span class="goodsdescription">${goods.goodsdescription}</span></p>
    <p>STORE NAME - <span class="storename">${goods.storename}</span></p>
    <p>STORE ADDRESS - <span class="storeaddress">${goods.storeadress}</span></p>
    <p>PRICE - <span class="goodsprice">${goods.goodsprice}</span></p>
    <p>COUNT - <span class="goodcount">${goods.goodscount}</span></p>
    <button  onclick="deleteUser(${goods.id})">X</button>`; 

    let findButton = document.createElement('button')
    findButton.innerText = 'CHANGE'
    li.appendChild(findButton)

    list.appendChild(li)

    findButton.addEventListener('click', ()=>{
        user_id=goods.id;
        let goodsNameChange = li.querySelector(".goodsname");
        let goodsDescriptionChange = li.querySelector(".goodsdescription");
        let storeNameChange = li.querySelector(".storename");
        let storeAdressChange = li.querySelector(".storeaddress");
        let goodsPriceChange = li.querySelector(".goodsprice");
        let goodsCountChange = li.querySelector(".goodcount")
        document.querySelector('#goodsNameChange').value = goodsNameChange.innerText
        document.querySelector('#goodsDescriptionChange').value = goodsDescriptionChange.innerText
        document.querySelector('#storeNameChange').value = storeNameChange.innerText
        document.querySelector('#storeAdressChange').value = storeAdressChange.innerText
        document.querySelector('#goodsPriceChange').value = goodsPriceChange.innerText
        document.querySelector('#goodsCountChange').value = goodsCountChange.innerText
        changingElement = event.target.parentElement
        changeContainer.style = "display:flex;"
    })
   
}

fetch("http://localhost:5000/goods")
  .then((res) => res.json())
  .then((data) => {
    if (Array.isArray(data)) {
      data.forEach((item) => {
        showList(item);
      });
    } else {
      console.log(data);
    }
  });


add.addEventListener('submit', (event)=>{
    event.preventDefault()
    let goodsName = document.querySelector('#goodsName')
    let goodsDescription = document.querySelector('#goodsDescription')
    let storeName = document.querySelector('#storeName')
    let storeAdress = document.querySelector('#storeAdress')
    let goodsPrice = document.querySelector('#goodsPrice')
    let goodsCount = document.querySelector('#goodsCount')
    let obj  = {
        goodsname: goodsName.value,
        goodsdescription: goodsDescription.value,
        storename: storeName.value,
        storeadress: storeAdress.value,
        goodsprice: goodsPrice.value,
        goodscount: parseInt(goodsCount.value)
    }
    fetch('http://localhost:5000/add', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    .then((res)=>res.json())
    .then((data)=>{
        obj = {...obj, id: data.insertId}
        showList(obj)
    })
})

function deleteUser(id) {
  fetch(`http://localhost:5000/delete/${id}`, {
    method: "DELETE",
  })
  event.target.parentElement.remove()
}

changeForm.addEventListener('submit', (event)=> {
  event.preventDefault()
  let goodsName = document.querySelector('#goodsNameChange')
  let goodsDescription = document.querySelector('#goodsDescriptionChange')
  let storeName = document.querySelector('#storeNameChange')
  let storeAdress = document.querySelector('#storeAdressChange')
  let goodsPrice = document.querySelector('#goodsPriceChange')
  let goodsCount = document.querySelector('#goodsCountChange')
  let obj = {
    goodsname: goodsName.value,
    goodsdescription: goodsDescription.value,
    storename: storeName.value,
    storeadress: storeAdress.value,
    goodsprice: goodsPrice.value,
    goodscount: goodsCount.value
  }

  let goodsNameChange = changingElement.querySelector(".goodsname");
  let goodsDescriptionChange = changingElement.querySelector(".goodsdescription");
  let storeNameChange = changingElement.querySelector(".storename");
  let storeAdressChange = changingElement.querySelector(".storeaddress");
  let goodsPriceChange = changingElement.querySelector(".goodsprice");
  let goodsCountChange = changingElement.querySelector(".goodcount")

  goodsNameChange.innerText = `${obj.goodsname}`
  goodsDescriptionChange.innerText = `${obj.goodsdescription}`
  storeNameChange.innerText = `${obj.storename}`
  storeAdressChange.innerText = `${obj.storeadress}`
  goodsPriceChange.innerText = `${obj.goodsprice}`
  goodsCountChange.innerText = `${obj.goodscount}`

  fetch(`http://localhost:5000/change/${user_id}`, {
    method: "PUT",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
    changeContainer.style = 'display:none;'
})