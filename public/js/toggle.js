const toggleBtn = document.getElementById("toggleSideBarBtn");
const sideBar = document.getElementById("sideBar");

toggleBtn.addEventListener("click", () => { 
    sideBar.classList.toggle("hidden");
})