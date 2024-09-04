import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';

import AppMain from './src/app';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => AppMain);

export default AppMain;
