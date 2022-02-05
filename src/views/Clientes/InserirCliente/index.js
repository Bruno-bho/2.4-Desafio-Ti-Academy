import axios from "axios";
import { useState } from "react/cjs/react.development";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const InserirCliente = () => {

    const [cliente, setCliente] = useState({
        nome: '',
        endereco: '',
        cidade: '',
        uf: '',
        nascimento: '',
        clienteDesde: ''
    });

    const valorInput = e => setCliente({
        ...cliente,
        [e.target.name]: e.target.value
    })

    const cadCliente = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api + "/clientes", cliente, { headers })
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
                    <h1>Cadastrar Cliente</h1>
                </div>
                <Form className="p-2" onSubmit={cadCliente}>
                    <FormGroup className="p-2">
                        <Label>Nome</Label>
                        <Input type="text" name="nome"
                            placeholder="nome do cliente"
                            onChange={valorInput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Endereço</Label>
                        <Input type="text" name="endereco" placeholder="endereço"
                            onChange={valorInput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Cidade</Label>
                        <Input type="text" name="cidade" placeholder="cidade"
                            onChange={valorInput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>UF</Label>
                        <Input type="text" name="uf" placeholder="uf"
                            onChange={valorInput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Nascimento</Label>
                        <Input type="text" name="nascimento" placeholder="data de nascimento"
                            onChange={valorInput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Cliente Desde:</Label>
                        <Input type="text" name="clienteDesde" placeholder="data do início do cliente"
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