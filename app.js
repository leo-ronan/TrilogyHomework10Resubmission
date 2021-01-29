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

    newManager();
    function newManager() {
        console.log("Need manager of team before building team");
        //Inquirer prompts user for the team manager
        inquirer.prompt([
          {
            type: "input",
            name: "manager_name",
            message: "What is the team manager's name?",
            validate: res => {
                //Ensure input length is > 0
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
                //Ensure input is > 0
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
                //Ensure input has format <string> @ <string> . <string>
              const regexCheck = res.match(
                /\S+@\S+\.\S+/
              );
              if (regexCheck) {
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
                //Ensure input is not negative
                if (res > 0) {
                    return true;
                }
              return "Office number cannot be negative";
            }
          }
        ]).then(res => {
            //Create a new manager object with user input as parameters
          const newManager = new Manager(res.manager_name, res.manager_id, res.manager_email, res.manager_office_number);
            //Push to team array
          team.push(newManager);
        }).then(function() {
            //Continue (or return) to add members section
            addMembers();
        })
    }
    
    function addMembers() {
        inquirer.prompt([
            {
              type: "list",
              name: "new_member",
              message: "Select which type of employee to add",
              choices: [
                "Intern",
                "Engineer",
                "Done"
              ]
            }
          ]).then(res => {
            switch(res.new_member) {
                case "Engineer":
                    newEngineer();
                break;
                case "Intern":
                    newIntern();
                break;
                case "Done":
                    createTeam();
            }
          });
        }

       function createTeam() {
           //Check if the filepath exists, and if it does, set path and render the html file
           if (fs.existsSync(OUTPUT_DIR)) {
                fs.writeFileSync(outputPath, render(team));
           }
           //User won't need to delete the output folder when running the app a second time
           else {
                fs.mkdirSync(OUTPUT_DIR);
                fs.writeFileSync(outputPath, render(team));
           }
        }

       function newEngineer() {
            console.log("Adding new engineer");
            inquirer.prompt([
                {
                  type: "input",
                  name: "engineer_name",
                  message: "Enter engineer's name",
                  validate: res => {
                    if (res !== "") {
                      return true;
                    }
                    return "Engineer name can't be 0 characters";
                  }
                },
                {
                  type: "input",
                  name: "engineer_id",
                  message: "Enter engineer's id",
                  validate: res => {
                    if (res > 0) {
                        return true;
                      }
                    return "Id must not be negative";
                  }
                },
                {
                  type: "input",
                  name: "engineer_email",
                  message: "Enter engineer's email",
                  validate: res => {
                    const regexCheck = res.match(
                      /\S+@\S+\.\S+/
                    );
                    if (regexCheck) {
                      return true;
                    }
                    return "Email address is invalid";
                  }
                },
                {
                  type: "input",
                  name: "engineer_github",
                  message: "Enter engineer's GitHub name?",
                  validate: res => {
                    if (res !== "") {
                      return true;
                    }
                    return "Github name can't have 0 characters";
                  }
                }
              ]).then(res => {
                const engineer = new Engineer(res.engineer_name, res.engineer_id, res.engineer_email, res.engineer_github);
                team.push(engineer);      
              }).then(function() {
                  addMembers();
              })
       }

       function newIntern() {
        console.log("Adding new intern");
        inquirer.prompt([
            {
              type: "input",
              name: "intern_name",
              message: "Enter intern's name",
              validate: res => {
                if (res !== "") {
                  return true;
                }
                return "Intern's name can't be 0 characters";
              }
            },
            {
              type: "input",
              name: "intern_id",
              message: "Enter intern's id",
              validate: res => {
                if (res > 0) {
                    return true;
                  }
                return "Id must not be negative";
              }
            },
            {
              type: "input",
              name: "intern_email",
              message: "Enter intern's email",
              validate: res => {
                const regexCheck = res.match(
                  /\S+@\S+\.\S+/
                );
                if (regexCheck) {
                  return true;
                }
                return "Email address is invalid";
              }
            },
            {
              type: "input",
              name: "intern_school",
              message: "Enter school intern attends",
              validate: res => {
                if (res !== "") {
                  return true;
                }
                return "School name can't have 0 characters";
              }
            }
          ]).then(res => {
            const intern = new Intern(res.intern_name, res.intern_id, res.intern_email, res.intern_school);
            team.push(intern);      
          }).then(function() {
              addMembers();
          })
       }
}
