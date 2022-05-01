import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import http from '../../../http';
import IRestaurante from '../../../interfaces/IRestaurante';

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useLayoutEffect(() => {
    http
      .get('restaurantes/')
      .then(res => setRestaurantes(res.data))

  }, []);

  const excluir = (restauranteAhSerExcluido: IRestaurante) => {
    http
      .delete(`restaurantes/${restauranteAhSerExcluido.id}/`)
      .then(() => {
        const listaRestaurantes = restaurantes.filter(restaurante => restaurante.id !== restauranteAhSerExcluido.id);
        setRestaurantes([...listaRestaurantes])
        alert('Deletado')
      })
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
            </TableCell>
            <TableCell>
              Editar
            </TableCell> 
            <TableCell>
              Excluir
            </TableCell>                        
          </TableRow>
        </TableHead>
        <TableBody>
          {
            restaurantes.map(restaurante => (
              <TableRow key={restaurante.id}>
                <TableCell>
                  {restaurante.nome}
                </TableCell>
                <TableCell>
                  [ <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link> ]
                </TableCell>
                <TableCell>
                  <Button
                    variant='outlined'
                    color='error'
                    onClick={() => excluir(restaurante)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>  
            ))
          }        
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdministracaoRestaurantes