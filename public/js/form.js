const form = document.getElementById("newBlog");
const createBlogBtn = document.getElementById("createBlog");
const createBlogContainer = document.getElementById("blogContainer");
const closeFormBtn = document.getElementById("closeForm");
const blogWrapper = document.getElementById("blogWrapper");
const blogOverlay = document.getElementById("blogOverlay");

// edit 
const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");
const editButtons = document.querySelectorAll(".editBtn");

// delete
const deleteButtons = document.querySelectorAll(".deleteBtn");

const showForm = () => {
    createBlogContainer.style.display = "none";
    blogOverlay.style.display = "block";
    blogWrapper.style.overflowY = "hidden";
    form.style.display = "flex";
}

const hideForm = () => {
    blogOverlay.style.display = "none";
    blogWrapper.style.overflowY = "scroll";
    createBlogContainer.style.display = "flex";
    form.style.display = "none";
}

// To create a new blog
createBlogBtn.addEventListener("click", () => {
    delete form.dataset.editingId; 
    showForm();
});

closeFormBtn.addEventListener("click", () => {
    hideForm();
});

// Edit button click handler - JUST populate form, DON'T send request
editButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const postId = e.currentTarget.dataset.id;
        const article = document.querySelector(`article[data-id='${postId}']`);
        
        // Store the postId in a hidden field or dataset
        form.dataset.editingId = postId;
        
        // Fill form with existing content
        titleInput.value = article.querySelector("h3").innerText;
        contentInput.value = article.querySelector("p").innerText;

        // Show the form
        showForm();
    });
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const postData = {
        title: titleInput.value,
        content: contentInput.value
    };

    const editingId = form.dataset.editingId;

    if (!postData.title || !postData.content) {
        return;
    }

    try {
        const url = editingId ? `/updateblog/${editingId}` : `/newblog`;
        const method = editingId ? "PUT" : "POST";

        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            const error = await response.json();
            alert(error.message || "Something went wrong.");
            return;
        }

        // On success, reload the page
        window.location.reload();

    } catch (err) {
        console.error("Error:", err);
        alert("Something went wrong.");
    } finally {
        form.reset();
        delete form.dataset.editingId;
        hideForm();
    }
});


deleteButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
        const postId = btn.dataset.id;

        try {
            const response = await fetch(`/deleteblog/${postId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId: postId })
            });

            const data = await response.json();

            if (response.ok){
                console.log(data.message);
                
                // const postElement = document.querySelector(`article[data-id="${postId}"]`);
                // const listElement = document.querySelector(`aside li[data-id="${postId}"]`);

                location.reload();

            } else {
                // Show error message
                alert(data.message || "Failed to delete post");
            }
        } catch (err){
            console.log("Error deleting post:", err);
        }
    });
});