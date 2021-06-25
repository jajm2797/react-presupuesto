import React, { Component } from 'react';
import Presupuest from './Presupuesto';
import Restante from './Restante';


class ControlPresupuesto extends Component{
    render(){
        return(
            <React.Fragment>
                <Presupuest
                    presupuesto = {this.props.presupuesto}
                />
                <Restante
                    presupuesto = {this.props.presupuesto}
                    restante = {this.props.restante}
                />
            </React.Fragment>
        )
    }
}

export default ControlPresupuesto