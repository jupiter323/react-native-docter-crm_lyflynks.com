// import 'haul/hot';
import { AppRegistry } from 'react-native';
import App from './src';
AppRegistry.registerComponent('LYN', () => App);

// if (module.hot) {
//     module.hot.accept('./src/HomeScreen.js', () => {
//     clearCacheFor(require.resolve('./src/HomeScreen'));
//         redraw(() => require('./src/HomeScreen').default, 'Home');
//     });
//     module.hot.accept('./src/SecondScreen.js', () => {
//         clearCacheFor(require.resolve('./src/SecondScreen'));
//         redraw(() => require('./src/SecondScreen').default, 'Second');
//     });
// }