import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { ListarCliente } from './views/Clientes/ListarCliente';
import { PedidosCliente } from './views/Clientes/PedidosCliente';
import { Menu } from './components/Menu';
import { Home } from './views/Home';
import { InserirCliente } from './views/Clientes/InserirCliente';
import { EditarCliente } from './views/Clientes/EditarCliente';
import { InserirServico } from './views/Servicos/InserirServico';
import { ListarServico } from './views/Servicos/ListarServico';
import { EditarServico } from './views/Servicos/EditarServico';
import { InserirPedido } from './views/Pedido/InserirPedido';
import { EditarPedido } from './views/Pedido/EditarPedido';
import { ListarPedido } from './views/Pedido/ListarPedido';
import { InserirCompra } from './views/Compra/InserirCompra';
import { EditarCompra } from './views/Compra/EditarCompra';
import { ListarCompra } from './views/Compra/ListarCompra';
import { InserirProduto } from './views/Produto/InserirProduto';
import { EditarProduto } from './views/Produto/EditarProduto';
import { ListarProduto } from './views/Produto/ListarProduto';




function App() {
  return (
    <div>
      <Menu/>            
      <Router>
        <Switch>
          <Route exact path = "/" component={Home}/>
          <Route path = "/listar-cliente" component = {ListarCliente}/>          
          <Route path = "/pedidos-cliente/:id" component = {PedidosCliente}/>
          <Route path = "/inserir-cliente" component = {InserirCliente}/>
          <Route path = "/editar-pedido/:id" component = {EditarCliente}/>
          <Route path = "/inserir-servico" component = {InserirServico}/>
          <Route path = "/listar-servico" component = {ListarServico}/>
          <Route path = "/editar-servico" component = {EditarServico}/>
          <Route path = "/inserir-pedido" component = {InserirPedido}/>
          <Route path = "/editar-pedido" component = {EditarPedido}/>
          <Route path = "/listar-pedido" component = {ListarPedido}/>
          <Route path = "/inserir-compra" component = {InserirCompra}/>
          <Route path = "/editar-compra" component = {EditarCompra}/>
          <Route path = "/listar-compra" component = {ListarCompra}/>
          <Route path = "/inserir-produto" component = {InserirProduto}/>
          <Route path = "/editar-produto" component = {EditarProduto}/>
          <Route path = "/listar-produto" component = {ListarProduto}/>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
