import UserModel from '../../models/Users.js';
import ArticleModel from '../../models/Articles.js';

export const createArticle = async (req, res) => {
    const { title, description, image, category } = req.body;
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
