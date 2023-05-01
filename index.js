const inquirer = require('inquirer');

const fs =  require('fs');

const { Triangle, Square, Circle } = require('./lib/shapes.js');
const { choices } = require('yargs');

function writeToFile (answers) {
let sgvString = '';
sgvString += `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">`

sgvString += `<g>`;



// sgvString += `${answers.shape}`
let pickedShape;
if (answers.shape === 'Triangle') {
    pickedShape = new Triangle()
    sgvString 
    += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;
}
if (answers.shape === 'Square') {
    pickedShape = new Square()
    sgvString += `<rect x="73" y="40" width="160" height="160"${answers.shapeBackgroundColor}"/>`;
}
if (answers.shape === 'Circle') {
    pickedShape = new Circle()
    sgvString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
}
sgvString +=  `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;

sgvString += `</g>`

sgvString += `</svg>`

fs.writeFile('logo.svg', sgvString, (err) => {
    err ? console.log(err) : console.log('Sucessfully generated logo.svg file');
})

}
 
const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'what text do you want to use? (enter up to three characters)'

    },
    {
        type: 'input',
        name: 'textColor',
        message: 'what text color do you want to use? (enter color keyword or a hexadecimal number)'
    },
    {
        type: 'list',
        name: 'shape',
        message: 'what shape do you want to pick?',
        choices: ['Circle', 'Triangle', 'Square']
    },
    {
        type: 'input',
        name: 'shapeBackgroundColor',
        message: 'Pick shape color (Enter keyword OR hexadecimal number)',
      
    },
]
inquirer 
.prompt(questions)
.then((answers) => {
   if  (answers.text.length > 3){
    console.log('please enter no more than three characters')
   } else {
writeToFile(answers);
   }
   
});