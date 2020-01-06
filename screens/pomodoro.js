import React, {Component} from 'react';
import {
    View, 
    Text, 
    Button, 
    StyleSheet, 
    Dimensions, 
    PixelRatio, 
} from 'react-native';
import * as Font from 'expo-font';


const width = Dimensions.get('window').width;

const styles = StyleSheet.create({

    container: {
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        flex: 1,
    },

    timer: {
        width: width,
        height: width,
        backgroundColor: 'blue',
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: width * 0.5,
    },

    text: {
        fontSize: PixelRatio.getFontScale() * 40,
        color: 'white',
    },

    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: width,
        height: width * 0.1,
        justifyContent: 'space-around',
        backgroundColor: 'gold'
    }

});

class Pomodoro extends Component {

    constructor(props) {
        super(props);
        this.counter = 0;

        this.state = {
            fontLoaded: false,
            minutes: 25,
            seconds: 0,
            isOn: false,

        };
    }

    render() {
        const font = {fontFamily:'ticking'};
        const minutes = this.state.minutes >= 10 ? `${this.state.minutes}`: `0${this.state.minutes}`;
        const seconds = this.state.seconds >= 10 ? `${this.state.seconds}`: `0${this.state.seconds}`;
        return(
            <View style={[styles.container]}>
                <View style={styles.timer}>
                    {
                        
                        this.state.fontLoaded && (
                        
                            <Text style={[{fontFamily:'ticking'}, styles.text]}>{`${minutes}:${seconds}`}</Text>
                        )
                    }   
                </View>

                <View style={styles.buttonContainer}>
                    <Button title='Start' onPress={this.start}/>
                    <Button title='Stop' onPress={this.stop}/>
                </View>
            </View>
        )
    }

    componentDidMount () {
        this._loadFonts();
    }

    componentWillUnmount () {
        this._clear()
    }

    _loadFonts = async () => {
        await Font.loadAsync({
            'ticking': require('../assets/fonts/ticking.ttf')
        });

        this.setState({fontLoaded: true});
    }

    _converMinutesToSeconds(minutes) {
        return minutes * 60
    }

    _timer = (newTime) => {

        if (newTime <= 0) {
            console.log(newTime, '========');
            this._clear();
            return;
        }

        this.setState({
            minutes: Math.floor(newTime / 60),
            seconds: newTime % 60
        })
    }

    init = () => {
        this.counter++;
        this._timer(this._converMinutesToSeconds(0.5) - this.counter);
    }

    start = () => {

        if (this.state.isOn) {
            return
        }
        this.setState({isOn: true});
        this.handle = setInterval(this.init, 1000);
        console.log('timer started and handle is ', this.handle);
    }

    stop = () => {
        this._clear();
        console.log('timer stopped and handle is ', this.handle)
    }

    _clear = () => {
        clearInterval(this.handle)
        this.counter = 0;
        this.setState({
            minutes: 0,
            seconds: 0,
            isOn: false
        });
    }

}

export default Pomodoro;