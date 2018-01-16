# LyfLynks Customer Facing Mobile App
-----------------------------------

## Setup Dev Environment

### Short Instructions

1. Optional: Download [Expo Client](https://expo.io/tools)
2. Install [Yarn](https://yarnpkg.com/en/docs/install)
3. Clone the APP repo
4. Clone the API repo
5. Start local API server
6. Build the app
7. Access via Expo

*Note:* Yarn is required due to bugs in NPM v5 that cause create-react-native-app to crash

### Detailed Instructions

Clone the APP and API repositories:
```
git clone https://lyflynks.visualstudio.com/_git/lyflynks_customer_app
git clone https://lyflynks.visualstudio.com/_git/lyflynks_api
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
or open the app simulator with one of the commands listed in your terminal (provided
you have the appropriate SDKs installed to do so). It may take about a minute
to build and run the app. Once the app is running, hot-reload will automatically
rebuild the app whenever changes are saved to the code.

## So, how does this app work?

This app represents the mobile interface for the LyfLynks customer platform.
With React Native, we target both Android and iOS devices in one JavaScript
codebase. Let's walk through the folder structure to better understand the
architecture of this app.

### /api
The /api directory is where our node.js API wrapper lives. It serves to connect
the front-end app to our back-end API service in an easy-to-use JavaScript
implementation. Rather than deal with the details of Ajax calls directly in our
components and views, we can call recognizable methods that abstract these details
for us.

### /components
Components are the fundamental parts of any React application. Think of this directory
as the home of headers, forms, buttons, etc. that have very basic functionality.

### /pages
Although pages resemble components, they can be thought of as complex compositions of
components. The login page or profile page is a good example of this.

### App.js
The App.js file represents our complete application composed of pages just as
each page represents a complete page composed of components. This is where we define
our navigation between pages.

## Styling components
Component styles are contained within each component definition and applied in-line.
However, to make the process of recoloring the UI simple and consistent, the /styles/StyleGuide.js
file is imported into most components. This allows us to define a set of common colors for
buttons, headers, text, etc. that can be reused across all of our components and easily
updated at any time.

## Running Tests
Tests are written in /\__test\__. Jest watches for changes to this file and
automatically runs tests on save. To start Jest, simply run `yarn test` in a
terminal.
