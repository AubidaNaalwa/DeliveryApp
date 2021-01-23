import React, { useEffect, useState } from 'react';
import { observer, inject } from 'mobx-react'


function MapI() {
    const position = [0, 0]
    return (
<div>Map</div>
    )

}

export default inject("ordersStore")(observer(MapI))