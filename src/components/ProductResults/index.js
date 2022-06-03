import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom'
import { fetchProductsStart } from "../../redux/Products/products.actions";
import Select from "../Forms/Select";
import Product from "./Product";
import './styles.scss';

const mapState = ({ productData }) => ({
    products: productData.products
})
const ProductResults = ({ }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products } = useSelector(mapState);
    const { filterType } = useParams();

    useEffect(() => {
        dispatch(fetchProductsStart({ filterType }))
    }, [filterType]);

    const handleFilter = (e) => {
        const newFilter = e.target.value;
        navigate(`/search/${newFilter}`);
    };

    if (!Array.isArray(products)) return null;

    if (products.length < 1){
        return (
            <div className="products">
                <p>No Results Found</p>
            </div>
        );
    }

    const configFilter = {
        defaultValue: filterType,
        options:[{
            name: 'Show All',
            value:''
        },{
            name: "Food",
            value: 'food'
        },{
            name: "Merch",
            value: "merch"
        }],
        handleChange: handleFilter
    }

    return (
        <div className="products">

            <h1>Browse Products</h1>
            <Select {...configFilter} />
            <div className="productResults">
                {products.map((product, position)=>{
                    const { productThumbnail, productName, productPrice} = product;
                    if (!productThumbnail || !productName || typeof productPrice === 'undefined') return null;
                    const configProduct = {
                        productThumbnail,
                        productName,
                        productPrice
                    }

                    return (
                        <Product {...configProduct}/>
                    )
                })}
            </div>
        </div>
    )
}

export default ProductResults;