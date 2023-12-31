import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
const ProductList = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, [])
    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        setProducts(result);
    }
    // console.warn("products",products);
    const deleteProduct = async (id) => {
        // console.warn(id);
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete"
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    };
    const searchHandle=async(event)=>{
        // console.log(event.target.value);
        let key=event.target.value;
        if(key){
            let result=await fetch(`http://localhost:5000/search/${key}`);
            result =await result.json();
            if(result){
                setProducts(result)
            }
        }
        else{
            getProducts();
        }
    }
    return (
        <div className="product-list">
            {/* <h2 style={margin:5px}>Product List</h2> */}
            <h2 className="fixed" style={{ margin: '15px' }}>Product List</h2>
            <input className="fixed"  onChange={searchHandle} type="text" placeholder="Search product" />

            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>

            </ul>
            {
               products.length>0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li><button onClick={() => deleteProduct(item._id)} >delete</button>
                            <Link className="update" to={'/update/' + item._id}>Update</Link>
                        </li>

                    </ul>
                )
                :<h1>No result found</h1>
            }
            <div className="op">

            </div>
        </div>
    )
}
export default ProductList;