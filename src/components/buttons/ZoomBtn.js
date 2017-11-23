import React, { Component } from "react";
import { StyleSheet, View, TouchableHighlight, Text } from "react-native";

class ZoomBtn extends Component {
  constructor(props) {
    super(props);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.state = {
      zoom: props.zoom
    };
  }

  zoomIn() {
    if (this.state.zoom < 22) {
      this.controlZoom(this.state.zoom + 1);
      this.setState({ zoom: this.state.zoom + 1 });
    }
  }

  zoomOut() {
    if (this.state.zoom > 0) {
      this.controlZoom(this.state.zoom - 1);
      this.setState({ zoom: this.state.zoom - 1 });
    }
  }

  controlZoom(zoomLevel) {
    this.props.getZoom(zoomLevel);
  }

  render() {
    return (
      <View style={styles.zoomContainer}>
        <TouchableHighlight
          onPress={this.zoomIn}
          underlayColor="#E0E0E0"
          style={styles.zoomControlsContainer}
        >
          <Text style={styles.zoomFont}> + </Text>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={this.zoomOut}
          underlayColor="#E0E0E0"
          style={styles.zoomControlsContainer}
        >
          <Text style={styles.controlsFont}> - </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  zoomContainer: {
    position: "absolute",
    flex: 1,
    top: 10,
    right: 15,
    width: "10%",
    height: "20%",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderColor: "#000000",
    borderWidth: 1
  },
  zoomControlsContainer: {
    height: "50%",
    alignItems: "center",
    justifyContent: "center"
  },
  zoomFont: {
    textAlign: "center",
    fontSize: 25
  }
});

export default ZoomBtn;
