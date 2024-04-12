import UserModel from '../../models/Users.js';
import ArticleModel from '../../models/Articles.js';

// Create (C)
export const createArticle = async (req, res) => {
    // pull the title, description, image, category from the request object
    const { title, description, image, category } = req.body;

    // pull the email and author from the middleware jwt function
    const { email, author } = req.user;

    try {
        // get user object to save article reference
        let user = await UserModel.findOne({ email });
        if (!user) {
            return res.send({ error: 'No account exists with that email' });
        }

        // Create an article object via the corresponding model
        const article = new ArticleModel({
            author,
            authorid: user._id,
            title,
            description,
            image,
            category,
        });

        // insert the article object into the database
        await article.save();

        // push the article to the user's articles array and save the user object to the database
        user.articles.push(article._id);
        await user.save();

        // Return a success message to the user
        return res.send({ msg: 'Article successfully created' });
    } catch (err) {
        // Return an error message to the user
        return res.send({ error: err.message });
    }
};

// Read (R)
export const getArticle = async (req, res) => {
    // TODO: should we check if the user has favorited this article aswell?

    // pull the article id from the request object using next js's dynamic routing
    var articleid = req.params.id;

    try {
        // search the database on that id, return errore if not found
        let article = await ArticleModel.find({ _id: articleid });
        if (!article) return res.send({ error: 'Article not found' });

        // return the article to the client
        return res.json(article);
    } catch (err) {
        // Return an error message to the user
        return res.send({ error: err.message });
    }
};

// Update (U)
export const updateArticle = async (req, res) => {
    const { articleid, title, description, image, category } = req.body;
    try {
        let article = await ArticleModel.findOne({ _id: articleid });
        if (!article) {
            return res.send({ error: 'No article exists with that id' });
        }

        console.log('new fields:');
        console.log(title, description, image, category);

        console.log('article:');
        console.log(article);

        // update the article
        if (title) article.title = title;
        if (description) article.description = description;
        if (image) article.image = image;
        if (category) article.category = category;

        // save the article object into the database
        await article.save();

        console.log('updated article:');
        console.log(article);

        // Return a success message to the user
        return res.json(/*{ msg: 'Article successfully updated' }*/ article);
    } catch (err) {
        // Return an error message to the user
        return res.send({ error: err.message });
    }
};

// Delete (D)
export const deleteArticle = async (req, res) => {
    // pull the article id from the request object
    const { id } = req.body;

    try {
        // search database to see if the article exists, if not return an error message
        let article = await ArticleModel.find({ _id: id });
        if (!article) return res.send({ error: 'Article not found' });

        // delete the article object from the database
        await ArticleModel.deleteOne({ _id: id });

        // return a message to the client
        return res.json({
            msg: `Article with id (${id}) successfully deleted`,
        });
    } catch (err) {
        // Return an error message to the user
        return res.send({ error: err.message });
    }
};

// Catgorized articles
export const getFeatured = async (req, res) => {
    try {
        // get all articles from the database
        // TODO: figure out how were going to filter them to only get the featured ones
        let articles = await ArticleModel.find({});

        // return the articles to the client
        return res.json(articles);
    } catch (err) {
        // Return an error message to the user
        return res.send({ error: err.message });
    }
};

export const getLatest = async (req, res) => {
    try {
        // get all articles from the database
        // TODO: figure out how were going to filter them to only get the latest ones
        let articles = await ArticleModel.find({});

        // return the articles to the client
        return res.json(articles);
    } catch (err) {
        // Return an error message to the user
        return res.send({ error: err.message });
    }
};

export const getTrending = async (req, res) => {
    try {
        // get all articles from the database
        // TODO: figure out how were going to filter them to only get the trending ones
        let articles = await ArticleModel.find({});

        // return the articles to the client
        return res.json(articles);
    } catch (err) {
        // Return an error message to the user
        return res.send({ error: err.message });
    }
};

export const getCategories = async (req, res) => {
    try {
        // pull the article id from the request object using next js's dynamic routing
        var category = req.params.category;
        console.log(category);

        // get all articles from the database with the category
        let articles = await ArticleModel.find({ category });
        console.log(articles);

        // return the articles to the client
        return res.json(articles);
    } catch (err) {
        // Return an error message to the user
        return res.send({ error: err.message });
    }
};

// Sub-article objects
export const addComment = async (req, res) => {
    let guest = false;

    // pull the articleid, authorid, description from the request object
    const { articleid, description } = req.body;

    if (req.user) {
        // pull the author from the middleware jwt function if the user isnt a guest
        const { author, authorid } = req.user;
    } else {
        guest = true;
    }

    try {
        // get user object to save article reference
        let article = await ArticleModel.findOne({ _id: articleid });
        if (!article) {
            return res.send({ error: 'Could not find article with that id' });
        }

        if (!guest) {
            // get user object to save article reference
            let user = await UserModel.findOne({ _id: authorid });
            if (!user) {
                return res.send({ error: 'Could not find user with that id' });
            }
            console.log(user);
        }

        if (guest) {
            article.comments.push({
                description,
            });
        } else {
            article.comments.push({
                author,
                authorid,
                description,
            });
        }

        // TODO: need to add a default picture to guest comments

        // insert the article object into the database
        await article.save();

        // push the article to the user's articles array and save the user object to the database
        // user.articles.push(article._id);
        // await user.save();

        // Return a success message to the user
        return res.json(article.comments);
    } catch (err) {
        // Return an error message to the user
        return res.send({ error: err.message });
    }
};

// Favorite
export const favoriteArticle = async (req, res) => {
    // pull the articleid, authorid, description from the request object
    const { articleid } = req.body;

    // pull the authorid from the middleware jwt function
    const { authorid } = req.user;

    console.log(articleid, authorid);

    try {
        // get user object to save article reference
        let user = await UserModel.findOne({ _id: authorid });
        if (!user) {
            return res.send({ error: 'No account exists with that email' });
        }

        // get user object to save article reference
        let article = await ArticleModel.findOne({ _id: articleid });
        if (!article) {
            return res.send({ error: 'Could not find article with that id' });
        }

        // TODO: find if the article has already been favorited
        // shouldnt be able to happen if the front-end works correctly
        user.favorites.push(articleid);

        // insert the article object into the database
        await user.save();

        // Return a success message to the user
        return res.json({
            msg: `Article with id (${articleid}) successfully favorited`,
        });
    } catch (err) {
        // Return an error message to the user
        return res.send({ error: err.message });
    }
};

// TODO: should we check if the user has favorited this article aswell?
export const getArticlesByAuthor = async (req, res) => {
    // pull the article id from the request object using next js's dynamic routing
    var { authorid } = req.params;
    console.log(authorid);

    try {
        // search the database on that id, return errore if not found
        let articles = await ArticleModel.find({ authorid });
        if (!articles) return res.send({ error: 'Articles not found' });

        // return the article to the client
        return res.json(articles);
    } catch (err) {
        // Return an error message to the user
        return res.send({ error: err.message });
    }
};
