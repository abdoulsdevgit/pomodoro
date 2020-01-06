import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Pomodoro from'./screens/pomodoro';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isShowing: true
    }
  }

  render() {
    return (
      <View style={styles.container}>
      {
        this.state.isShowing ? (<Pomodoro startT={this.startTimer}/>) :
        (<Text> Done </Text>)
      }
        
        <Button title='toggle' onPress={this.handlePress}/>
      </View>
    );
  }

  handlePress = () => {
    this.setState(prevState => {
      return{isShowing: !prevState.isShowing}
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
