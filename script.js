const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("signupName").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const user = { name, email, password };
        localStorage.setItem("giftStoreUser", JSON.stringify(user));
        alert("Account created successfully! 🎉");
        window.location.href = "login.html";
    });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
        const savedUser = localStorage.getItem("giftStoreUser");

        if (!savedUser) {
            alert("No account found. Please sign up first.");
            return;
        }

        const user = JSON.parse(savedUser);

        if (email === user.email && password === user.password) {
            alert("Login successful! 🎉");
            localStorage.setItem("isLoggedIn", "true");
            window.location.href = "index.html";
        } else {
            alert("Incorrect email or password!");
        }
    });
}

let cart = JSON.parse(localStorage.getItem("giftCart")) || [];

function updateCartDisplay() {
    const cartContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotalSection = document.getElementById("cart-total");
    const totalAmount = document.getElementById("total-amount");

    if (!cartContainer) return;

    cartCount.innerText = cart.length;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotalSection.style.display = "none";
        return;
    }

    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += Number(item.price);
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <span>${item.name} - <strong>₹${item.price}</strong></span>
            <button onclick="removeFromCart(${index})" class="remove-btn">Remove</button>
        `;
        cartContainer.appendChild(div);
    });

    totalAmount.innerText = total;
    cartTotalSection.style.display = "block";
    localStorage.setItem("giftCart", JSON.stringify(cart));
}

function addToCart(name, price) {
    cart.push({ name, price: Number(price) });
    updateCartDisplay();
    alert(`${name} has been added to your cart! 🛍️`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    
    alert("🎉 Order placed successfully! Thank you for shopping with Gift Store.");
    cart = [];
    localStorage.removeItem("giftCart");
    updateCartDisplay();
}

document.addEventListener("DOMContentLoaded", updateCartDisplay);

function searchGifts() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let cards = document.querySelectorAll(".category-card");

    cards.forEach(card => {
        let title = card.querySelector("h3").innerText.toLowerCase();
        let desc = card.querySelector("p").innerText.toLowerCase();
        if (title.includes(input) || desc.includes(input)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}