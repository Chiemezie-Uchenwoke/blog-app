import express from 'express';
import bodyParser from 'body-parser';
const app = express()

const port = 3355;

// middleware
app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.render("index.ejs")
});

// Store all users post
const post = [];

app.post("/newblog", (req, res) => {
  const {title, content} = req.body;

  const getPost = () => {
    const formData = {
      heading: title,
      postContent: content,
    }

    post.push(formData)

    return post;
  }

  const allPost = getPost();

  res.render("index.ejs", {allBlogPost: allPost});
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});