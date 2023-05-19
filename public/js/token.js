
// send data function
const sendData = (path, data) =>{
    fetch(path,{
        method: 'post',
        headers: new Headers({'Content-Type':'application/json'}),
        body: JSON.stringify(data)
    }).then((res) =>  res.json())
    .then(response => {
        processData(response);
    })
}
const processData  = (data) => {
  loader.style.display = null;
  if(data.alert){
    showAlert(data.alert);
  }else if(data.name){
    sessionStorage.user = JSON.stringify(data);
    document.cookie = `loggedIn=true; email=${email.value}; expires=${new Date(Date.now() + 86400e3).toUTCString()}; path=/`;
    location.replace('/');
  }else if(data == true){
    let user = JSON.parse(sessionStorage.user);
    user.seller = true;
    sessionStorage.user = JSON.stringify(user);
    location.reload();
  }

}
const showAlert = (msg,type) =>{
  let alertBox = document.querySelector('.alert-box');
  let alertMsg = document.querySelector('.alert-msg');
  let alertImg = document.querySelector('.alert-img');
  alertMsg.innerHTML = msg;
  if(type = 'success'){
    alertImg.src = `img/success.png`;
    alertMsg.style.color = `#0ab50a`;
  }else{
    alertImg.src = `img/error.png`;
    alertMsg.style.color = null;
  }
  alertBox.classList.add('show');
  setTimeout(()=>{
    alertBox.classList.remove('show');
  },3000);
  
}