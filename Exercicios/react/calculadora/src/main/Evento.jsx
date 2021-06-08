import React, { Component } from 'react';
import './Evento.css';
import Button from 'react-bootstrap/Button';

export default class Evento extends Component {

    state = {
        qtde: this.props.qtde,
        nomeEvento: this.props.nomeEvento,
        showEditor: true,
        showSorteio: false
    }

    constructor(props) {
        super(props)
        this.setQtde = this.setQtde.bind(this);
        this.state = {showEditor: true};
        this.handleEditorClick = this.handleEditorClick.bind(this);
        this.handleSorteioClick = this.handleSorteioClick.bind(this);  
        this.handleReiniciarClick = this.handleReiniciarClick.bind(this);  
      }

    setQtde(e) {
        this.setState({ qtde: e.target.value })
    }

    setNomeEvento(e) {
        this.setState({ nomeEvento: e.target.value })
    }

    handleEditorClick() {
        this.setState({showEditor: false});
      }

    handleSorteioClick() {
      this.setState({showSorteio: true});
    }

    handleReiniciarClick() {
      this.setState({showEditor: true});
      this.setState({showSorteio: false});
      this.setState({nomeEvento: ''});
      this.setState({qtde: ''});      
    }


    render() {

        const { qtde, nomeEvento } = this.state       
        const showEditor = this.state.showEditor;
        const showSorteio = this.state.showSorteio;

        let inputNome;
        let inputQuantidade;
        let BtnProximo;
        let BtnSortear;
        let BtnReiniciar;
        var maxNumber = qtde;
        let randomNumber;

        if (showEditor) {
            inputNome = <input type="text"  placeholder="Nome do Evento..." 
              value={nomeEvento} onChange={e => this.setNomeEvento(e)} />
        }  
          
        if (showEditor) { 
            inputQuantidade = <input type="text" placeholder="Quantidade..."
              value={qtde} onChange={this.setQtde} ></input >;
        }
      
        if (showEditor) { 
          BtnProximo =  <><Button variant="primary" onClick={this.handleEditorClick}>Próximo</Button>{' '}</>
        }

        if (!showEditor) { 
            BtnSortear = <button onClick={this.handleSorteioClick}>  Sortear </button>
        }
         
        if (showSorteio) { 
          randomNumber = Math.floor((Math.random() * maxNumber) + 1);
        }

        if (!showEditor) { 
          BtnReiniciar = <button onClick={this.handleReiniciarClick}> Reiniciar </button>
        }

        return (
            <div>
                <h1>{nomeEvento}</h1>
                <hr />               
                <h2>{randomNumber}</h2>

                {inputNome} 
                {inputQuantidade} 
                {BtnProximo} 
                {BtnSortear} 
                {BtnReiniciar}               

            </div>
        )
    }
}

