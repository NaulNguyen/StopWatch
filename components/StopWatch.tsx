    import React, {Component} from 'react';
    import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
    import formatTime from 'minutes-seconds-milliseconds';

    
    export default class StopWatch extends Component {

        constructor(props: any) {
            super(props);
            this.state = {
                timeElapsed: null,
                running: false,
                startTime: null,
                laps: [] ,
                interval: null
            };

            this.handleStartPress = this.handleStartPress.bind(this);
            this.startStopButton = this.startStopButton.bind(this);
            this.handleLapPress = this.handleLapPress.bind(this);
        }
        
        laps() {
            return this.state.laps.map(function(time, index) {
            return <View key={index} style={styles.lap}>
                <Text style={styles.lapText}>
                    Lap {index + 1}
                </Text>
                <Text style={styles.lapText}>
                    {formatTime(time)}
                </Text>
            </View>
            });
        }
        
        startStopButton() {
            var style = this.state.running ? styles.stopButton : styles.startButton;
            return <TouchableHighlight underlayColor="gray"
            onPress={this.handleStartPress} style={[styles.button, style]}>
                <Text style={this.state.running ? {color:'rgb(228, 8, 10)'} : {color: 'rgb(125, 218, 88)'} }>
                    {this.state.running ? 'Stop' : 'Start'}
                </Text>
            </TouchableHighlight>;
        }
        
        lapButton() {
            return <TouchableHighlight style={[styles.button, styles.lapButton]}
            underlayColor="gray" onPress={this.handleLapPress}>
            <Text style={{color:'white'}}>
                Lap
            </Text>
            </TouchableHighlight>;
        }
        
        handleLapPress() {
            const lap = this.state.timeElapsed;
            this.setState(prevState => ({
                startTime: new Date(),
                laps: [...prevState.laps, lap]
            }));
        }
        
        handleStartPress() {
            if(this.state.running) {
                clearInterval(this.interval);
                this.setState({running: false, interval: null});
                return;
            }
        
            this.setState({startTime: new Date()});
        
            this.interval = setInterval(() => {
                this.setState(prevState => ({
                    timeElapsed: new Date() - prevState.startTime,
                    running: true
                }));
           
            }, 30);
        }
        render() {
            return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.timerWrapper}>
                        <Text style={styles.timer}>
                            {formatTime(this.state.timeElapsed)}
                        </Text>
                    </View>
                        <View style={styles.buttonWrapper}>
                            {this.lapButton()}
                            {this.startStopButton()}
                        </View>
                </View>
                <View style={styles.footer}>
                    {this.laps()}
                </View>
            </View>
            );

        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: 'black'
        },
        header: {
            flex: 1
        },
        footer: {
            flex: 1
        },
        timerWrapper: {
            flex: 5,
            justifyContent: 'center',
            alignItems: 'center'
        },
        buttonWrapper: {
            flex: 3,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
        },
        lap: {
            justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: 'black',
            marginTop: 10
        },
        button: {
            borderWidth: 2,
            height: 100,
            width: 100,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
        },
        timer: {
            fontSize: 60,
            color: 'white'
        },
        lapText: {
            fontSize: 16,
            color: 'white'
        },
        lapButton: {
            borderWidth: 1, 
            borderColor: 'white',
            backgroundColor: 'rgba(232, 232, 232, 0.5)'
        },
        startButton: {
            borderColor: 'rgb(125, 218, 88)',
            backgroundColor: 'rgba(11, 102, 35, 0.5)',
        },
        stopButton: {
            borderColor: 'red',
            backgroundColor: 'rgba(228, 8, 10, 0.5)'
        }
    });

