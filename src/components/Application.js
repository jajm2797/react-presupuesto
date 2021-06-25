import React, { Component } from 'react';
import '../css/skeleton.css'
import '../css/normalize.css'
import Header from './Header';
import {store} from 'react-notifications-component';
import {FormularioGasto,Listado} from './Formulario';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import {validatePresupuesto, revisarPresupuesto} from '../helper';
import ControlPresupuesto from './ControlPresupuesto';


class Application extends Component {


    state = {
        presupuesto:'',
        restante:'',
        gastos:{}
    }

    componentDidMount(){
        this.getPresupuesto();
    }

    getPresupuesto = () =>{
        let presupuesto = prompt('¿Cuál es tu presupuesto?');

        let resultado = (validatePresupuesto(presupuesto));

        if(resultado){
            let name = prompt('¿Cuál es tu nombre?');

            store.addNotification({
                title: `Estimado ${name}`,
                message: `Su presupuesto inicial son $${resultado} USD`,
                type: "success",
                insert: "bottom",
                container: "bottom-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 4000,
                  pauseOnHover: true,
                  onScreen: true
                }
              });
              this.setState({
                  presupuesto: resultado,
                  restante: resultado
              })
        } else {
            this.getPresupuesto();
        }
        
    }

    //Agregar un nuevo gasto al state
    addGasto = gasto =>{
        //Tomar una copia del state actual
        const gastos = {...this.state.gastos};
        const date = new Date(Date.now());
        //Agregar el gasto al objeto del state
        gastos[`Gasto-${date.toISOString("YYYY-mm-DD")}`] = gasto

        this.restarPresupuesto(gasto.cantidadGasto)

        this.setState({
            gastos
        })

        //ponerlo en state
    }

    //Restar del Presupuesto cuando gasto se crea

    restarPresupuesto = cantidad => {
        //leyendo el gasto
        let resultado = Number(cantidad)

        let restante = this.state.restante;

        restante -= resultado

        this.setState({
            restante
        })
    }

    render(){
        return(
            <>
            <ReactNotification />
            
            <div className="App container">
                <Header
                    title = "Gastos Semanales"
                />
                <div className="contenido-principal contenido">
                    <div className="row">
                        <div className="one-half column">
                            <FormularioGasto
                                addGasto = {this.addGasto}
                            />
                        </div>
                        <div className="one-half column">
                            <Listado
                                gastos = {this.state.gastos}
                            />
                            <ControlPresupuesto
                                presupuesto = {this.state.presupuesto}
                                restante = {this.state.restante}
                            />
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default Application