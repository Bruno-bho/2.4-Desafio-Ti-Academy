import axios from "axios";
import { useEffect, useState } from "react";
import { Alert,Container, Table } from "reactstrap";
import { Link } from 'react-router-dom';
import { api } from "../../../config";

export const ListarServico = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getServicos = async () => {
        await axios.get(api + "/listaservicos")
            .then((response) => {
                console.log(response.data.servicos);
                setData(response.data.servicos);
            }).catch(() => {
                console.log("Erro: sem conexão com a API.")
            });
    };

    const apagarServico = async (idServico) => {
        console.log(idServico);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.get(api + "/excluirservico/" + idServico, 
        { headers })
            .then((response) => {
                console.log(response.data.error);
                getServicos();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível conetar-se a API.'
                });
            });
    }

    useEffect(() => {
        getServicos();
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
                        <h1>Visualizar Serviços</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/inserir-servico" className="btn btn-outline-success btn-sm">Cadastrar</Link>
                    </div>
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(serv => (
                            <tr key={serv.id}>
                                <th scope="row">{serv.id}</th>
                                <td>{serv.nome}</td>
                                <td>{serv.descricao}</td>
                                <td className="text-center">
                                    <Link to={"/atualizaservico/" + serv.id}
                                        className="btn btn-outline-primary btn-sm">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                        onClick={() => apagarServico(serv.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}