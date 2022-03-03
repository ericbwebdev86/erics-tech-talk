const router = require('express').Router();
const { Comment } = require('../../models');

//get comments
router.get('/', (req, res) => {
    Comment.findAll({})
    .then(dbCommentdata => res.json(dbCommentdata))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
//get one comment
router.get('/:id', (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        }
    }).then(dbCommentdata => res.json(dbCommentdata))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
//create a comment
router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    }).then(dbCommentdata => res.json(dbCommentdata))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});
//update a comment
router.put('/:id', (req, res) => {
    Comment.update(
        {
        comment_text: req.body.comment_text
        },
        {
            where: {
                id: req.params.id
            }
        }).then(dbCommentdata => {
            if(!dbCommentdata) {
                res.status(404).json({ message: 'No comment found with that ID' });
                return;
            }
            res.json(dbCommentdata);
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//delete a comment
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbCommentdata => {
        if(!dbCommentdata) {
            res.status(404).json({ message: 'No comment found with that ID' });
            return;
        }
        res.json(dbCommentdata);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
module.exports = router;