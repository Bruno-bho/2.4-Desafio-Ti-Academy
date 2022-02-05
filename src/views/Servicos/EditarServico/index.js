import axios from "axios";
import { useEffect, useState } from "react"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarServico = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtServico = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/atualizaservico/"+id,
            { id, nome, descricao }, { headers })
            .then((response) => {
                console.log(response.data.error);
                console.log(response.data.message);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível conectar a API.'
                });
            });
    }

    useEffect(() => {
        const getServico = async () => {
            await axios.get(api + "/atualizaservico/" + id)
                .then((response) => {
                    setId(response.data.pedido.id)
                    setNome(response.data.servico.nome)
                    setDescricao(response.data.servico.descricao);
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API.")
                })
        }
        getServico();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <h1>Editar Serviço</h1>
                </div>
                <hr className="m-1" />
                {status.type === 'error' ? <Alert color="danger">
                    {status.message}</Alert> : " "}
                {status.type === 'success' ? <Alert color="success">
                    {status.message}</Alert> : " "}

                <Form className="p-2" onSubmit={edtServico}>
                    <FormGroup className="p-2">
                        <Label>ID Servico</Label>
                        <Input type="text" name="id"
                            placeholder="id do pedido" 
                            defaultValue={id}/>
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Nome</Label>
                        <Input type="text" name="nome"
                            placeholder="nome" value={nome}
                            onChange={e => setNome(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Descrição</Label>
                        <Input type="text" name="descricao"
                            placeholder="descricao" value={descricao}
                            onChange={e => setDescricao(e.target.value)} />
                    </FormGroup>

                    <Button type="submit" outline color="warning">Salvar</Button>
                    <Button type="reset" outline color="success">Limpar</Button>
                </Form>
            </Container>

        </div>
    )
}    