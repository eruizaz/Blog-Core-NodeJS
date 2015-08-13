var models = require('../models/models.js');


/*
*  Auto-loading con app.param
*/
exports.add = function(req, res, next) {

    var best = req.body.best || 5;
   

  models.Favourite
  .findOrCreate({postId: req.post.id, userId: req.user.id}, {
      best: req.body.best,
      updatedAt: new Date(),
      createdAt: new Date()
  })
  .success(function(fav) {
      fav.best = best;
      fav.updatedAt = new Date();
      fav.save(['best', 'updatedAt'])
        .success(function() {
            req.flash('success', 'Favorito creado con éxito.');
            res.redirect('back');
        })
        .error(function(error) {
            next(error);
            res.end();
          });
  })
  .error(function(error){
      next(error);
      res.end();
  });
};

exports.delete = function(req, res, next) {
    models.Favourite.find({where: {postId: req.post.id, userId: req.user.id}})
        .success(function(fav){ 
            if (fav) fav.destroy();
            res.redirect('back');
        });
};


    // GET /users/25/favourites
exports.index = function(req, res, next) {
   console.log('he llegado a index --> VIVA')
   models.Favourite.findAll({where: {userId: req.user.id,
                                      best: [4, 5]},
                                      offset: req.pagination.offset,
                                      limit: req.pagination.limit})
          .success(function(favourites) {
                 var postIds = favourites.map(function(favourite) {
                                                               return favourite.postId;
                                                          });

                 var where_value_patch;
                 if (postIds.length == 0) {
                      where_value_patch = '"Posts"."id" in (NULL)';
                 } else {
                      where_value_patch = '"Posts"."id" in (' + postIds.join(',') + ')';
                 }


                 models.Post.findAll({order: 'updatedAt DESC',
                                               where: where_value_patch, 
                                               include: [ { model: models.User, as: 'Author' },
                                               models.Favourite ]
                })
                .success(function(posts) {
                        if(req.session.user) {
                          posts.forEach(function(miPost) {
                            miPost.favourites.forEach(function(miFav) {
                              if (miFav.userId == req.session.user.id) {
                                miPost.best = miFav.best;
                              }
                            })
                          })

                        res.render('favourites/index.ejs', {
                            posts: posts
                        });
                    }
            });
      });                                
}
    