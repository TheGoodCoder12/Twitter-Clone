const signupPage = document.getElementById('signupPopup');
const loginPage = document.getElementById('loginPopup');
const createAccBtn = document.getElementById('acc-btn');
const loginBtn = document.getElementById('login-btn');
const closeBtn = document.getElementById('close-btn');

createAccBtn.addEventListener("click", () => {
    signupPage.classList.remove('hidden');
});

loginBtn.addEventListener("click", () => {
    loginPage.classList.remove('hidden');
});

closeBtn.addEventListener("click", () => {
    signupPage.classList.add("hidden");
    loginPage.classList.add("hidden");
});

document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
    };

    try {
        const response = await fetch("/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            alert("Thank you for signing in...You may now login to access X")
            signupPage.classList.add("hidden");
            loginPage.classList.remove("hidden");
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error("Error:", error);
    }
});
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
        email: formData.get("email"),
        password: formData.get("password")
    };

    try {
        const response = await fetch("/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            alert("Login Successful...redirecting you")
            window.location.href="/welcome"
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
});
