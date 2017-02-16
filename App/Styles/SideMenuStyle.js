import { StyleSheet, Image } from 'react-native';


export default StyleSheet.create({
  menuBg: {
    position: 'absolute',
  },

  userProfile: {
    flex: 1,
    alignItems: 'center',
  },

  logo: {
    flex: 80,
    resizeMode: Image.resizeMode.contain,
    transform: [
      { scale: 0.9 },
    ],
  },

  username: {
    flex: 20,
    color: '#F0F3F3',
    fontSize: 20,
    marginTop: -10,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },

  menuItemContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: 'transparent',
  },

  menuItem: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 0,
    marginBottom: 1,
    borderBottomWidth: 0,
  },

  menuIcon: {
    marginTop: 2,
    transform: [
      { scale: 0.7 },
    ],
  },

  menuTitleContainer: {
    borderBottomWidth: 0.3,
    borderBottomColor: '#F0F3F3',
    marginLeft: 5,
    paddingLeft: 0,
  },

  menuTitle: {
    fontSize: 14,
    fontWeight: '200',
    lineHeight: 35,
    marginLeft: 0,
    color: '#F0F3F3',
    textAlignVertical: 'center',
  }
});