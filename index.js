#!/usr/bin/env node

const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');
const shell = require('shelljs');
const Mustache = require('mustache');

console.log(process.argv)

const config = require(`${process.cwd()}/barbero.config.json`);

const taskInput = process.argv[2];

const init = () => {
  console.log(
    'Insert task variables'
  );
};

const askQuestions = (task) => {
  const questions = (task.variables || []).map((variable) => {
    return {
      type: 'input',
      name: variable.name,
      message: `${variable.description || variable.name}:`,
      default: variable.default
    };
  });

  return inquirer.prompt(questions);
};

const createFile = (template, view) => {
  const contents = fs.readFileSync(template.inputFile, 'utf8');
  
  Mustache.parse(contents);
  
  const output = Mustache.render(contents, view);
  const outputDir = Mustache.render(template.outputDir, view);
  const outputFile = Mustache.render(template.outputFile, view);


  const outputPath = `${outputDir}/${outputFile}`;

  shell.mkdir('-p', outputDir);
  
  // write file
  fs.writeFileSync(outputPath, output);

  return outputPath;
};

const success = filepath => {
  console.log(
    chalk.white.bgGreen.bold('Done'),
    `File created at ${filepath}`
  );
};

const run = async () => {
  const task = config.tasks.find((configTask) => {
    return taskInput === configTask.name;
  });

  if (task) {
    // show script introduction
    init();

    // ask questions
    const answers = await askQuestions(task);

    // add globals
    if (config.globals) {
      const globals = Object.keys(config.globals);

      globals.forEach(global =>
        answers[global] = config.globals[global]
      );
    }

    // create the file
    if ((task.templates || []).length > 0) {
      task.templates.forEach((template) => {
        const filePath = createFile(template, answers);
        
        // show success message
        success(filePath);
      });

    }
  } else {
    console.log('error');
  }
};

run();