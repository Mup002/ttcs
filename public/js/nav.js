const createNav = () =>{
    let nav = document.querySelector('.navbar');
    nav.innerHTML = `
    <div class = "nav">
    <img src = "img/logo-mup.png" class = "brand-logo" id ="btn-img">
    <div class = "nav-items">
        <div class = "menu uls">
                <ul class = "links-container">
                <li class = "link-item"><a href = "/" class = "link">Trang chủ</a></li>
                <li class = "link-item"><a href = "/about" class = "link">Về chúng tôi</a></li>
                
                <li class="link-item dropdown">
                                    <a class="link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Sản phẩm
                                    </a>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="/ukiyo">Ukiyo</a>
                                        <a class="dropdown-item" href="/sanji">Sanji</a>
                                        <a class="dropdown-item" href="/mabu">Mabu</a>
                                        <a class="dropdown-item" href="/meat">MeatZero</a>
                                        <a class="dropdown-item" href="/drink">DDrinks</a>
                                        <a class="dropdown-item" href="/mup">Mup</a>
                                    </div>
                                </li>

               </ul>
        </div>
        
        <div id = "user-info">
            <img src = "img/user.png" id = "user-img">
            <div class  = "login-logout-popup hide">
               <p class = "account-info">Log in as, name </p>
               <button class = "btn" id = "user-btn">Log out</button>
            </div>
        </div>
        <a  href = "/cart"><img src = "img/cart.png"></a>
</div>
    `;
}
createNav();

//nav popup
const userImageButton = document.querySelector('#user-img');
const userPopup = document.querySelector('.login-logout-popup');
const popuptext = document.querySelector('.account-info');
const actionBtn = document.querySelector('#user-btn');

userImageButton.addEventListener('click',()=>{
    userPopup.classList.toggle('hide');
})

window.onload  = ()=>{
    let user = JSON.parse(sessionStorage.user || null);
    if(user != null){
        // means user is logged
        popuptext.innerHTML = `log in as, ${user.name}  `;
        actionBtn.innerHTML = 'log out';
        actionBtn.addEventListener('click',()=>{
            function deleteCookie(name) {
                document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;';
            }
            
            deleteCookie('loggedIn');
              
            sessionStorage.clear();
            localStorage.removeItem("cart");
            location.reload();
        })
    }else{
        popuptext.innerHTML = 'log in to order';
        actionBtn.innerHTML = 'log in';
        actionBtn.addEventListener('click',()=>{
            location.href = '/login';
        })
    }
}
