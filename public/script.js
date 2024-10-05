const signupPage=document.getElementById('signupPopup')
const createAccBtn=document.getElementById('acc-btn')

createAccBtn.addEventListener("click",()=>{
    signupPage.classList.remove('hidden');
})