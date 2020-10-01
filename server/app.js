const express = require("express");
const app = express();
const port = 8080;
const users = require('../JSON/users.json'); 
//var keygen = require("keygen");
var fs = require('fs'); 
app.use(express.json());



app.listen(port,function (){
    console.log("server running on port:"+port);
});

app.post("/",  async function (req, res) {
    if (req.body.first_action === "sing up") {
        res.send(true);
        //console.log("1");
    }else if(req.body.first_action === "log in"){
        res.send(false);
        //console.log("2");
    }
});

app.post("/new_user",async function (req,res){

    console.log(req.body);
    if(req.body.new_password === req.body.new_password_confirm && req.body.new_email === req.body.new_email_confirm ){

        let user = users.find((item )=>{
            return item.new_username === req.body.new_username || item.new_email === req.body.new_email;
        });
        if(!!user){
            res.send("email o username già in uso");
        }else 
            if (!!user == false) {
            users.push(req.body );
            fs.writeFileSync('users.json',JSON.stringify(users,null,2));
            res.status(200).send("utente aggiunto");
        }
    }else
    res.status(200).send("email o password errati");
    
});

app.post("/login",async function (req,res){
    console.log(req.body);
    let check = users.find((item) => {   
        return item.new_username === req.body.logUsername && item.new_password === req.body.logPassword;
    });
    if (!!check) {
        res.send("Accesso effettuato");
        //var key =  keygen.url(keygen.large);
    }else
    if(!!check == false){
        res.send("I dati inseriti non sono collegati a nessun utente esistente");
    }
}); 


/*
* TODO creare i ruoli  'bollette','spazzatura' e le correlate azioni
*'nuova bolletta','aggiungi articolo per la casa','manda notifica,
*TODO fare il login per admin
*TODO aggiungere un id ad ogni utente inserito
*TODO chiamata per il delete dell utente
*TODO fare la chiamata per modificare un utente esistente
*/