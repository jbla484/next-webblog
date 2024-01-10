import UserModel from '../../models/Users.js';
import ArticleModel from '../../models/Articles.js';

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

export const updateArticle = async (req, res) => {
    // const { title, description, image, category } = req.body;
    // try {
    //     // Create an article object via the corresponding model
    //     const article = new ArticleModel({
    //         title,
    //         description,
    //         image,
    //         category,
    //     });
    //     // insert the article object into the database
    //     await article.save();
    //     // Return a success message to the user
    //     return res.send({ msg: 'Article successfully created' });
    // } catch (err) {
    //     // Return an error message to the user
    //     return res.send({ error: err.message });
    // }
};

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

export const getArticle = async (req, res) => {
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
