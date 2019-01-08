# Barbero

Mustache template generator

## Install

    $ npm i razueroh/barbero

## CLI tool

### Global

barbero can be installed as a global tool on your computer

    $ npm i -g razueroh/barbero

    $ barbero <task>

### DevDependency

or as a package.json `devDependency`

    $npm i -D razueroh/barbero

And add a script to your package.json

    {
      "scripts" {
        "build-component": "barbero component"
      }
    }

## Setup

In order tu use barbero you have to create a file `barbero.config.json` in your project's root folder

### tasks

You can declare an array of tasks to be executed by barbero

    {
      "tasks": [
        {
          "name": "component",
          "variables": [
            {
              "name": "component", 
              "description": "Component name",
              "default": "Component"
            }
          ],
          "templates": [
            {
              "inputFile": "./templates/Component.mustache",
              "outputDir": "./src/ui/{{component}}",
              "outputFile": "{{component}}.jsx"
            },
            {
              "inputFile": "./templates/Component.test.mustache",
              "outputDir": "./src/ui/{{component}}/__tests__/",
              "outputFile": "{{component}}.test.js"
            }
          ]        
        }
      }

- `name`: ID used by barbero to identify the task
- `variables`: Variables included in the mustache templates
- `templates`: Array of templates to be used by the task

### Variables

Array of variables included in the task templates. If you have multiple templates related to the same task then you have to include all variables in the array.

- `name`: Name of the variable in the mustache template
- `description`: Variable description
- `default`: Default value

### Templates

Array of mustache templates

- `inputFile`: Path to mustache template
- `outputDir`: Path to the folder where the output file must be created. You can use the mustache varaibles in the path.
- `outputFile`: Name of the output file. You can use the mustache variables.

## To Do

- Add exceptions
- Add tests

## Contributions

Barbero is a work in progress, all contributions are welcome.

## License

[MIT](LICENSE.md)