-- install webpack and webpack-cli as devDependency

-- by default webpack builds in prod mode and output a dist directory

-- instead of running webpack all the time from node_modules/.bin/webpack we create a script in package.json script section

-- to simply build assets, we create a build command with webpack as argument

-- real power of webpack is to bundle modules in our source code

-- to pass arguments to webpack we can run: npm run build -- --mode development

--basically webpack creates an IIFE and recieves an argument of object of all the modules to bundle.

--if we want our own configs in webpack we need to create webpack.config.js file

-- we use babel transpiler to convert es6 to es5

--dependencies: npm i -D @babel/core @babel/cli @babel/preset-env

--babel-cli puts an executable in node_modules/.bin

--preset-env is what tells babel to convert what es6 features to es5

--at this point project has capability to bundle js and comiple to es5 js with the help of webpack and babel, but they are not configured to work together

--to make them work together we use babel-loader: npm i -D babel-loader

--and add it to webpacks module section where we specify loaders

--now we install react to our project with: npm i -S react react-dom prop-types

--if we try to build react code babel will error out because it is unable to parse jsx as valid js code.

--to make babel understand jsx we use: npm i -D @babel/preset-react

-- and configure webpack to use this preset is babel presets array

--we need HTML file to host our js react code, we can let webpack generate that file for us by installing: npm i -D html-webpack-plugin

--then we update webpack config to use this plugin, by default it will generate a simple html file with bundle js file linked in it.

--but we can give it a template html file as an option

--to build files continuosly we need to run webpack in watch mode

--add it to scripts in package.json as: webpack --watch

--to create separate webpack configs for prod and dev we use package: npm i -D webpack-merge

--and then rename webpack.config file to webpack.config.base.js, and add new file for webpack.config.dev.js and webpack.config.prod.js

--take mode setting out of base config and add specific settings to these two files using merge package

--then update package.json and add --config flag to webpack

--now we want to run dev env from a local running dev server instead of file and live reload feature

--so to keep watch mode and dev server running we use: npm i -D webpack-dev-server

--then update dev script in package.json to instead of running webpack in watch mode, run webpack-dev-server and pass --open flag to automatically open in browser. it defaults to port 8080

--to change port goto webpack dev config and create key for devServer and pass object with options of port.

--to make debugging easier we add source maps support in webpack, edit webpack dev config, devtools: 'source-map'

--now lets add a default css file in our app which is a basic css reset

--add an import for css in index.js, by default webpack don't understand css syntax, and we need to add a loader for it.

--loader for css: npm i -D css-loader style-loader

--add another rule in module in base config for css

-- css-loader allows webpack to parse css, style-loader is taking that css and injecting it into file

-- now we add support for babel to compile class properties js feature which are not part of spec yet. we install babel plugin for this: npm i -D @babel/plugin-proposal-class-properties

--and then add it into base config

--now we enable hot-module-reloading which means instead of reloading whole page on change and loose all the state, just swap out the parts.

-- npm i -S react-hot-loader

-- then we need to edit config file and react-hot-loader includes a babel plugin so add it in there.

--then go to App.js and at the top import it, and then export App wrapped in hot function

--then create copy of dev script to dev:hot with --hot flag.

--we have a problem now there are duplicate scripts in package.json dev, dev:hot almost identical but a --hot flag, if we need to change to script we need to do it in both places

-- good part is that we can call npm scripts from within them.

--so now dev:hot is: npm run dev -- --hot

--to analyze our webpack bundles we can use webpack plugin called: npm i -D webpack-bundle-analyzer

--then we wire it up in prod config, by default it will hang the process and opens a webpage with bundle stats.

--but we want to open the stats but close the build process, for that set analyzerMode to static in constructor
--openAnalyzer: false = to stop opening in browser and just generate the file
--reportFilename: 'bundle-info.html' = to change report file name

--our app relies on react and react dom, but it's a good idea to load them from cdn in production so to reduce our bundle size.

--for this add externals key in prod config with library names

--then edit html template to only include react from cdn if env is prod

--to add support for older browsers we need to install babel-polyfill by npm i -S @babel/polyfill

--then import that polyfill in index.js, this will add all the polyfills for es6 features and increase the bundle size. but if we know which browsers to support we need to change babel-preset-env to an array of targets.

--targets uses browserslist to determine which browsers to support, we can view this list by running npx browserslist "last 2 versions, not dead, not < 2%"

--without configration babel-preset-env will add support for all es15- to -whatever current version is.

--let's add support for webpack code spliting, we want to load components asyc istead of bundling all at once.

--dynamic import with react.lazy and use with react.suspese is the option here, but babel fails to compile dynamic imports, we install plugin for that: npm i -D @babel/plugin-syntax-dynamic-import

--now webpack will add this component as a dynmic bundle and not in the static bundle and it will only be downloaded when needed.

--add jest support for testing, install it with npm i -D jest

--then edit test script in package.json to use jest

--to test react code we need to install: npm i -D react-testing-library jest-dom

--by default jest fails to parse react jsx code so we need to fix this by using babel to transform our code for testing as well

--because there is too much going on in our webpack config wih babel, we will create a .babelrc file to hold all rules related to babel

--now if we get this kind of error "Requires Babel "^7.0.0-0", but was loaded with "6.26.3"." we need to install another package: npm i -D babel-jest babel-core@bridge
--this will resolve the version issue in babel

--right now i am not getting jest error, but if jest is not able to understand dynamic import syntax because it's using node to run we need to install: npm i -D babel-plugin-dynamic-import-node
--and then edit babelrc file and add plugin to env.test.plugin array

import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

--we are importing these two test files and they needs to be in every test file so let's make them available to all of them by adding jest.config.js file and testSetup.js file to add globals to our test env.

--setup prettier in project: npm i -D prettier pretty-quick

--create .prettierrc file to config prettier options

-- we run this to format all the files in project so next time when we clone it we have formated files npx prettier --write "**/\*.js" , npx prettier --write "**/\*.json"

--add .prettierignore to igrore files from formatting

-- add eslint support: npm i -D eslint eslint-plugin-react

-- we use eslint --init to init config file and use recomended

-- remove rules from eslint config file because we are using prettier for formatiing

--create eslintignore file

-- now we are getting "Parsing error: Unexpected token import" error from eslint, to fix this we need npm i -D babel-eslint

--and in eslint config file at the top add parser and extend plugin:react/recommended and set settings key

--add a11y support n react with eslint install: npm i -D eslint-plugin-jsx-a11y

--edit eslint config and add in plugins and extends

--let's ensure all code is formated, linted and tested before commiting to git

--we need to install: npm i -D husky

--then add husky config in package.json to run lint and test pre commit

--avoid deprecated react code with React.StrictMode, simply wrap App component in index.js with this component, now we will get warning in dev mode in console

--create an Error boundary in React app, first add a file DefaultErrorBoundary.js in src folder

--to catch a11y issues in browser we need to use: npm i -D react-axe

--for sass support we need to install: npm i -D sass-loader node-sass
sass-loader: For SCSS support
node-sass: A dependency for sass-loader

\*mini-css-extract-plugin: This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.

\*uglifyjs-webpack-plugin: To minify JavaScript code for production

\*optimize-css-assets-webpack-plugin To minify CSS code for production

\*copy-webpack-plugin: Copies files/folders to your build folder.
