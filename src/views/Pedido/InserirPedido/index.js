import axios from "axios";
import { useState } from "react/cjs/react.development";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const InserirPedido = () => {

    const [pedido, setPedido] = useState({
        data: '',
        clienteId: ''
    });

    const valorInput = e => setPedido({
        ...pedido,
        [e.target.name]: e.target.value
    })

    const cadPedido = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api + "/cliente/pedido", pedido, { headers })
            .then((response) => {
                console.log(response.data.message);
            })
            .catch(() => {
                console.log("Erro: Sem conexão com a API.")
            });
    };

    return (
        <div>
            <Container>
                <div>
                    <h1>Cadastrar Pedido</h1>
                </div>
                <Form className="p-2" onSubmit={cadPedido}>
                    <FormGroup className="p-2">
                        <Label>Data:</Label>
                        <Input type="text" name="data"
                            placeholder="data"
                            onChange={valorInput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>ID do Cliente:</Label>
                        <Input type="text" name="clienteId" placeholder="ID do cliente"
                            onChange={valorInput} />
                    </FormGroup>
                    <div className="d-flex">
                        <div classname="m-auto p-2">
                            <Button type="submit" outline color="success">Cadastrar</Button>
                        </div>
                        <div classname="m-auto p-2">
                            <Button type="reset" outline color="success">Limpar</Button>
                        </div>
                    </div>

                </Form>

            </Container>

        </div>
    )
}