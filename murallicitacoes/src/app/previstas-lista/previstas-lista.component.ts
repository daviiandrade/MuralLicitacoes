import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import * as FileSaver from 'file-saver';
import { A11yModule } from '@angular/cdk/a11y';


@Component({
  selector: 'app-previstas-lista',
  templateUrl: './previstas-lista.component.html',
  styleUrls: ['./previstas-lista.component.css']
})
export class PrevistasListaComponent implements OnInit {

  public ente: string;
  public jurisdicionado: string;
  public modalidadeLicitacao: string;
  public obj: string;
  public cert: string;
  public infoc: [];
  public certames: [];
  public data1: string;
  public data2: string;

  @Input()
  public prevista: any;

  listaPrevistas: any;

  cols: any[];

  public tamanhoLista: number;


  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'nomesJurisdicionados', header: 'Jurisdicionados' },
      { field: 'numero', header: 'Diligência Nº ' },
      { field: 'modalidade', header:'valor'},
      { field: 'valor', header:'Modalidade'},
      { field: 'dataInicio', header: 'Início' },
      { field: 'dataRetorno', header: 'Retorno' },
      { field: 'setorSolicitante.nome', header: 'Setor' },
      { field: 'situacao.descricao', header: 'Situação' }
    ];
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.prevista);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "LicitaçõesPrevistas_");
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

  substituiCaractereUnicode(s: string){
    let retorno = s.replace('', '-')
    return retorno
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
  }

  navigateToPrevistas(): void {
    this.router.navigate(['/previstas'])
  }

  totalRegistrosEncontrados(){
   if(this.prevista){
     return this.prevista.length
   }
  }

  getFormattedPrice(price: number) {
    if(!isNaN(price)) {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
    }

    return price;
  }
}
