/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Bluebird = require('bluebird');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var HealthKit = Bluebird.promisifyAll(require('NativeModules').JFHealthKit);

var jiffsync = React.createClass({

  getInitialState: function(){
    return {requestingData: false, steps: []}
  },
  render: function() {
    console.log('render')
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Simple Sync!
        </Text>
        <Text>{this.state.steps.length | 0} records loaded</Text>
        <TouchableHighlight
                        style={styles.touchableHighlight}
                        underlayColor="#99AA99"
                        onPress={this.requestAccess}>
                            <View style={[styles.buttonBox, styles.loadButtonBox]}>
                                <Text style={styles.buttonText}>
                                    Load
                                </Text>
                            </View>
                    </TouchableHighlight>
      </View>
    );
  },

  requestAccess: function(){
    this.setState({requestingData: true});
    console.log('chekcing for permission');
    HealthKit.askForPermissionToReadTypesAsync([HealthKit.Type.StepCount])
      .then(() => this.retrieveSteps())
      .then((steps) => this.setState({steps: steps}))
  },

  retrieveSteps: function(){

    console.log('retrieving step data');
    return HealthKit.getStepsDataAsync({});
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonContainer : {
        flexDirection  : 'row',
        justifyContent : 'center',
        alignItems     : 'center',
        marginTop      : 20
    },

    touchableHighlight : {
        marginLeft  : 10,
        marginRight : 10,
    },

    buttonBox : {
        flexDirection  : 'row',
        justifyContent : 'center',
        alignItems     : 'center',
        padding        : 10,
        borderWidth    : 2,
        borderRadius   : 5
    },
});

AppRegistry.registerComponent('jiffsync', () => jiffsync);
