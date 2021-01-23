
import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {

  createLeafletElement() {
    const { map } = this.props;
    const myIcon = new L.Icon({
      iconUrl: "https://img.icons8.com/plasticine/100/000000/order-on-the-way.png",
      iconSize:     [60, 60]// size of the icon
  })

    const orderIcon = new L.Icon({
      iconUrl: "https://img.icons8.com/color/100/000000/order-delivered.png",
      iconSize:     [60, 60]// size of the icon
    })

    let leafletElement = L.Routing.control({
      waypoints: this.props.locations,
      fitSelectedRoutes: true,
      draggableWaypoints: false,
      routeWhileDragging: false,
      createMarker: function (i, wp, nWps) {
        if (i === 0 ) {
          return L.marker(wp.latLng, {
            icon: myIcon 
          }).bindPopup("I am here Working ... ");
        } else {
          return L.marker(wp.latLng, {
            icon: orderIcon
          }).bindPopup("Order to deliver");
        }
      },
      addWaypoints: false
    }).addTo(map.leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);