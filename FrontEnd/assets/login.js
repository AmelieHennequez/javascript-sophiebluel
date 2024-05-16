
const button = document.getElementById("btnconnect"); // Je récupère l'élément qui a l'id btnconnect
button.addEventListener("click", async ()=> {

const lemail = document.getElementById("theemail").value;
const lemdp = document.getElementById("thepassword").value;
const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: `{"email": "${lemail}", "password": "${lemdp}"}`
});
const login = await response.json();
if (response.status===200) {
    window.localStorage.setItem("userToken", login["token"]);
    window.location = "index.html"
} else {
    const errormsg = document.getElementById("errormsg");
    errormsg.style.display = "block";
}

});


