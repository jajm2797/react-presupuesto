import React, { Component } from 'react';
import {store} from 'react-notifications-component'
import '../css/skeleton.css';
import '../css/index.css';
import Gasto from './Gasto';


export class FormularioGasto extends Component {

    //Refs para Gastos
    nombreGasto = React.createRef();
    cantidad = React.createRef();

    createGasto = (e) => {
        e.preventDefault();
        //Creating OBJ
        const gasto = {
            nombreGasto : this.nombreGasto.current.value,
            cantidadGasto : this.cantidad.current.value
        }

        if(isNaN(gasto.cantidadGasto)){
            e.currentTarget.reset();
            store.addNotification({
                title: "Estimado usuario",
                message: "El Campo cantidad debe ser únicamente números.",
                type: "danger",
                insert: "bottom",
                container: "bottom-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 1000,
                  pauseOnHover: true,
                  onScreen: true
                }
              });
        } else {
            this.props.addGasto(gasto)
        }

        e.currentTarget.reset();
    }

    render(){
        return(
            <div>
                <form onSubmit={this.createGasto}>
                    <h2> Agrega tus Gastos aquí</h2>
                    <div className="campo">
                        <label>Nombre Gasto</label>
                        <input ref={this.nombreGasto} className="u-full-width" type="text" placeholder="Ej. Transporte" />
                    </div>

                    <div className="campo">
                        <label>Cantidad</label>
                        <input ref={this.cantidad} className="u-full-width" type="text" placeholder="Ej. 300" />
                    </div>

                    <input className="button-primary u-full-width" type="submit" value="Agregar" />
                </form>
            </div>
        )
    }
}


export class Listado extends Component {
    render(){
        return(
            <div className="gastos-realizados">
                <h2>Listado</h2>
                {Object.keys(this.props.gastos).map(key => (
                    <Gasto
                        key={key}
                        gasto = {this.props.gastos[key]}
                    />
                ))}
                
            </div>
        )
    }
}
