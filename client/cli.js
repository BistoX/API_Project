/*  CLI for some clients who
 *   want to talk with the server
 */
"use strict";
var inquirer = require("inquirer");

console.log("Hi and welcome to the CLI-MENU v0.1.0\n");

var questions = [
  {
    type: "list",
    name: "first_action",
    message: "what do you want to do?",
    choices: ["Sing up", "Log in"],
    filter: function (val) {
      return val.toLowerCase();
    },
  },
];

const axios = require("axios");
const { response } = require("express");

inquirer
  .prompt(questions)
  .then(async (answers) => {

    console.log("\nTrying Validation 1... \n");
    axios
      .post("http://localhost:8080/", answers)
      .then((response) => {



        if (response.data) {//se l' utente seleziona l' opzione sing up nel menù
            var registration_data = [

                {
                    type: "input",
                    name: "new_email",
                    message: "email:",
                    validate: function (value) {
                        var pass = value.match(
                            /^[A-Za-z0-9\._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/gm
                        );
                        if (pass) {
                            return true;
                        }

                        return 'inserisci una e-mail valida';
                    },

                },
                {
                    type: "input",
                    name: "new_email_confirm",
                    message: "confirm email:",
                },
                {
                    type: "input",
                    name: "new_username",
                    message: "username:",
                    validate: function (value) {
                        var pass = value.match(
                            /^([a-zA-Z])[a-zA-Z_-]*[\w_-]*[\S]$|^([a-zA-Z])[0-9_-]*[\S]$|^[a-zA-Z]*[\S]$/);
                        if (pass) {
                            return true;
                        }

                        return 'L\' username deve iniziare con una lettera e gli unici caratteri speciali ammessi sono "-" e "_"';
                    },
                },
                {
                    type: "password",
                    name: "new_password",
                    message: "password:",
                    mask: "*",
                    validate: function (value) {
                        var pass = value.match(
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,30}$/gm
                        );
                        if (pass) {
                            return true;
                        }

                        return 'La password deve essere lunga almeno 4 lettere e massimo 30,non avere spazi, almeno una lettera minuscola, almeno una maiuscola e almeno un numero';
                    },
                },
                {
                    type: "password",
                    name: "new_password_confirm",
                    message: "confirm password:",
                    mask: "*",
                    validate: function (value) {
                        var pass = value.match(
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,30}$/gm
                        );
                        if (pass) {
                            return true;
                        }

                        return 'La password deve essere lunga almeno 4 lettere e massimo 30,non avere spazi, almeno una lettera minuscola ,almeno una maiuscola e almeno un numero';
                    }
            }
          ];
          inquirer.prompt(registration_data).then(async (answers) => {
            console.log("\nTrying Validation for new user... ");          
            axios
              .post("http://localhost:8080/new_user", answers)
              .then((response) => {
                console.log(response.data);
              });
          });
        }else        
          if (!response.data) {  //se l' utente seleziona l' opzione login nel menù
          var accesso =[
            {
              type: "input",
              name: "logUsername",
              message: "Username:",           
            },
            {
              type: "password",
              name: "logPassword",
              message: "Password",
              mask: "*"
            }
          ]

          inquirer.prompt(accesso).then(async (answers) => {
            console.log("\nTrying Validation for acces ... \n");
            axios
              .post("http://localhost:8080/login", answers)
              .then((response) => {
                console.log(response.data);
              });
          });
        }
      })
      .catch((response) => {
        console.error(response);
      });
  
  })
  .finally(function () {
    //
  });
