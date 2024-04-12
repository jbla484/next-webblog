import UserModel from '../../models/Users.js';
import ArticleModel from '../../models/Articles.js';

export const getAuthor = async (req, res) => {
    // pull the article id from the request object using next js's dynamic routing
    var authorid = req.params.id;

    try {
        // search the database on that id, return errore if not found
        let author = await UserModel.find({ _id: authorid }).select(
            '-password'
        );
        if (!author) return res.send({ error: 'Author not found' });

        // return the article to the client
        return res.json(author);
    } catch (err) {
        // Return an error message to the user
        return res.send({ error: err.message });
    }
};

export const updateAuthor = async (req, res) => {
    // // pull the article id from the request object using next js's dynamic routing
    // var authorid = req.params.id;
    // try {
    //     // search the database on that id, return errore if not found
    //     let author = await UserModel.find({ _id: authorid }).select(
    //         '-password'
    //     );
    //     if (!author) return res.send({ error: 'Author not found' });
    //     // return the article to the client
    //     return res.json(author);
    // } catch (err) {
    //     // Return an error message to the user
    //     return res.send({ error: err.message });
    // }
};

export const deleteAuthor = async (req, res) => {
    // pull the article id from the request object using next js's dynamic routing
    const authorObject = { _id: req.params.id };

    try {
        // search the database on that id, return errore if not found
        let author = await UserModel.find(authorObject);
        if (!author) return res.send({ error: 'Author not found' });

        await UserModel.deleteOne(authorObject);

        // return the article to the client
        return res.json(author);
    } catch (err) {
        // Return an error message to the user
        return res.send({ error: err.message });
    }
};
