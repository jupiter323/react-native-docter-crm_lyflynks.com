# LyfLynks Customer Facing Mobile App
-----------------------------------

## Setup Dev Environment

### Short Instructions

1. Install [Yarn](https://yarnpkg.com/en/docs/install)
2. Clone the APP repo
3. Clone the API repo
4. Start local API server
5. Build the app
6. Access via Expo

*Note:* Yarn is required due to bugs in NPM v5 that cause create-react-native-app to crash

### Detailed Instructions

Clone the APP and API repositories:
```
git clone https://github.com/LyfLynks/lyflynks_customer_app.git
git clone https://github.com/LyfLynks/lyflynks_api.git
```

Then start the API dev server:
```
cd lyflynks_api
vagrant up
vagrant ssh
npm run dev
```

In a new tab, build the mobile app:
```
cd lyflynks_customer_app
yarn install
yarn start
```

Now, you may either scan the QR code via the Expo app on an Android / iOS device,
or open the app simulator/emulator with one of the commands listed in your terminal (provided
you have the appropriate SDKs installed to do so). It may take about a minute
to build and run the app. Once the app is running, hot-reload will automatically
rebuild the app whenever changes are saved to the code.

## App Architecture

### /api
The /api directory is for our Node.js API wrapper. It allows us to abstract
AJAX requests to the REST API, which we can use as recognizable functions in Redux.

### /components
Contains React components, which provide basic functionality.

### /screans
Screens resemble components, however, they represent an entire page in the application (e.g. Activity Log).

### /Navigation
The navigationStack.js file specifies all navigation actions between screens using `react-navigation`. The
three available navigation types are DrawerNavigator, StackNavigator, and TabNavigator. 

### App.js
The App.js file is the root of our App. It is currently wraps our Navigation component with Redux.

## Styling components
Component styles are contained within each component definition and applied in-line.
However, to make the process of recoloring the UI simple and consistent, the /styles/colors.js
file is imported into several components. This allows us to define a set of common colors for
buttons, headers, text, etc. that can be reused across all of our components. Wherever it makes sense,
reusable styles should be stored in /styles.

## Running Tests
Tests are written in /\__test\__. Jest watches for changes to this file and
automatically runs tests on save. To start Jest, run `yarn test` in a
terminal.
