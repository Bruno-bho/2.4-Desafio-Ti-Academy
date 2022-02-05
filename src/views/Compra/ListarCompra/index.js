import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Container, Table } from 'reactstrap';
import { api } from '../../../config';

export const ListarCompra = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getCompras = async () => {
        axios.get(api + "/clientes-compras")
            .then((response) => {
                console.log(response.data.cli);
                setData(response.data.cli);
            })
            .catch(() => {
                console.log("Erro: Sem conexão com a API.");
            });
    };

    const apagarCompra = async (idCompra) => {
        console.log(idCompra);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.get(api + "/excluircompra/" + idCompra, 
        { headers })
            .then((response) => {
                console.log(response.data.error);
                getCompras();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível conetar-se a API.'
                });
            });
    }


    useEffect(() => {
        getCompras();
    }, []);

    return (
        <div>
            <Container>
                <div className="p-2">
                    {status.type === 'error' ? 
                    <Alert color="danger">
                        {status.message}</Alert> : ""}
                </div>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar Compras</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/inserir-compra" className="btn btn-outline-success btn-sm">Cadastrar</Link>
                    </div>
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data</th>
                            <th>Cliente ID</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(comp => (
                            <tr key={comp.id}>
                                <th scope="row">{comp.id}</th>
                                <td>{comp.data}</td>
                                <td>{comp.clienteId}</td>
                                <td className="text-center">
                                    <Link to={"/compra-cliente/" + comp.id}
                                        className="btn btn-outline-primary btn-sm">Consultar</Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                        onClick={() => apagarCompra(comp.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}