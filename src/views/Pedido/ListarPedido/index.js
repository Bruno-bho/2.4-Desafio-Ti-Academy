import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Container, Table } from 'reactstrap';
import { api } from '../../../config';

export const ListarPedido = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getPedidos = async () => {
        axios.get(api + "/clientes-pedidos")
            .then((response) => {
                console.log(response.data.cli);
                setData(response.data.cli);
            })
            .catch(() => {
                console.log("Erro: Sem conexão com a API.");
            });
    };

    const apagarPedido = async (idPedido) => {
        console.log(idPedido);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.get(api + "/excluirpedido/" + idPedido, 
        { headers })
            .then((response) => {
                console.log(response.data.error);
                getPedidos();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível conetar-se a API.'
                });
            });
    }


    useEffect(() => {
        getPedidos();
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
                        <h1>Visualizar Pedidos</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/inserir-pedido" className="btn btn-outline-success btn-sm">Cadastrar</Link>
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
                        {data.map(ped => (
                            <tr key={ped.id}>
                                <th scope="row">{ped.id}</th>
                                <td>{ped.data}</td>
                                <td>{ped.clienteId}</td>
                                <td className="text-center">
                                    <Link to={"/pedidos-cliente/" + ped.id}
                                        className="btn btn-outline-primary btn-sm">Consultar</Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                        onClick={() => apagarPedido(ped.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}