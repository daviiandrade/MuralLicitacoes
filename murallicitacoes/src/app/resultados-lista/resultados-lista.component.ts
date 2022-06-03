import { style } from '@angular/animations';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Message, MessageService } from 'primeng/api';
import { ListaLicitacoesRealizadas } from '../models/lista.licitacoes-realizadas';
import { RealizadasComponent } from '../realizadas/realizadas.component';
import { RealizadasService } from '../services/realizadas.service';

@Component({
  selector: 'app-resultados-lista',
  templateUrl: './resultados-lista.component.html',
  styleUrls: ['./resultados-lista.component.css'],

})

export class ResultadosListaComponent implements OnInit {
  
  @Input()
  public realizada: any;
  public proposta: any;

  filterNomeProponente: any;
  filterIdentificacaoProponente: any;
  filterSituacaoPropostas: any;
  filterValorProposta: any;

  listaProp: any;
  aviso: string;
  messageError: Message[];
  isVisible: boolean;
  cols: { field: string; header: string; }[];

  realizadas: ListaLicitacoesRealizadas[];

  constructor(private messageService: MessageService,
  private realizadasService: RealizadasService) { }

  exportColumns: any[];

  ngOnInit(): void {

    this.cols = [
      { field: 'realizada.situacao', header: 'Diligência Nº ' },
      { field: 'nomesParticipantes', header: 'Participantes' },
      { field: 'nomesJurisdicionados', header: 'Jurisdicionados' },
      { field: 'dataInicio', header: 'Início' },
      { field: 'dataRetorno', header: 'Retorno' },
      { field: 'setorSolicitante.nome', header: 'Setor' },
      { field: 'situacao.descricao', header: 'Situação' },
    ];

    }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.cols);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "LicitaçõesRealizadas_");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + 'export' + new Date().getTime() + EXCEL_EXTENSION);
  }

  substituiCaractereUnicode(s: string) {
    let retorno = s.replace('', '-')
    return retorno
  }

  totalRegistrosEncontrados() {
    if (this.realizada) {
      return this.realizada.length;
    }
  }

  activeState: boolean[] = [false];

  toggle(index: number) {
      this.activeState[index] = !this.activeState[index];

  }

  getFormattedPrice(price: number) {
    if(!isNaN(price)) {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
    }

    return price;
  }
}

function elt(elt: any, arg1: { sheet: string; }) {
  throw new Error('Function not implemented.');
}
