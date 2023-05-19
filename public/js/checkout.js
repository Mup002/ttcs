
// Lấy dữ liệu từ localStorage
var cart = JSON.parse(localStorage.getItem("cart"));

// Kiểm tra nếu giỏ hàng không rỗng
if (cart !== null) {
  var cartTable = document.getElementById("info_cart");
  var totalBill = 0;
  // Lặp qua từng mặt hàng trong giỏ hàng
  for (var i = 0; i < cart.length; i++) {
    var row = document.createElement("tr");
  
    var imageCell = document.createElement("td");
    var image = document.createElement("img");
    image.src = cart[i].hinh;
    image.style.height = "300px";
    image.style.width = "auto";
    imageCell.appendChild(image);
  
    var nameCell = document.createElement("td");
    nameCell.textContent = cart[i].ten;
  
    var priceCell = document.createElement("td");
    priceCell.textContent = cart[i].gia;
  
    var quantityCell = document.createElement("td");
    quantityCell.textContent = cart[i].soluong;
  
    var totalCell = document.createElement("td");
    var totalPrice = cart[i].gia * cart[i].soluong;
    totalCell.textContent = totalPrice;
  
    totalBill += totalPrice;
  
    row.appendChild(imageCell);
    row.appendChild(nameCell);
    row.appendChild(priceCell);
    row.appendChild(quantityCell);
    row.appendChild(totalCell);
    
    cartTable.appendChild(row);
  }
}
function updateTotalBill() {
  var cart = JSON.parse(localStorage.getItem("cart"));
  var totalBill = 0;

  if (cart !== null) {
    for (var i = 0; i < cart.length; i++) {
      var itemTotal = cart[i].gia * cart[i].soluong;
      totalBill += itemTotal;
    }
  }

  var totalBillElement = document.querySelector(".bill");
  totalBillElement.textContent = totalBill +"VND"; 
}

// Gọi hàm updateTotalBill để cập nhật tổng tiền ban đầu
updateTotalBill();

const placeOrderBtn = document.querySelector('.place-order-btn');
placeOrderBtn.addEventListener('click', () => {
  let address = getAddress();

  if (address) {
    fetch('/order', {
      method: 'post',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        order: JSON.parse(localStorage.cart),
        email: JSON.parse(sessionStorage.user).email,
        add: address,
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.alert == 'Đặt hàng thành công!') {
          delete localStorage.cart;
          showAlert(data.alert, 'success');
          location.reload();
        } else {
          showAlert(data.alert);
        }
      })
      .catch(error => {
        console.error('Error sending order request:', error);
      });
  }
});

function getAddress() {
  let address = document.querySelector('#address').value;
  let street = document.querySelector('#street').value;
  let city = document.querySelector('#city').value;
  let phone = document.querySelector('#phone').value;
  let pincode = document.querySelector('#pincode').value;
  let note = document.querySelector('#note').value;
  if (!address.length || !street.length || !city.length || !phone.length || !pincode.length || !note.length) {
    showAlert('Điềnn hết các thông tin trên!');
    return null;
  } else {
    return { address, street, city, phone, pincode, note };
  }
}
var cart = JSON.parse(localStorage.getItem('cart'));
var quantity = 0;
if(cart != null){
    for(var i=0;i<cart.length;i++){
        quantity += cart[i].soluong;
    }
}
var slsp = document.getElementById("slsp");
slsp.textContent = quantity;
const back_btn = document.querySelector('.back-btn');
back_btn.addEventListener('click',( )=>{
  location.replace("/cart");
})
