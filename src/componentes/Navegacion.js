import React, { Component } from 'react';

class Navegacion extends Component {

    mostrarAnterior = () => {
        const {pagina} = this.props;
        if(pagina === 1) return null;
        return (
            <button type="button" className="btn btn-info mr-1" onClick={this.props.paginaAnterior}>Anterior &larr;</button>
        )
    }
    
    mostrarSiguiente = () => {
        const {pagina,totalPaginas} = this.props;
        if(pagina === totalPaginas) return null;
        return (
            <button type="button" className="btn btn-info mr-1" onClick={this.props.paginaSiguiente} >Siguiente &rarr;</button>
        )
    }

    render() {
        
        return (
            <div className="py-5 text-center">
                { this.mostrarAnterior() }
                { this.mostrarSiguiente() }
            </div>
        );
    }
}

export default Navegacion;