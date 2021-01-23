import React, { useEffect, useState } from 'react';
import { observer, inject } from 'mobx-react'
import '../styles/map.css';
import LeafletMap from './MapComponents/LeafletMap'
import Clock from './Clock'

function MapContainer(props) {

    const [nextOrder, setNextOrder] = useState({})

    setInterval(() => {
        props.ordersStore.updateLocation()
    }, 10000);

    const replaceOrder =async () =>{
        const order =  await props.ordersStore.getNextOrder()
        setNextOrder(order)
    }
    useEffect(() => {
        props.ordersStore.updateLocation()
        props.ordersStore.getOrders()
        replaceOrder()
    }, [])


    return (
        <div>
            {props.ordersStore.locations.length > 0 ?
                <div className='mapContainer'>

                    <div className='mappp'>
                        <div id="mapid">
                            <LeafletMap locations={props.ordersStore.locations} />
                        </div>
                    </div>

                    <div className='onMap'>

                        <div id="nearOrders">
                            <div className='near'>
                                <div>
                                    <div className='ordersLeft'>ORDERS LEFT</div>
                                    <div className='orderNumLeft'>{props.ordersStore.totalNotReceivedYet}</div>
                                </div>
                                <div>
                                    <div className='recOrder'> ORDERS HAS BEEN RECEIVED </div>
                                    <div className='orderNum'>{props.ordersStore.totalReceived}</div>
                                </div>
                            </div>
                            <div className='approved'>Has Approved
                            <Clock />
                            </div>

                        </div>
        
                        <div id="expectedTime">
                            <div className='expected'>
                                <div className='expTime'>Expected Time: {props.ordersStore.distance} ,Total Time Workday : {props.ordersStore.time}</div>
                                <div className='orderNumber'>Order Number: {nextOrder && nextOrder._id}</div>
                                <div className='nextCustomer'>Next Customer: {nextOrder && nextOrder.name}</div>

                            </div>
                        </div>

                    </div>

                </div> : null}
        </div>

    )

}

export default inject("ordersStore")(observer(MapContainer))