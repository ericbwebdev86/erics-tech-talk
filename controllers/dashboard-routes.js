const router = require('express').Router();
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            //use user ID from session
            user_id: req.session.user_id
        },
        attributes: ['id', 'title', 'content', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(dbPostData => {
        //serialize
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true })
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'content', 'created_at'],
        include: [{
            model: User,
            attributes: ['username']
        },
        // {
        //     model: Comment,
        //     attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        //     include: {
        //         model: User,
        //         attributes: ['username']
        //     }
        // }
    ]
    }).then(dbPostdata => {
        if(!dbPostdata) {
            res.status(404).json({ message: 'No post with that ID found.' });
            return;
        }
        const post = dbPostdata.get({ plain: true });
        res.render('edit-post', { post, loggedIn: true })
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router;