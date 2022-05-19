# Proposal
```
Project Name: 
  Restaurant Website

Description: 
  Website for a business owner to have CRUD functionality for their products. As an admin you should have a dashboard to update the site. As a user you should be able to view the listed items and add them to a cart.

MVP:
  -Admin Role
  -User Role
  -Authorization via Firebase
  -CRUD
  
Stretch Goals:
  -Google Sign In
  -Password Recovery
  -Views/Ability For Users To Add Item Objects To Cart
  -Payment Auth

Tech Used:
  -JS
  -React / React-Router-Dom / React-Redux
  -Redux / Redux Middleware (Logger/Thunk/Saga)
  -Node
  -SCSS
  -Firebase

Decisions Made:
  -At the start I was planning on making a pokemon fansite including a pokedex/battle sim, but with many complications integrating canvas with REACT I decided to switch gears. I decided to switch to something I could continue to build upon after the capstone week, something I could use as a headliner for my current portfolio. After spending 12hrs+ researching an idea I had scrapped, I got to researching what this website would need and immediately jumped into studying redux. By the time I felt I had a grasp on it it was crunch time, and had to rush it a little.

Lessons Learned:
  -Prepare/Plan more
  -Be more prepared for roadblocks/bugs
  -Focus more on the frameworks/library documentation rather than just googling it

Link to Repo:
  -TBA
```

## Setup

* in your terminal navigate to where you want to store the repo and clone it from -insert-repo-here-
* inside of the cloned repo, create a file called config.js inside of the firebase folder
* setup a firebase account
    -start a project on firebase
    -navigate to the project settings on the firebase website, and in the previously created config.js fill it with the firebaseConfig you will find on the website. It should look something like
    ```
    const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
    };
    ```
    -in the root directory of the project run -npm start-
    -enjoy

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
