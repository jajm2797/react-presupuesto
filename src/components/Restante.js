import React, { Component } from 'react';
import {revisarPresupuesto} from '../helper'

class Restante extends Component{
    render(){

        const {presupuesto, restante} = this.props

        return(
            <div className={revisarPresupuesto(presupuesto,restante)}>
                Restante: ${ this.props.restante}
            </div>
        )
    }
}

export default Restante