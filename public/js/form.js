const form = document.getElementById("newBlog");
const createBlogBtn = document.getElementById("createBlog");
const createBlogContainer = document.getElementById("blogContainer");
const closeFormBtn = document.getElementById("closeForm");
const blogWrapper = document.getElementById("blogWrapper");
const blogOverlay = document.getElementById("blogOverlay");

const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");
const editIndexInput = document.getElementById("editIndex");

createBlogBtn.addEventListener("click", () => {
    createBlogContainer.style.display = "none";
    blogOverlay.style.display = "block";
    blogWrapper.style.overflowY = "hidden";
    form.style.display = "flex";
});

closeFormBtn.addEventListener("click", () => {
    blogOverlay.style.display = "none";
    blogWrapper.style.overflowY = "scroll";
    createBlogContainer.style.display = "flex";
    form.style.display = "none";
});