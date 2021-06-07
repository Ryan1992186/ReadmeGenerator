//All external packages
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const api = require('./homework-09/ReadmeGenerator/api.js');
const generateMarkdown = require('./homework-09/ReadmeGenerator/generateMarkdown.js');

// TODO: Create an array of questions for user input
const questions = [ 
    inquirer
    .prompt ([
    {
        type: 'input',
        message: 'What is your Github Username?',
        name: 'username',
        default: 'ryan1992186',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log('Please enter a valid Github username');
            }
            return true;
        }
    },
    {
        type: 'input',
        message: 'what is the name of the repository?',
        name: 'repo',
        default: 'ReadmeGenerator',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log('a vaid repo is required for a bage')
            }
            return true;
        }
    },
    {
        type: 'input',
        message: 'What is title of the project?',
        name: 'title',
        default: 'ReadmeGenerator',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log('valid title is required')
            }
            return true;
        }

    },
    {
        type: 'input',
        message: "Write a description of your project.",
        name: 'description',
        default: 'Professional github readme generator',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid description is required.");
            }
            return true;
        } 
    },
    {
        type: 'input',
        message: "Please describe the steps required to install your project for the Installation section.",
        name: 'installation'
    },
    {
        type: 'input',
        message: "Provide instructions and examples of your project in use for the Usage section.",
        name: 'usage'
    },
    {
        type: 'input',
        message: "Provide guidelines on how other developers can contribute to your ReadMe.",
        name: 'contributing'
    },
    {
        type: 'input',
        message: "Provide tests written for your application and provide examples on how to run them.",
        name: 'tests'
    },
    {
        type: 'list',
        message: "Pick a license for your professional readme file.",
        choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
        name: 'license'
    }
    
 ]), 
    ];

// TODO: Create a function to write README file

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
          return console.log(err);
        }
      
        console.log("Yay!!! Your README.md file has been generated")
    });
}

const writeFileAsync = ReadmeGenerator.promisify(writeToFile);

// TODO: Create a function to initialize app

async function init() {
    try {

        // Prompt Inquirer questions
        const userResponses = await inquirer.prompt(questions);
        console.log("Your responses: ", userResponses);
        console.log("Thank you for your response! I am grabbing your github data now!");
    
        // Call GitHub api for user info
        const userInfo = await api.getUser(userResponses);
        console.log("Your GitHub user information: ", userInfo);
    
        // Pass Inquirer userResponses and GitHub userInfo to generateMarkdown
        console.log("Generating your README!")
        const markdown = generateMarkdown(userResponses, userInfo);
        console.log(markdown);
    
        // Write markdown to file
        await writeFileAsync('ExampleREADME.md', markdown);

    } catch (error) {
        console.log(error);
    }
};

// Function call to initialize app
init();
