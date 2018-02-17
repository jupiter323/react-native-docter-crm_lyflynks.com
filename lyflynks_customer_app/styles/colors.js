import Color from 'color';

const c1 = '#2196F3';

const styles = {
  mainColor: c1,
  text: {
    color: '#fff',
  },
  textInput: {
    color: '#000',
    backgroundColor: 'transparent',
    borderBottomColor: Color("#bbbbcc").fade(0.5),
  },
  button: {
    backgroundColor: Color(c1).lighten(0.2),
    shadowColor: Color('#000000'),
  },
  buttonUnderlay: Color(c1).darken(0.2),
}

export default styles;
