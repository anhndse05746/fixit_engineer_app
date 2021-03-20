import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  containerScrollView: {
    padding: 15,
    paddingBottom: 30,
  },
  modalFormSheet: {
    // Following UIModalPresentationFormSheet size
    // this not change on different iPad sizes
    width: 540,
    height: 620,
    overflow: 'hidden',
    borderRadius: 10,
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  opacity5: {
    opacity: 0.5,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
  },
  separatorTop: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  separatorBottom: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  separatorVertical: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  separatorLeft: {
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
  textRegular: {
    textAlign: 'left',
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
        fontWeight: '400',
      },
      android: {
        includeFontPadding: false,
        fontFamily: 'Montserrat',
        fontWeight: 'normal',
      },
    }),
  },
  textMedium: {
    textAlign: 'left',
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
        fontWeight: '500',
      },
      android: {
        includeFontPadding: false,
        fontFamily: 'Montserrat',
        fontWeight: 'normal',
      },
    }),
  },
  textSemibold: {
    textAlign: 'left',
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
        fontWeight: '600',
      },
      android: {
        includeFontPadding: false,
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
      },
    }),
  },
  textBold: {
    textAlign: 'left',
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
        fontWeight: '700',
      },
      android: {
        includeFontPadding: false,
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
      },
    }),
  },
  inputLastChild: {
    marginBottom: 15,
  },
  notchLandscapeContainer: {
    marginTop: -34,
    paddingHorizontal: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
