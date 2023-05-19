
// const loggedIn = getCookie('loggedIn');
// if(loggedIn){
//     const email = loggedIn.split('=')[1];
//     btnLogin.innerText = 'Logout';

//     btnLogin.addEventListener('click', () => {
//         document.cookie = 'loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//         btnLogin.innerText = 'Login';
//     });
// }
// function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
// }
// slide js
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const slideshow = document.querySelector('.slideshow');
  let slideIndex = 0;
  
  const slides = document.querySelectorAll('.box');
  let isMobile = false;
  prevBtn.addEventListener('click', () => {

   
    if (slideIndex > 0) {
      slideIndex--;
      showSlides();
    }else if(slideIndex == 0){
      slideIndex = slides.length - 3;
      showSlides();
    }
  });
  nextBtn.addEventListener("click", () => {
 
    if (slideIndex < slides.length - 3) {
      slideIndex++;
      showSlides();
    }else if(slideIndex >= slides.length -3){
      slideIndex = 0;
      showSlides();
    }
  });
  
  
  // Check screen size
  if (window.innerWidth <= 768) {
    isMobile = true;
    showslides();
    slideshow.addEventListener("click", handleClick);
  } else {
    isMobile = false;
    showSlides();
  }
  
  // Remove click event if screen size is larger than 768
  function removeClickEvent() {
    slideshow.removeEventListener("click", handleClick);
  }
  
  // Add click event if screen size is less than or equal to 768
  function addClickEvent() {
    slideshow.addEventListener('click', handleClick);
  }
  
  // Click event handler
  function handleClick() {
   
    if (slideIndex == slides.length - 1) {
      slideIndex = 0;
      showslides();
    } else {
      slideIndex++;
      showslides();
    }
  }
  
  // Function to show slides
  function showSlides() {
    const slides = slideshow.querySelectorAll('.box');
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    
    for (let i = slideIndex; i < slideIndex + 3; i++) {
      if (slides[i]) {
        slides[i].style.display = 'block';
      }
    }
  }
 
 
  // Function to show slides for mobile
  function showslides() {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    slides[slideIndex].style.display = 'block';
  }
  
  // Add event listener to window resize
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && isMobile) {
      slideIndex = 0;
      removeClickEvent();
      isMobile = false;
      showSlides();
      
      
    } else if (window.innerWidth <= 768 && !isMobile) {
      addClickEvent();
      isMobile = true;
      showslides();
    }
  });
  

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