const express=require('express');
const port=8000;
const path=require('path');

const db =require('./config/mongoose');
const Contact=require(`./model/contact`);

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());

app.use(express.static('assets'));

/*
//creating midddleware 1


app.use(function(req,resp,next1){

    req.myname="Neffi";

    console.log("middleware 1 is called");
    next1();
});

// creating middleware2

app.use(function(req,resp,next){
    console.log(`This is from my MW2:${req.myname}`);

    console.log("middleware 2 is called");
    next();
});


//creating date time middleware

app.use(function(req,res,next){

    console.log(`Time: `, Date.now());
    console.log(`Method`, req.method);
    next();

    });

    */

var contactList=[
    {
        name:"Neffi Bathla",
        phone:"1234567890"
    },
    {
        name:"Neha",
        phone:"9779971636"
    },
    {
        name:"Rahul",
        phone:"0987654321"
    }

]


app.get('/',function(req,resp){
    // console.log(req);
    // resp.send(`<h1>It is running  Cool!!! </h1>`)
    // console.log(`This is from get method:${req.myname}`);

    Contact.find({})
    .then((contacts) =>{
        return resp.render('home',{
            title:"This Contact List",
            contact_list:contacts
            });
        
            
        })

        .catch((err) => {
        resp.send({ kq: 0, msg: 'Errror' })

      })



    // return resp.render('home',{title:"This Contact List",
    //                             contact_list:contactList
    //                             });
   

})


app.get('/practice',function(req,resp){
    return resp.render('practice',{title:"let us play with EJS"});
});

app.post('/create-contact', function(req,resp){
    // return resp.redirect('practice');
    // console.log(req.body);

    /*
    contactList.push({
        name:req.body.name,
        phone:req.body.phone
    });
    */

    // contactList.push(req.body);
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    })

    .then((result) => {
        // resp.send({ kq: 1, msg: 'Đã thêm thành công' })
    
        console.log(`*****************`,result);
        return resp.redirect(`back`);
      })
      .catch((err) => {
        resp.send({ kq: 0, msg: 'Errror' })

      })
    // note below call back function does not work in new version of mongooese
    // function(err, newCotact){
    //     if(err){
    //         console.log(`error in creating the contact!`);
    //         return;
    //     }
    //     console.log(`*****************`,newCotact);
    //     return resp.redirect(`back`);
    // }
    

    // return resp.redirect('back');
});

app.get('/delete-contact/',function(req,res){


    //  get the id from the query from URL

    let id=req.query.id;
    // find the contact in the database using ID and delete it

    Contact.findByIdAndDelete(id)

    .catch((err)=>{
        console.log('error in deleting the object in database');
        return;
    })

    return res.redirect('back');

    /*
    // console.log(req.query);
    let phone=req.query.phone;

    let contactIndex=contactList.findIndex(contact => contact.phone ==phone );
    if(contactIndex != -1){
        contactList.splice(contactIndex,1);

    }
    return res.redirect('back');

    */

    /*
    console.log(req.params);
    let phone=req.params.phone;
    console.log(phone);
    */
})





app.listen(port,function(err){
    if(err){
        console.log("errr in running the server", err);

    }
    console.log(`My express server is running on Port ${port}`);
})