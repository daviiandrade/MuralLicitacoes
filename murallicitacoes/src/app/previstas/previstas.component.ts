import { Juri } from './../models/jurisdicionado.model';
import { PrevistasService } from './../services/previstas.service';
import { Filtros } from './../models/filtros.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { FiltrosService } from '../services/filtros.service';
import { PrevistasListaFiltros } from '../models/previstas.lista.filtro';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-previstas',
  templateUrl: './previstas.component.html',
  styleUrls: ['./previstas.component.css'],
  providers: [MessageService]
})
export class PrevistasComponent implements OnInit {

  public ente: [number];
  public jurisdicionado: [string];
  public modalidadeLicitacao: [string];
  public obj: string;
  public cert: string;
  public infoc: [];
  public certames: [];

  public data1: Date;
  public data2: Date;
  //listaPrevistas: any;
  public objeto: string;

  modalidades: any;
  jurisdicionados: any;
  entes: any;
  dataLeft: Date;
  dataRight: Date;
  dias: number;
  desabilitaOpcaoJurisdicionados: boolean;
  messageError: Message[];
  listaPrevistas: any;
  aviso: string;
  postPerPage: number;
  pageNumber: number;

  jurisFiltrados:any;
  juriIndividual: Juri;

  isShowing: boolean = false;


  constructor(
    private router: Router,
    private filtrosService: FiltrosService,
    private previstasService: PrevistasService,
    private primengConfig: PrimeNGConfig
  ) {

  }
  ngOnInit(): void {
    this.getFiltros();
    this.primengConfig.ripple = true;
    this.desabilitaOpcaoJurisdicionados = true;
    this.jurisFiltrados = this.jurisdicionados;
  }

  limparCampos() {
    this.ente = null;
    this.jurisdicionado = null;
    this.modalidadeLicitacao = null;
    this.obj = null;
    this.data1 = null;
    this.data2 = null;
    this.infoc = null;
    this.listaPrevistas = null;

    this.jurisFiltrados = null
    this.desabilitaOpcaoJurisdicionados = true;

  }

  navigateToRealizadas(): void {
    this.router.navigate(['/realizadas'])
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

  pesquisarLicitacoesPrevistas() {
    this.isShowing = true;
    const filtros = new PrevistasListaFiltros();
    filtros.filterEnte = this.ente ? this.ente : null;
    filtros.filterJurisdicionado = this.jurisdicionado ? this.jurisdicionado : null;
    filtros.filterObjetoLicitacao = this.obj ? this.obj.toString() : null;
    filtros.filterModalidadeLicitacao = this.modalidadeLicitacao ? this.modalidadeLicitacao : null;
    filtros.filterDataLeft = this.data1 ? this.formataDataParametro(this.data1) : null;
    filtros.filterDataRight = this.data2 ? this.formataDataParametro(this.data2) : null;
    filtros.filterDias = this.dias ? this.dias : null;

    this.previstasService
      .getLicitacoesPrevistas(filtros)
      .toPromise()
      .then((response: any) => {
        this.isShowing = false;
        console.log(response)
        this.listaPrevistas = response.listaLicitacoesPendentes;
        this.aviso = response.aviso;
      })
      .catch((error) => {
        this.isShowing = false;
        this.messageError = [{
          severity: 'error', summary: 'Ocorreu um erro',
          detail: 'Desculpe, não foi possível consultar licitações previstas, tente novamente mais tarde!'
        }];
      });
  }

  formataDataParametro(dataParametro: Date){
    return dataParametro.getDate().toString().padStart(2,'0') +
    '-' + (dataParametro.getMonth()+1).toString().padStart(2, '0') +
    '-' + dataParametro.getFullYear()
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
