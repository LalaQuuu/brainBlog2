import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];



// Route to render the main page
app.get("/", (req, res) => {
    res.render("index", {
        posts: posts,
    });
});

// Route to handle new post submission
app.post("/submit", (req, res) => {
    const postTitle = req.body.title;
    const postContent = req.body.content;
    
    if (postTitle && postContent) {
        posts.push({ title: postTitle, content: postContent });
    }

    res.redirect("/");
});



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

