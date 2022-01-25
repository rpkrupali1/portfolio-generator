const inquirer = require('inquirer');
// const fs = require('fs');
// const generatePage = require('./src/page-template.js')
// const pageHTML = generatePage(name, github);

// fs.writeFile('index.html',pageHTML,err=>{
//     if(err) throw err;
//     console.log('Portfolio complete! Check out index.html to see the output!');
// });
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'what is your name? (Required)',
            validate: nameInput => {
                if(nameInput)
                    return true;
                else{
                    console.log("Please make sure to return your name?");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'what is your github user name? (Required)',
            validate: nameInput => {
                if(nameInput)
                    return true;
                else {
                    console.log("Please enter github user name");
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'provide some information about yourself',
            when: ({confirmAbout}) => {
                if(confirmAbout)
                    return true;
                else
                    return false;
            }
        }
    ]);
}

const promtProject = portfolioData  => {
    // If there's no 'projects' array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log(`
        ==================================
        ADD A NEW PROJECT
        ==================================
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project? (Required)',
            validate: nameInput => {
                if(nameInput)
                    return true;
                else {
                    console.log("Please enter your project name");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: nameInput => {
                if(nameInput)
                    return true;
                else {
                    console.log("Please provide project description");
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: nameInput => {
                if(nameInput)return true;
                else {
                    console.log('Please provide github link to your project');
                    return false;
                }``
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if(projectData.confirmAddProject){
            return promtProject(portfolioData);
        }
        else
            return portfolioData;
    });
}

promptUser()
.then(promtProject)
.then(portfolioData => console.log(portfolioData));