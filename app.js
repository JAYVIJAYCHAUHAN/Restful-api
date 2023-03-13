const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/wiki",{
        useNewUrlParser:true
    });

     const articleSchema ={
         title :String,
          conten:String
     };
      const Article =mongoose.model("Article",articleSchema);
           // we can use route in one block of code
         /*   app
              .route("/articles")
              .get(function (req, res) {
                Article.find(function (err, found) {
                  if (!err) {
                    res.send(found);
                  } else {
                    res.send(err);
                  }

                  //console.log(found);
                  // localhost:3000/articles

                  res.send(found);
                });
              })
              .post(function (req, res) {
                //console.log (req.body.title)
                // console.log(req.body.content);
                console.log();
                console.log();
                const newArticle = new Article({
                  title: req.body.title,
                  content: req.body.content,
                });

                newArticle.save();
              })
              .delete(function (req, res) {
                // this is route
                Article.deleteMany(function (err) {
                  if (!err) {
                    res.send("successfully deleted all artices");
                  } else {
                    res.send(err);
                  }
                });
              }); 

              */
 // get request 
         app.get("/articles",function(req,res){
           Article.find(function(err,found){
             
                    if(!err){
                         res.send(found);
                    }
                    else{
                         res.send(err);
                    }
             
            //console.log(found);
            // localhost:3000/articles
             
             res.send(found);
           }) ;
         });
          // post request
           app.post("/articles",function(req,res){
             //console.log (req.body.title)
           // console.log(req.body.content);
        console.log();
         console.log();
       const newArticle = new Article({
         title: req.body.title,
         content: req.body.content
       });

  newArticle.save();
           });
  // delete request 
           app.delete("/articles",function(req,res){
                      // this is route
           Article.deleteMany(function(err){
             if(!err){
                 res.send("successfully deleted all artices");
             }
              else{
                 res.send(err);
              }
           });   
           });

             // requestion targetting a specifi article//

           app.route("/articles/:articleTitle")
         //  req.params.articleTitle="jquery"
            .get(function(req,res){
                req.params.articleTitle
                Article.findOne({ title: req.params.articleTitle },function(err,found){
                if(found){
                   res.send(found);
                }
                else{
                   res.send("no article are fond ");
                }
                });
            })
            .put(function(req,res){
               Article.update(
                {title:req.params.articleTitle},
                {title:req.body.title,content:req.body.content},
                 {overwrite:true},
                  function(err){
                    if(!err){
                     res.send("successfully updated ");
                  }
                   else{
                     res.send("there are some error");
                   }
                }
               );
            });
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
