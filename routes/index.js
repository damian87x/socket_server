
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.client = function(req, res){
  res.render('client', { id: req.params.id , title: 'Client Chat', host: req.get('host') })
};