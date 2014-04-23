# Code Conventions

You usually will follow [Airbnb's code styleguide](https://github.com/airbnb/javascript).

Sections above are specific guidelines you have to follow and rules we want to point out.

## Code Editor Config

We are currently following simple editor configuration rules.

- Always use **UTF-8** for text files
- Indent with **2 spaces** (like the tetra.io codebase)
- Always insert a blankline at end of files ([explanations](http://stackoverflow.com/questions/729692/why-should-files-end-with-a-newline))
- Don't leave blank characters at end of lines

These rules are defined in the [`.editorconfig`](https://github.com/LukeParis/adillions-next/blob/master/.editorconfig) file at the project's root. Please install the [EditorConfig](http://editorconfig.org/) plugin for your code editor. The plugin will automatically read the file and apply these rules to your code editor.

If there is no plugin for your code editor, please configure it manually to follow these rules.

## Variables declarations

`var` declarations should look like following the example :
```javascript
var items = getItems(),
    goSportsTeam = true,
    dragonball,
    length,
    i;
```

See [airbnb var section](https://github.com/airbnb/javascript#variables).

## Node Guidelines

- Modules everywhere
-

