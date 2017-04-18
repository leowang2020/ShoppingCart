var express = require('express');
var router = express.Router();

/* GET home page. */
router.all('/', function (req, res, next) {
    var cartTgt = [];
    if (req.session.cart !== undefined) {
        cartTgt = req.session.cart;
    }
    
    var cartMessage = '';
    if(req.method ==='POST'){
        if (req.body.update === 'Update'){
            for(i=0;i<req.session.cart.length;i++){    
                if(req.session.cart[i].itemname ===req.body.itemname ){
                    req.session.cart[i].quantity =req.body.quantity;
                    cartMessage = req.session.cart[i].itemname +" has been updated!!! ";
                }
            }           
        }      
        if(req.body.delete === 'Delete'){     
            for(i=0;i<req.session.cart.length;i++){
                if(req.session.cart[i].itemname=== req.body.itemname){
                   cartMessage = req.session.cart[i].itemname +" has been deleted!";
                   cartTgt.splice(i,1);  
                   if (cartTgt.length===0){
                       return res.redirect("/order");;
                   }
                }
            }  
        }
    }
   
    res.render('cart', {title: 'Your Cart', cart: cartTgt, message: cartMessage});
});

module.exports = router;
