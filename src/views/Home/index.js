import { Link } from "react-router-dom"
import { Container } from "reactstrap"

export const Home = () => {
    return(
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Home</h1>
                    </div>
                    <div className="p-2">
                        <a href="/listar-cliente" 
                            className="m-auto btn btn-outline-success btn-sm">Clientes</a>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-pedido" 
                            className="m-auto btn btn-outline-success btn-sm">Pedidos</Link>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-servico" 
                            className="m-auto btn btn-outline-success btn-sm">Serviços</Link>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-compra" 
                            className="m-auto btn btn-outline-success btn-sm">Compras</Link>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-produto" 
                            className="m-auto btn btn-outline-success btn-sm">Produtos</Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}