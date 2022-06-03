import { Juri } from './../models/jurisdicionado.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';

import { RealizadasListaFiltros } from '../models/realizadas.lista.filtro';
import { Filtros } from './../models/filtros.model';
import { FiltrosService } from './../services/filtros.service';
import { RealizadasService } from './../services/realizadas.service';
import * as FileSaver from 'file-saver';
import { PrimeNGConfig } from 'primeng/api';
import { ProgressBar } from 'primeng/progressbar';

@Component({
  selector: 'app-realizadas',
  templateUrl: './realizadas.component.html',
  styleUrls: ['./realizadas.component.css'],
  providers: [MessageService]
})

export class RealizadasComponent implements OnInit {

  public ente:[number];
  public jurisdicionado: [string];
  public modalidadeLicitacao: [number];
  public objeto: string;
  public propostas: string;

  public obj: string;
  public nomeProponente: string;
  public identificacaoProponente:string;
  public infoc: [];

  public data1: string;
  public data2: string;

  modalidades: any;
  jurisdicionados: any;
  entes: any;
  dataLeft: Date;
  dataRight: Date;
  dias: number;
  desabilitaOpcaoJurisdicionados: boolean;
  messageError: Message[];
  listaRealizadas: any;
  aviso: string;
  postPerPage: number;
  pageNumber: number;
  filterValorHomologadoLeft: any;
  filterValorHomologadoRight: any;
  filterIdentificacaoProponente: any;
  filterNomeProponente: any;

  jurisFiltrados:any;
  juriIndividual: Juri;

  isShowing: boolean = false;

  constructor(
    private router: Router,
    private filtrosService: FiltrosService,
    private realizadasService: RealizadasService,
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit(): void {
    this.getFiltros();
    this.desabilitaOpcaoJurisdicionados = true;
    this.jurisFiltrados = this.jurisdicionados;
    this.primengConfig.ripple = true;
  }

  limparCampos() {
    this.ente = null;
    this.jurisdicionado = null;
    this.modalidadeLicitacao = null;
    this.obj = null;
    this.data1 = null;
    this.data2 = null;
    this.infoc = null;
    this.nomeProponente = null;
    this.identificacaoProponente = null;
    this.listaRealizadas = null;

    this.jurisFiltrados = null;
    this.desabilitaOpcaoJurisdicionados = true;

  }

  navigateToPrevistas(): void {
    this.router.navigate(['/previstas'])
  }

  getFiltros(): void {
    this.filtrosService
      .getFiltros()
      .toPromise()
      .then((filtros: Filtros) => {
        this.entes = filtros.listaFiltroEnte;
        this.jurisdicionados = filtros.listaFiltroJurisdicionado;
        this.modalidades = filtros.listaFiltroModalidadeLicitacao;
            })
      .catch((error) => {
        this.messageError = [{
          severity: 'error', summary: 'Ocorreu um erro',
          detail: 'Desculpe, não foi possível consultar nesse momento, tente novamente mais tarde!'
        }];
      });
  }

  exibirOpcoesJurisdicionados(valueEnte): void {
    if (valueEnte === null || valueEnte === undefined || valueEnte.lenght < 1) {
      this.desabilitaOpcaoJurisdicionados = true;
      this.jurisdicionado = null;
    } else {
      this.desabilitaOpcaoJurisdicionados = false;
      this.preencheJurisFiltrados(valueEnte);
    }
  }

  pesquisarLicitacoesRealizadas() {
    this.isShowing = true;
    const filtros = new RealizadasListaFiltros();
    filtros.filterEnte = this.ente ? this.ente : null;
    filtros.filterJurisdicionado = this.jurisdicionado ? this.jurisdicionado : null;
    filtros.filterObjetoLicitacao = this.objeto ? this.objeto.toString() : null;
    filtros.filterModalidadeLicitacao = this.modalidadeLicitacao ? this.modalidadeLicitacao : null;
    filtros.filterDataLeft = this.dataLeft ? this.dataLeft : null;
    filtros.filterDataRight = this.dataRight ? this.dataRight : null;
    filtros.filterDias = this.dias ? this.dias : null;
    filtros.filterValorHomologadoLeft = this.filterValorHomologadoLeft ? this.filterValorHomologadoLeft : null;
    filtros.filterValorHomologadoRight = this.filterValorHomologadoRight ? this.filterValorHomologadoRight : null;
    filtros.filterIdentificacaoProponente = this.identificacaoProponente ? this.identificacaoProponente.toString() : null;
    filtros.filterNomeProponente = this.nomeProponente ? this.nomeProponente.toString() : null;

    this.realizadasService
      .getLicitacoesRealizadas(filtros)
      .toPromise()
      .then((response: any) => {
        this.isShowing = false;
        this.listaRealizadas = response.listaLicitacoesRealizadas;
        this.aviso = response.aviso;
      })
      .catch((error) => {
        this.isShowing = false;
        this.messageError = [{
          severity: 'error', summary: 'Ocorreu um erro',
          detail: 'Desculpe, não foi possível consultar licitações realizadas, tente novamente mais tarde!'
        }];
      });
  }
  preencheJurisFiltrados(valueEnte): void{
    this.jurisFiltrados = null
    var auxiliar = []

    for(var i = 0; i < this.jurisdicionados.length; i++){
      this.juriIndividual = new Juri(
        parseInt(this.jurisdicionados[i].id),
        this.jurisdicionados[i].nome,
        parseInt(this.jurisdicionados[i].id_ente)
        );

      if(valueEnte){
        if(valueEnte.includes(this.jurisdicionados[i].id_ente)){
          let juriaux = this.jurisdicionados[i];
          auxiliar.push(this.juriIndividual);
        }
       } else {
         auxiliar.push(this.juriIndividual);
       }

       this.jurisFiltrados = auxiliar;
      }
  }

}
