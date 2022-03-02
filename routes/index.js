/*let User = require('mongoose').model('User');*/
let express = require('express');
let router = express.Router();
let userControllers = require('../controllers/userController.js')
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});
let fs = require('fs');

//getting Tweet data from id
router.get('/tweet/:id', function(req, res){
  let id = req.params.id;
  
  //find Tweet with given id
  fs.readFile('./favs.json', 'utf-8', function(err, data){
    data = JSON.parse(data);
    data.find({'id': id}, (err, offer)=>{});
    console.log( data.find({'id': id}, (err, offer)=>{}));
    res.send( "Success" );
  })
})

//gets details from json file
router.get('/', (req, res, next) => {
  //res.send('respond with a resource');
  return User.find(function (err, clients) {
    if (!err) {
      res.render('detail.ejs', {
        title: 'Details',
        clients: clients
      });
    } else {
      return console.log(err);
    }
  });
});

//create new Tweet
router.post('/addTweet', function(req, res){
  //get the parsed information
  let tweetInfo = req.body;
  
  //read existing users 
  fs.readFile('./favs.json', 'utf-8', function(err, data){
    data = JSON.parse(data);
    if(!tweetInfo.text || !tweetInfo.id) {
      res.send();
    }
    else{
      //create new Tweet
      let newTweet = new tweetInfo({
        id: tweetInfo.id,
        text: tweetInfo.text,
        created_at: Date((Date.now))
      });
     
      //add Tweet to json
      data.push(newTweet);
    }
   }); 
});


//shows the list of users
router.get('/show', (req, res, next) => {

  fs.readFile('./favs.json', 'utf-8', function(err, data){
    console.log(data);
    res.end(data);
  });

});

//updates the user with the given id's screen_name and name
router.put('/user/:id', (req, res) => {
  let id = req.params.id;
  let personInfo = req.body;

  User.update({ unique_id: id }, {
    name: personInfo.name,
    screen_name: personInfo.screen_name,
  }, (err, rawResponse) => {
    // console.log(rawResponse);
  });

});

//delete a tweet
router.delete('/tweet/:id', (req, res) => {
  let id = req.params.id;

  //read existing users and delete the one with the given id
  fs.readFile('./favs.json', 'utf-8', function(err, data){
    data = JSON.parse(data);
    data.findOneAndRemove({'id': id}, (err, offer) =>{});
    res.send("Success");
  });
});

module.exports = router;
