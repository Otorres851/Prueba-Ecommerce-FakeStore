import React, {useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';
import Skeleton from 'react-loading-skeleton';


const Products = () => {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState (false);
    let componentMounted = true;

    const dispatch = useDispatch();
    const addProduct = (product) => {
        dispatch(addCart (product));
    }


    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch("https://fakestoreapi.com/products");

            if(componentMounted){
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
                console.log(filter);
            }

            return () => {
                componentMounted = false;
            }
        } 

        getProducts();

    }, []);

    const Loading = () => {
        return (
            <>
                <div className="containerInput d-flex justify-content-center mb-5">
                    <Skeleton height={40} width={550} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={480} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={480} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={480} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={480} />
                </div>
            </> 
        );    
    };

    const SearchProducts = () => {

        const [search, setSearch] = useState('');

        const handleChange = (e)=> {
            setSearch(e.target.value);
        }

       
        const dataSearch = filter.filter(product => {  
            return product.title.toLowerCase().includes(search.toString().toLowerCase())     
        })
        
        return(
            <>
                <form className="containerInput d-flex justify-content-center mb-5" >
                    <input type="text" 
                        className="form-control"
                        placeholder=" Search to Product"
                        required
                        value={search}
                        onChange={handleChange}
                    /> 
                </form>


                
                {dataSearch.map(product => {
                    return(
                        <div className="col-md-3 mb-4" key={product.id}>
                            <div className="card h-100 text-center p-4">
                                <img src ={product.image} className="card-img-top" alt={product.title} height="250px" />
                                <div className="card-body">
                                    <h5 className="card-title mb-0">{product.title.substring(0,12)}...</h5>
                                    <p className="card-text lead fw-bold">
                                        ${product.price}
                                    </p>
                                    <h6 className="card-description"><em></em>{product.description.substring(0,50)}...</h6>
                                    <button className="btn btn-outline-dark" onClick={()=> addProduct(product)}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </>
           
        );
       
    };

        return (
            <div>
                <div className="container my-5">
                    <div className="row">
                        <div className="col-12 mb-5">
                            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
                            <hr />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {loading ? <Loading /> : <SearchProducts />}
                    </div>
                </div>
            </div>
        );             
}

export default Products;