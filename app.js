const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Declare array to hold team members
const team = [];

app();

function app(){
    function createManager() {
        console.log("Need manager of team before building team");
        
        inquirer.prompt([
          {
            type: "input",
            name: "manager_name",
            message: "What is the team manager's name?",
            validate: res => {
              if (res !== "") {
                return true;
              }
              return "Name must have more than 0 characters";
            }
          },
          {
            type: "input",
            name: "manager_id",
            message: "What is the team manager's id?",
            validate: res => {
              if (res > 0) {
                return true;
              }
              return "IDs must not be negative.";
            }
          },
          {
            type: "input",
            name: "manager_email",
            message: "What is the team manager's email?",
            validate: res => {
              const pass = res.match(
                /\S+@\S+\.\S+/
              );
              if (pass) {
                return true;
              }
              return "Email address is invalid";
            }
          },
          {
            type: "input",
            name: "manager_office_number",
            message: "What is the team manager's office number?",
            validate: res => {
                if (res > 0) {
                    return true;
                }
              return "Office number cannot be negative";
            }
          }
        ]).then(res => {
          const newManager = new Manager(res.manager_name, res.manager_id, res.manager_email, res.manager_office_number);
          team.push(newManager);
          //addMembers();
        });
      }
    

}
