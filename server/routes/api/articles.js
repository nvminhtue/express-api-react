const mongoose = require('mongoose');
const router = require('express').Router();
const Articles = mongoose.model('Articles');

router.post('/', (req, res, next) => {
  const { body } = req;

  if(!body.title) {
    return res.status(422).json({
      errors: {
        title: 'is required',
      },
    });
  }

  if(!body.author) {
    return res.status(422).json({
      errors: {
        author: 'is required',
      },
    });
  }

  if(!body.body) {
    return res.status(422).json({
      errors: {
        body: 'is required',
      },
    });
  }

  const finalArticle = new Articles(body);
  finalArticle.save()
    .then(() => res.json({ articles: finalArticle.toJSON() }))
    .catch(next)
  return finalArticle;
});

router.get('/page/:page', async (req, res, next) => {
  const limitPage = 5;
  const offset = (req.params.page - 1) * limitPage;
  const articlesCount = await Articles.count({});
  return Articles.find()
    .sort({ createdAt: 'descending' })
    // .then((articles) => res.json( { articles: articles.map(article => article.toJSON() )}))
    .then((articles) => res.json( { articles: articles.slice(offset, offset + limitPage), articlesCount}))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Articles.findById(id, (err, article) => {
    if(err) {
      return res.sendStatus(404);
    } else if(article) {
      req.article = article;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next)  => {
  return res.json({
    article: req.article.toJSON(),
  });
});

router.patch('/:id', async (req, res, next) => {
  const { body } = req;
  if(typeof body.title !== 'undefined') {
    req.article.title = body.title;
  }

  if(typeof body.author !== 'undefined') {
    req.article.author = body.author;
  }

  if(typeof body.body !== 'undefined')  {
    req.article.body = body.body;
  }

  req.article.save()
    .then(() => {
      res.json({ article: req.article.toJSON() })
    })
    .catch(next);
  return req.article.toJSON();
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Articles.findByIdAndRemove(req.article._id)
    res.send({id: req.article._id})
  } catch(err) {
    //do nothing
  }
});

module.exports = router;