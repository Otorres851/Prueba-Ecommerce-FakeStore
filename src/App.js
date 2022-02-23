import './App.css';
import Navbar from './Components/Navbar';
import Products from './Components/Products';
import {Switch, Route} from 'react-router-dom';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';



function App() {
  return (
    <>
    <Navbar />
      <Switch>
        <Route exact path="/" component={Products} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
      </Switch>
    </>
  );
}

export default App;
