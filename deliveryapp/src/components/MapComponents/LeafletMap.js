import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Routing from "./RoutingMachine";
import { observer, inject } from 'mobx-react'
import marker from './image/drowRanger.jpg';
import L from "leaflet";
class LeafletMap extends Component {
  state = {
    zoom: 10,
    isMapInit: false
  };

  saveMap = map => {
    this.map = map;
    this.setState({
      isMapInit: true
    });
  };


  render() {
    const position = []
    position.push(this.props.ordersStore.lat)
    position.push(this.props.ordersStore.lan)

    return (
      <Map center={position} zoom={this.state.zoom} ref={this.saveMap}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {this.state.isMapInit && <Routing map={this.map} locations={this.props.locations} />}
      </Map>
    );
  }
}

export default inject("ordersStore")(observer(LeafletMap))
