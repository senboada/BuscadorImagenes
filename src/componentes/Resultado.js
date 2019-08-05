import React, { Component } from 'react';
import Imagen from './Imagen';
import Navegacion from './Navegacion';

class Resultado extends Component {

    mostrarImagenes = () => {
        const imagenes = this.props.imagenes;
        if(imagenes.length === 0) return null;
        console.log(imagenes);
        return (
            <React.Fragment>
                <div  className="col-12 p-5 row">
                    {this.props.imagenes.map(imagen => (
                        <Imagen imagen={imagen} key={imagen.id}/>
                    ))}
                </div>
                <Navegacion 
                    paginaAnterior={this.props.paginaAnterior} 
                    paginaSiguiente={this.props.paginaSiguiente}
                    pagina={this.props.pagina}
                    totalPaginas={this.props.totalPaginas}
                />
            </React.Fragment>
        )
    }

    render() {
        return (
            <div>
                <React.Fragment>
                    {this.mostrarImagenes()}
                </React.Fragment>
            </div>
        );
    }
}

export default Resultado;