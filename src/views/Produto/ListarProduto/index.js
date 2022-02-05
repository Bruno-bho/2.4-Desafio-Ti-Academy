import axios from "axios";
import { useEffect, useState } from "react";
import { Alert,Container, Table } from "reactstrap";
import { Link } from 'react-router-dom';
import { api } from "../../../config";

export const ListarProduto = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getProduto = async () => {
        await axios.get(api + "/listaprodutos")
            .then((response) => {
                console.log(response.data.produtos);
                setData(response.data.produtos);
            }).catch(() => {
                console.log("Erro: sem conexão com a API.")
            });
    };

    const apagarProduto = async (idProduto) => {
        console.log(idProduto);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.get(api + "/excluirproduto/" + idProduto, 
        { headers })
            .then((response) => {
                console.log(response.data.error);
                getProduto();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível conetar-se a API.'
                });
            });
    }

    useEffect(() => {
        getProduto();
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
                        <h1>Visualizar Produtos</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/inserir-produto" className="btn btn-outline-success btn-sm">Cadastrar</Link>
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
                        {data.map(prod => (
                            <tr key={prod.id}>
                                <th scope="row">{prod.id}</th>
                                <td>{prod.nome}</td>
                                <td>{prod.descricao}</td>
                                <td className="text-center">
                                    <Link to={"/atualizaproduto/" + prod.id}
                                        className="btn btn-outline-primary btn-sm">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                        onClick={() => apagarProduto(prod.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}