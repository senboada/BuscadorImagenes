import React, { Component } from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';
import './App.css'
class App extends Component {

  state = {
    termino : '',
    imagenes : [],
    pagina : '',
    cargando : false,
    totalPaginas : 0,
    vistaTotalImagenes : 30
  }

  datosBusqueda = (termino) => {
    this.setState({
      termino,
      pagina : 1
    },() => {
      this.consultarApi();
    });
  }

  paginaAnterior = () => {
    let pagina = this.state.pagina;
    if(pagina === 1) return null; //Si es la pagina 1, ya no se puede retroceder
    pagina--;
    this.setState({
      pagina
    },() =>{
      this.consultarApi();
      this.scroll();
    })
  }

  paginaSiguiente = () => {
    let {totalPaginas,pagina} = this.state;
    if(pagina === totalPaginas) return null;
    pagina++;
    this.setState({
      pagina
    },() =>{
      this.consultarApi();
      this.scroll();
    })
  }

  consultarApi = async () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=13119377-fc7e10c6305a7de49da6ecb25&q=${termino}&per_page=${this.state.vistaTotalImagenes}&page=${pagina}`;
    await fetch(url)
      .then(respuesta => {
        this.setState({
          cargando : true
        })
        return respuesta.json();
      })
      .then(respuesta => {
        const totalPaginacion = Math.ceil(respuesta.totalHits / this.state.vistaTotalImagenes);
        this.setState({
          imagenes : respuesta.hits,
          cargando : false,
          totalPaginas : totalPaginacion
        })
      })
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('auto','start');
  }

  render() {
    const cargando = this.state.cargando;
    let resultado;
    if(cargando){
      resultado = <div className="sk-folding-cube">
                    <div className="sk-cube1 sk-cube"></div>
                    <div className="sk-cube2 sk-cube"></div>
                    <div className="sk-cube4 sk-cube"></div>
                    <div className="sk-cube3 sk-cube"></div>
                  </div>
    }else{
      resultado = <Resultado 
                    imagenes={this.state.imagenes} 
                    paginaAnterior={this.paginaAnterior} 
                    paginaSiguiente={this.paginaSiguiente} 
                    pagina={this.state.pagina}
                    totalPaginas={this.state.totalPaginas}
                  />
    }
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imagenes</p>
          < Buscador busqueda={this.datosBusqueda} />
        </div>
        <div className="row justify-content-center">
          {resultado }
        </div>
      </div>
    );
  }
}

export default App;