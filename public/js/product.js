
const loggedIn = getCookie('loggedIn');

if(loggedIn === undefined){
    window.onload = () => {
        location.replace('/login');
    }
}
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
////----------------///////////

var cart  = JSON.parse(localStorage.getItem("cart"));
if(cart != null){
  giohang = cart;
}else{
  var giohang = [];
}
var btnAdds = document.querySelectorAll(".btn-add");

for(let i = 0; i < btnAdds.length; i++) {
  btnAdds[i].addEventListener("click", function() {
    var hinh = this.parentElement.parentElement.querySelector("img").src;
    var ten = this.parentElement.parentElement.querySelector("h4").textContent;
    var gia = this.parentElement.querySelector("#price").textContent;
    var soluong = 1;
    var check = 0;
    for(let j = 0;j < giohang.length;j++){
      if(giohang[j]["ten"] == ten){
        giohang[j]["soluong"]  += soluong ;
        check = 1;
        break;
      }
    }
   if(check == 0){
    var sp = {
      "hinh":hinh,
      "ten":ten,
      "gia":gia,
      "soluong":soluong
    }
    giohang.push(sp);
   }
    localStorage.setItem("cart",JSON.stringify(giohang));
    var cart  = JSON.parse(localStorage.getItem("cart"));
  });
}

function loadcart(){
  var cart  = JSON.parse(localStorage.getItem("cart"));
  if(cart != null){
    document.getElementById("slsp").innerHTML = cart.length
  }
}

// ----//
function loaddatacart(){
  loadcart();
  showcart();
  total();
}
function showcart(){
  var cart = JSON.parse(localStorage.getItem("cart"));
  if(cart != null){
    var kq= "";
    for(let i = 0;i<cart.length;i++){
      var tt = parseInt( cart[i]["gia"] *  cart[i]["soluong"])
      kq += ` 
    <tr>
      <td><img src = "`+cart[i]["hinh"]+`" height = "300px" width = "auto">
      `+cart[i]["ten"]+`
      </td>
      <td class= "last-td" > `+cart[i]["gia"]+`</td>
      <td class= "last-td last-td-btn"><button class = "bot btn-table" onclick = "tang(this,`+i+`)">+</button><span> `+cart[i]["soluong"]+`</span><button class = "them btn-table" onclick = "giam(this,`+i+`)">-</button></td>
      <td class = "last-td"> ` +tt+ `</td>
      <td class = "last-td"><button class="btn-del" onclick="xoa(this, ${i})">Xóa</button></td>
    </tr>
      `;
    }
    document.getElementById("info_cart").innerHTML = kq;
  }
}
function tang(x,i){
  var td = x.parentElement; 
  var sl = parseInt(td.childNodes[1].textContent);
  var slmoi = sl + 1;
  td.childNodes[1].innerHTML = slmoi;
  giohang[i]["soluong"] = slmoi;
  localStorage.setItem("cart", JSON.stringify(giohang));
  total();
}
function giam(x, i) {
  var td = x.parentElement; 
  var sl = parseInt(td.childNodes[1].textContent);
  var slmoi = sl - 1;
  td.childNodes[1].innerHTML = slmoi;
  giohang[i]["soluong"] = slmoi;
  if (slmoi == 0) {
    confirmDelete(i);
  } else {
    localStorage.setItem("cart", JSON.stringify(giohang));
    showcart();
    total();
  }
}

function confirmDelete(i) {
  if (confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?")) {
    giohang.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(giohang));
    showcart();
    total();
  }
}

function total(){
  var cart = giohang;
  if(cart != null){
    var total = 0;
    var kq= "";
    for(let i = 0;i<cart.length;i++){
      var tt = parseInt( cart[i]["gia"] *  cart[i]["soluong"])
      total += tt;
    }
    document.getElementById("tongdonhang").innerHTML = "Tổng đơn hàng : " + total+ " đồng";
  }
}
function delcart(){
  localStorage.removeItem("cart");
  window.location.reload();
}
function xoa(button, index) {
  var cart = JSON.parse(localStorage.getItem("cart"));
  if (cart != null) {
    var deletedItem = cart.splice(index, 1); // Xóa phần tử khỏi mảng cart và lưu lại phần tử đã xóa
    localStorage.setItem("cart", JSON.stringify(cart)); // Cập nhật lại giỏ hàng trong localStorage
    showcart(); // Hiển thị lại giỏ hàng sau khi xóa
    
    // Cập nhật lại giá tiền đơn hàng
    var totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
      totalPrice += cart[i]["gia"] * cart[i]["soluong"];
    }
    document.getElementById("total-price").textContent = totalPrice;
  }
}
function order(){
  window.location.replace("/checkout");
}

//email
const btn_send_gift = document.querySelector(".btn-send-gift");
const email_gift = document.querySelector(".email-gift");
btn_send_gift.addEventListener('click', () => {
  const email = email_gift.value;
  // Tạo yêu cầu HTTP POST đến server.js
  fetch('/sendMail-gift', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email })
  })
  .then(response => {
    if (response.ok) {
      location.reload();
    } else {
      alert('Có lỗi xảy ra khi gửi email');
    }
  })
  .catch(error => {
    console.error('Lỗi:', error);
    alert('Có lỗi xảy ra khi gửi email');
  });
});