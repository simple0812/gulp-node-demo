var Article = require('./article');
var User = require('./user');

var db = require('./db');

User.hasMany(Article, {foreignKey : 'uid'});
Article.belongsTo(User, {foreignKey : 'uid'});

db.sync().then(function() {
    console.log('synchronous database success')
}).catch(function(err) {
    console.log(err, 'synchronous database failed')
})

exports.Article = Article;
exports.User = User;