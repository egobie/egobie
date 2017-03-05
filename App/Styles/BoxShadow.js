import { Platform } from 'react-native';

export default Platform.select({
  ios: {
    shadowColor: 'rgba(0, 0, 0, .4)',
    shadowOffset: {
      height: 1,
      width: 1
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  android: {
    elevation: 2
  }
});
