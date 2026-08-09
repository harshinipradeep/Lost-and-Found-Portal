function register() {

    const name = document.getElementById("name")?.value?.trim();
    let usn = document.getElementById("usn")?.value?.trim();
    const email = document.getElementById("email")?.value?.trim();

    if (!usn) return;

    const usnNumber = parseInt(usn);

    if (isNaN(usnNumber) || usnNumber < 1 || usnNumber > 500) {
        alert("USN must be between 001 and 500");
        return;
    }

    usn = usnNumber.toString().padStart(3, "0");

    const user = {
        name,
        usn,
        email
    };

    localStorage.setItem(usn, JSON.stringify(user));

    alert("Registered Successfully");
    window.location = "login.html";
}


function login() {

    let usn = document.getElementById("loginUSN")?.value?.trim();

    if (!usn) return;

    const usnNumber = parseInt(usn);

    if (isNaN(usnNumber) || usnNumber < 1 || usnNumber > 500) {
        alert("Enter valid USN");
        return;
    }

    usn = usnNumber.toString().padStart(3, "0");

    const user = localStorage.getItem(usn);

    if (user) {
        localStorage.setItem("currentUser", usn);
        alert("Login successful");
        window.location = "feed.html";
    } else {
        alert("USN not registered");
    }
}


function logout() {
    localStorage.removeItem("currentUser");
    window.location = "login.html";
}


function uploadItem() {

    const file = document.getElementById("imageInput").files[0];

    if (!file) {
        alert("Please upload image");
        return;
    }

    const reader = new FileReader();

    reader.onload = function () {

        const item = {
            itemName: document.getElementById("itemName").value,
            description: document.getElementById("description").value,
            location: document.getElementById("location").value,
            posterEmail: document.getElementById("posterEmail").value,
            secretColor: document.getElementById("secret information").value,
            image: reader.result
        };

        let items = JSON.parse(localStorage.getItem("items")) || [];

        items.push(item);

        localStorage.setItem("items", JSON.stringify(items));

        alert("Uploaded successfully");
        window.location = "feed.html";
    };

    reader.readAsDataURL(file);
}


function loadFeed() {

    const feed = document.getElementById("feed");
    if (!feed) return;

    feed.innerHTML = "";

    let items = JSON.parse(localStorage.getItem("items")) || [];

    items.forEach((item, index) => {
        feed.innerHTML += `
        <div class="card">
            <img src="${item.image}" class="item-image">

            <h3>${item.itemName}</h3>
            <p>${item.description}</p>
            <p>${item.location}</p>

            <button onclick="claimItem('${item.posterEmail}','${item.itemName}')">
                Yes, it's mine
            </button>

            <button onclick="deleteItem(${index})">
                Delete
            </button>
        </div>
        `;
    });
}


function deleteItem(index) {

    if (confirm("Delete this item permanently?")) {

        let items = JSON.parse(localStorage.getItem("items")) || [];

        items.splice(index, 1);

        localStorage.setItem("items", JSON.stringify(items));

        alert("Deleted successfully");

        loadFeed();
    }
}


function claimItem(email, itemName) {
    window.location.href =
        `mailto:${email}?subject=Claim Request&body=I think ${itemName} is mine`;
}


loadFeed();