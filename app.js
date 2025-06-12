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

const formData = {
  title: "The effect of growth",
  content: "Self-discovery is a process of self-reflection, exploration, and growth that can help you gain a clearer sense of purpose and direction in life. It can also lead to improved relationships, better decision-making, and enhanced well-being.",
}

const post = []
const getPost = () => {
  post.push(formData)
  post.push(formData)
  post.push(formData)
  post.push(formData)
  post.push(formData)
  post.push(formData)
  post.push(formData)
  return post;
}

const allPost = getPost();
console.log(allPost);


app.get('/', (req, res) => {
  res.render("index.ejs", {allBlogPost: allPost})
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});