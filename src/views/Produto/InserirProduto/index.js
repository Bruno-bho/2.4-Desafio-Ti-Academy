import axios from "axios";
import { useState } from "react/cjs/react.development";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const InserirProduto = () => {

    const [produto, setProduto] = useState({
        nome: '',
        descricao: ''
    });

    const valorInput = e => setProduto({ ...produto, 
        [e.target.name]: e.target.value })

    const cadProduto = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api+"/listaprodutos", produto, { headers })
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
                    <h1>Cadastrar Produto</h1>
                </div>
                <Form className="p-2" onSubmit={cadProduto}>
                    <FormGroup className="p-2">
                        <Label>Nome</Label>
                        <Input type="text" name="nome" 
                        placeholder="nome do produto" 
                        onChange={valorInput}/>
                    </FormGroup>  
                    <FormGroup className="p-2">
                        <Label>Descrição</Label>
                        <Input type="text" name="descricao" placeholder="descrição" 
                        onChange={valorInput}/>
                    </FormGroup>                                      
                    <Button type="submit" outline color="success">
                        Cadastrar</Button>
                    <Button type="reset" outline color="success">Limpar</Button>
                </Form>

            </Container>

        </div>
    )
}