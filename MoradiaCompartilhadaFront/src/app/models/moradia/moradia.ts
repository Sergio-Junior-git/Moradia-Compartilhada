export interface Foto {
  id: number;
  fileName: string; 
}

export interface Usuario {
  id: number;
  nome: string;
  email?: string;
  telefone?: string;
  sobrenome: string;
  genero: string;
  dataNascimento: string;
}

export interface Moradia {
  id: number;
  titulo: string;
  descricao: string;
  endereco: string;
  preco: number;
  quartos?: number;
  tipo?: string; 
  owner?: Usuario;
  fotos?: Foto[];
}