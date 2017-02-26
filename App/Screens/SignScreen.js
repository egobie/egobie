import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';

import { Button, Icon, SocialIcon } from 'react-native-elements';
import { Kohana, Fumi } from 'react-native-textinput-effects';
import FlipCard from 'react-native-flip-card'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import Dimension from '../Libs/Dimension';
import BoxShadow from '../Styles/BoxShadow';


class SignScreen extends Component {
  state = {
    flip: false
  };
  defaultWidth = 260;
  inputDefaultProps = {
    iconClass: FontAwesomeIcon,
    iconColor: '#3FA6D1',
    labelStyle: {
      fontSize: 14,
      fontWeight: '400',
    },
    inputStyle: {
      fontSize: 14,
      fontWeight: '400',
      color: '#3FA6D1',
    },
    style: {
      borderBottomColor: '#ABB8C7',
      borderBottomWidth: 1,
      marginBottom: 10,
      backgroundColor: '#F6F6F6',
      width: this.defaultWidth,
    },
  };
  socialIconProps = {
    iconSize: 24,
    style: {
      marginLeft: 0,
      marginRight: 0,
      transform: [
        { scale: 0.8 },
      ],
    }
  };
  animation = {
    scale: new Animated.Value(0),
  };

  constructor(props) {
    super(props);
    this.goToSignIn = this._goToSignIn.bind(this);
    this.goToSignUp = this._goToSignUp.bind(this);
  }

  _goToSignUp() {
    this.setState({
      flip: true,
    });
  }

  _goToSignIn() {
    this.setState({
      flip: false,
    });
  }

  componentDidMount() {
    Animated.spring(this.animation.scale, {
      toValue: 1,
      friction: 5,
      tension: 40,
    }).start();
  }

  signIn() {
    return (
      <Animated.View style = {{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [
          { scale: this.animation.scale },
        ],
      }}>
        <View style = {{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F6F6F6',
          ...BoxShadow,
        }}>
          <View style = {{
            width: this.defaultWidth,
            height: 30,
            marginTop: 15,
            alignItems: 'flex-end',
          }}>
            <Icon
              type = { 'material-community' }
              name = { 'close' }
              color = { '#E04329' }
            />
          </View>
          <View style = {{
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Kohana
              label = { 'Username' }
              iconName = { 'user' }
              { ...this.inputDefaultProps }
            />
            <Kohana
              secureTextEntry
              label = { 'Password' }
              iconName = { 'lock' }
              { ...this.inputDefaultProps }
            />
          </View>
          <Button
            title = 'SIGN IN'
            backgroundColor = '#3FA6D1'
            buttonStyle = {{
              width: this.defaultWidth,
              marginTop: 10,
              marginBottom: 10,
              ...BoxShadow,
            }}
          />
          <View style = {{
            flexDirection: 'row',
            width: this.defaultWidth,
            height: 30,
            marginBottom: 10,
          }}>
            <Text style = {{
              flex: 3,
              fontSize: 12,
              lineHeight: 30,
              textAlign: 'left',
              color: '#3FA6D1',
            }}>
              Recover your password
            </Text>
            <Text
              onPress = { this.goToSignUp }
              style = {{
                flex: 1,
                textAlign: 'right',
                fontSize: 12,
                lineHeight: 30,
                color: '#3FA6D1',
              }}
            >
              Sign Up
            </Text>
          </View>
          <View style = {{
            height: 50,
            width: this.defaultWidth,
            flexDirection: 'row',
            marginBottom: 10,
          }}>
            <Text style = {{
              flex: 2,
              fontSize: 12,
              lineHeight: 50,
              color: '#ABB8C7',
            }}>
              Sign In With
            </Text>
            <View style = {{
              flex: 4,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
              <SocialIcon type = 'google-plus-official' {...this.socialIconProps} />
              <SocialIcon type = 'facebook' {...this.socialIconProps} />
              <SocialIcon type = 'twitter' {...this.socialIconProps} />
            </View>
          </View>
        </View>
      </Animated.View>
    );
  }

  signUp() {
    return (
      <Animated.View style = {{
        flex: 1,
        flexDirection: 'column',
      }}>
        <Kohana
          label = { 'Username' }
          iconName = { 'user' }
          { ...this.inputDefaultProps }
        />
        <Kohana
          secureTextEntry
          label = { 'Password' }
          iconName = { 'lock' }
          { ...this.inputDefaultProps }
        />
        <Button onPress = { this.goToSignIn } />
      </Animated.View>
    );
  }

  render() {
    return (
      <View style = {{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333',
      }}>
        <View style = {{
          height: Dimension.height * 0.75,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <FlipCard
            flip = { this.state.flip }
            friction = { 15 }
            perspective = { 2000 }
            flipHorizontal = { true }
            flipVertical = { false }
            clickable = { false }
            alignWidth = { true }
          >
            { this.signIn() }
            { this.signUp() }
          </FlipCard>
        </View>
      </View>
    );
  }
};

export default SignScreen;