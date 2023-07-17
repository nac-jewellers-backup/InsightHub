'use strict'
const express = require("express");
const bodyParser = require("body-parser");
const path=require('path');







var app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use('/assets', express.static(path.join(__dirname, '/assets')))




var moment = require('moment')
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

var db = require('./config.js');

app.use(function (req, res, next) {
    req.db = db;
    next();
})
app.listen("3064", () => {
    console.log("app listening on the port 3064")
})


    app.get("/user_list", (req,res) => {        
        var sql="SELECT u.*, ADDTIME(u.created_date, '05:30:00') as new_created_date,  ADDTIME(u.last_login, '05:30:00') as new_login,count(b.user_id) as total_bid,(SELECT max(biting_price.bit_amount)FROM `biting_price` WHERE biting_price.user_id=u.user_id and biting_price.status =1) as max_bid  From user u LEFT Join biting_price b on u.user_id = b.user_id GROUP by u.user_id";
        // var sql="SELECT u.*,count(b.user_id) as total_bid,MAX(b.bit_amount) as max_bid  From user u LEFT Join biting_price b on u.user_id = b.user_id GROUP by u.user_id";
        req.db.query(sql, function (err, user_list) {
            console.log(user_list,"sssssss")
            if (!err) {
                var tc = "SELECT COUNT(user_id) as tc FROM `user` ";
                req.db.query(tc, function (err, total_count) {
                   
                    var tba = "SELECT count(DISTINCT user_id)  as tba FROM `biting_price`";
                    req.db.query(tba, function (err, count_ba) {
                        
                        var count_tl = "SELECT count(DISTINCT user_id)  as tl FROM `login_history`";
                        req.db.query(count_tl, function (err, count_tl) {                           

                            var total_reg_date = "SELECT COUNT(*) as rbd FROM `user` WHERE created_date BETWEEN  '2023-07-01' AND '2023-07-07'";
                            req.db.query(total_reg_date, function (err, total_reg_date) {
                             
                                var total_bid = "SELECT COUNT(user_id) as tc FROM biting_price WHERE user_id = '" + req.query.user_id + "'";;
                                req.db.query(total_bid, function (err, total_bid) {
                                   

                                    var total_reg_a8 = "SELECT COUNT(*) as ra8 FROM `user` WHERE created_date >=  '2023-07-8'";
                                    req.db.query(total_reg_a8, function (err, total_reg_a8) {                                        

                                        if (!err) {                                            
                                            res.render('user_list.ejs', { total_reg_a8:total_reg_a8,total_bid:total_bid,total_reg_date:total_reg_date,count_tl:count_tl,count_ba:count_ba,total_count: total_count,user_list: user_list,moment:moment })
                                        }
                                        else {
                                            res.render('user_list.ejs')                                        
                                        }
                                    })
                                })
                            })
                        })
                    })
                })
            }
            else {
                res.render('/user_list')              
            }
        })        
    });




 app.get('/bidding_details',  (req, res) =>{     
    var sql="SELECT Item_master.Item_Name,biting_price.* ,ADDTIME(biting_price.created_date, '05:30:00') as new_created_date from `biting_price` LEFT join Item_master on Item_master.Item_code=biting_price.item_code WHERE biting_price.user_id= '" + req.query.user_id + "' order by created_date DESC";
    // var sql="SELECT Item_master.Item_Name,biting_price.* FROM `biting_price` LEFT join Item_master on Item_master.Item_code=biting_price.item_code WHERE biting_price.user_id= '" + req.query.user_id + "' order by item_code,created_date DESC";
    console.log(sql,"eeeeeeee")
    req.db.query(sql, function (err, user_list) {
        
        if (!err) {
            var tc = "SELECT COUNT(user_id) as tc FROM `user` ";
            req.db.query(tc, function (err, total_count) {               
                var tba = "SELECT  `Item_Name` FROM `Item_master`";
                req.db.query(tba, function (err, count_ba) {                    
                    var count_tl = "SELECT count(DISTINCT user_id)  as tl FROM `login_history`";
                    req.db.query(count_tl, function (err, count_tl) {
                        var total_reg_date = "SELECT COUNT(*) as rbd FROM `user` WHERE created_date BETWEEN  '2023-07-01' AND '2023-07-07'";
                        req.db.query(total_reg_date, function (err, total_reg_date) {
                            var item_code_count = "SELECT Item_master.item_name,biting_price.item_code,count(biting_price.item_code) as new_count FROM `biting_price` LEFT JOIN Item_master on Item_master.Item_code=biting_price.item_code WHERE biting_price.user_id='" + req.query.user_id + "' GROUP by item_code";
                            req.db.query(item_code_count, function (err,item_code_count ) {
                                console.log(item_code_count,"fffffff")
                                var total_reg_a8 = "SELECT COUNT(*) as ra8 FROM `user` WHERE created_date >=  '2023-07-8'";
                                req.db.query(total_reg_a8, function (err, total_reg_a8) {
                                    var data = [];
                                    for (let i=0; i < user_list.length; i++) {
                                        data.push({
                                            item_name: user_list[i].Item_Name,
                                            bid_amount:user_list[i].bit_amount,
                                            status:user_list[i].status,
                                            new_created_date:user_list[i].new_created_date
                                        });
                                    }
                                    if (!err) {                                        
                                        res.render('bidding_details.ejs', { count_ba:count_ba,item_code_count:item_code_count,total_reg_a8:total_reg_a8,total_reg_date:total_reg_date,count_tl:count_tl,count_ba:count_ba,total_count: total_count,user_list: data,moment:moment })
                                    } else {
                                        console.log("jjj")
                                        res.redirect('/')                           
                                    }
                                })
                            })
                        })
                    })
                })
            })
        }      
        else{
            console.log("ppppp")
            res.redirect('/')}
    })    
    }) 


    app.get('/product_details',  (req, res) =>{    
        // var sql="SELECT DISTINCT Item_master.*,SUM(CASE WHEN biting_price.status = 0 THEN 1 ELSE 0 END) as Failure, SUM(CASE WHEN biting_price.status = 1 THEN 1 ELSE 0 END) as Success, count(DISTINCT biting_price.bit_amount) as total_bit_count,count(DISTINCT biting_price.user_id) as total_user_count,MAX(DISTINCT biting_price.created_date) as recent ,user.user_name as name FROM Item_master JOIN biting_price ON Item_master.Item_code =biting_price.item_code join user on Item_master.user_id =user.user_id GROUP BY Item_master.Item_code";  
        // var sql="SELECT DISTINCT Item_master.*,SUM(CASE WHEN biting_price.status = 0 THEN 1 ELSE 0 END) as Failure, SUM(CASE WHEN biting_price.status = 1 THEN 1 ELSE 0 END) as Success, count(DISTINCT biting_price.bit_amount) as total_bit_count,count(DISTINCT biting_price.user_id) as total_user_count,MAX(DISTINCT biting_price.created_date) as recent ,user.user_name as name FROM Item_master left JOIN biting_price ON Item_master.Item_code =biting_price.item_code left join user on Item_master.user_id =user.user_id GROUP BY Item_master.Item_code"; recent
        var sql="SELECT DISTINCT Item_master.*,SUM(CASE WHEN biting_price.status = 0 THEN 1 ELSE 0 END) as Failure, SUM(CASE WHEN biting_price.status = 1 THEN 1 ELSE 0 END) as Success, count(biting_price.bit_amount) as total_bit_count,count(DISTINCT biting_price.user_id) as total_user_count,MAX(DISTINCT ADDTIME(biting_price.created_date, '05:30:00')) as recent ,user.user_name as name FROM Item_master left JOIN biting_price ON Item_master.Item_code =biting_price.item_code left join user on Item_master.user_id =user.user_id GROUP BY Item_master.Item_code";
        req.db.query(sql, function (err, user_list) { 
                     
            if (!err) 
            {
                res.render('product_details.ejs', {user_list: user_list,moment:moment})
            }
            else
            {
                res.render('product_details.ejs')                          
            }
                
            })
        }) 


    app.get('/product_bidding',  (req, res) =>{
        console.log(req.query.Item_code,"aaaaaaaaa")    
        // var sql="SELECT * FROM `biting_price` WHERE item_code = '" + req.query.Item_code + "' ORDER BY created_date DESC";        
        var sql="SELECT biting_price.*, ADDTIME(biting_price.created_date, '05:30:00') as new_createddate,user.* FROM `biting_price` LEFT join user on user.user_id=biting_price.user_id WHERE biting_price.item_code = '" + req.query.Item_code + "' AND biting_price.status = 1 ORDER BY id DESC";
        req.db.query(sql, function (err, user_list) {
            console.log(user_list.length,"qqqqqqqqqq") 
            if (!err) 
            {
                res.render('product_bidding.ejs', {user_list: user_list,moment:moment})
                }
            else
            {
                res.render('product_bidding.ejs')                        
            }
        })    
    })
    
  
    app.get("/", (req, res) => {
        var sql="SELECT count(*) as count,item_code FROM `biting_price` GROUP by item_code";
        req.db.query(sql, function (err, user_list) {
            console.log(user_list,"fffffffff")
            if (!err) 
            {
                var tc = "SELECT COUNT(user_id) as tc FROM `user` ";
                req.db.query(tc, function (err, total_count) {
                    console.log(total_count.length,"ddddddd")

                    var tba = "SELECT count(DISTINCT user_id)  as tba FROM `biting_price`";
                    req.db.query(tba, function (err, count_ba) { 
                        
                        var sb = "SELECT  count(`status`) as count FROM `biting_price` WHERE status = 1";
                        req.db.query(sb, function (err, success_bid) { 

                            var top_product = "SELECT Item_master.Item_Name,biting_price.item_code,count(biting_price.item_code) as bid_count FROM `biting_price` INNER JOIN Item_master on Item_master.Item_code=biting_price.item_code GROUP by biting_price.item_code ORDER by bid_count DESC LIMIT 0,1";
                            req.db.query(top_product, function (err, top_product) { 

                                var neg_bid = "SELECT count(status) as nag_attempt FROM `biting_price` where status = 0";
                                req.db.query(neg_bid, function (err, neg_bid) {

                                    var total_bid = "SELECT count(id) as total  FROM `biting_price` ";
                                    req.db.query(total_bid, function (err, total_bid) {
                                
                                        
                                        var recent_bid = "SELECT biting_price.*, ADDTIME(biting_price.created_date, '05:30:00') as new_createddate,user.user_name FROM `biting_price` LEFT join user on user.user_id=biting_price.user_id where status = 1 order by biting_price.created_date desc LIMIT 10";
                                        req.db.query(recent_bid, function (err, recent_count) {

                                            var recent_3m = "select * from user where last_login BETWEEN SUBTIME(CURRENT_TIMESTAMP,'00:03:00') AND  CURRENT_TIMESTAMP";
                                            req.db.query(recent_3m, function (err, recent_time) {
                            
                                                if (!err) {                                          
                                                    res.render('dashboard.ejs', {recent_time:recent_time,recent_count:recent_count,total_bid:total_bid,neg_bid:neg_bid,top_product:top_product, success_bid:success_bid,count_ba:count_ba,total_count:total_count,user_list: user_list,moment:moment })
                                                }                        
                                                else
                                                {
                                                    res.render('dashboard.ejs')                        
                                                }
                                            })
                                        })
                                    })
                                })
                            })
                        })
                                                                    
                    })
                })
            }
        })           
    })


    app.get("/ajax_ch",(req,res)=>{
        var sql="SELECT i.item_code,i.Item_Name,COUNT(b.item_code) AS count FROM Item_master i LEFT JOIN biting_price b ON b.item_code = i.item_code WHERE b.status = 1 GROUP BY i.item_code ";
        req.db.query(sql, function (err, user_list) { 
            if(!err){
                res.send({msg:1,user_list: user_list})
            }
            else{
                res.send({msg:0})
            }
        })       
    })


    app.get("/ajax_ch2",(req,res)=>{
        var sql="SELECT DATE_FORMAT(created_date,'%d-%m-%Y') as created_date, COUNT(created_date) AS total_Regist from user GROUP BY DATE_FORMAT(created_date,'%d-%m-%Y') ORDER BY created_date ASC;";
        req.db.query(sql, function (err, chart2) { 
            if(!err){
                res.send({msg:1,chart2: chart2})
            }
            else{
                res.send({msg:0})
            }
        })       
    })


   
    