# LyfLynks Customer Facing Mobile App
-----------------------------------

## Development environment setup

1. [Get the API running](https://github.com/LyfLynks/lyflynks_api)
2. Clone this repo
3. Install [Yarn](https://yarnpkg.com/en/docs/install)
4. Run `yarn install`

## Running the application

*Note:* the application has been ejected from expo. XCode and Android Studio should be used to run the applications.

### Running on iOS

1. If you haven't already, install [CocoaPods](https://cocoapods.org/)
2. In this ios directory, run `pod install`
3. Open XCode, and run the app on a simulator or your device

### Running on Android

TODO

### Logging into the application

Note that the registration process for LyfLynks is a manual process that includes an interview with the user prior to activating their account. Due to this, the API database is seeded with pre-registered users that you can use to interact with the application. One such user is:

username: billyj
password: bjpassword

This user belongs to two accounts that you should be able to select from after logging in.

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
The App.js file is the root of our App. It currently wraps our Navigation component with Redux.

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
