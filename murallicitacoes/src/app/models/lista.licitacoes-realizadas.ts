import { Propostas } from "./propostas.model";

export class ListaLicitacoesRealizadas {
  
  situacao: string;
  jurisdicionado: string;
  numero: string;
  modalidade: string;
  valorHomologado: number;
  dataHomologacao: string;
  linkProtocoloTCE: string;
  protocoloTCE: string;
  objeto: string;

  propostas: Array<Propostas>
  constructor() {}
}
