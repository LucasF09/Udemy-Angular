import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Frase } from '../shared/frase.model'
import { FRASES } from   './frases-mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {


  public frases: Frase[] = FRASES
  public instrucao: string = 'Traduza a frase:'
  public resposta: string = ''

  public rodada: number = 0
  public rodadaFrase: Frase

  public progresso: number = 0

  public tentativas: number = 3

  //crie um atributo publico chamado encerrar jogo do compomente painel, associe esse atributo da instancia e ao termino de tudo isso decore isso exponha isso pro comonente pai
  @Output () public encerrarJogo: EventEmitter <string>= new EventEmitter()

  constructor() { 
    this.atualizaRodada()
  }

  ngOnInit() {
  }

  ngOnDestroy(){

  }
  
  public atualizaResposta (resposta: Event):void{
    this.resposta=(<HTMLInputElement>resposta.target).value
    // console.log(this.resposta)
  }

  public verificaResposta(): void{

    if(this.rodadaFrase.frasePtBr == this.resposta){

      //trocar pergunta da rodada se caso acertar
      this.rodada++

      // progresso
      this.progresso = this.progresso + ( 100/ this.frases.length )

      if (this.rodada === 4 ){
        this.encerrarJogo.emit('Vitoria')
      }

      //atualiza o objeto rodadaFrase
      this.atualizaRodada()
      console.log('Verificando a resposta:',this.rodadaFrase)

    }else{
      //diminuir a vida
      this.tentativas --

      if(this.tentativas === 0){
        alert('sua ultima tentativa')
      }
      if(this.tentativas === -1){
        this.encerrarJogo.emit('Derrota')
      }
    }

  }

  public atualizaRodada(): void {
    //define a frase da rodada
    this.rodadaFrase = this.frases[this.rodada]

    //limpa a resposta do text area
    this.resposta = ''
  }
}
