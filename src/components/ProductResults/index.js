import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom'
import { fetchProductsStart } from "../../redux/Products/products.actions";
import Select from "../Forms/Select";
import Product from "./Product";
import LoadMore from "../LoadMore";
import './styles.scss';

const mapState = ({ productData }) => ({
    products: productData.products
})
const ProductResults = ({ }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products } = useSelector(mapState);
    const { filterType } = useParams();

    const { data, queryDoc, isLastPage } = products;

    useEffect(() => {
        dispatch(fetchProductsStart({ filterType }))
    }, [filterType]);

    const handleFilter = (e) => {
        const newFilter = e.target.value;
        navigate(`/search/${newFilter}`);
    };

    if (!Array.isArray(data)) return null;

    if (data.length < 1){
        return (
            <div className="products">
                <p>No Results Found</p>
            </div>
        );
    }

    const handleLoadMore = () => {
        dispatch(fetchProductsStart({ 
            filterType, 
            startAfterDoc: queryDoc, 
            persistProducts: data 
        }))
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

    const configLoadMore = {
        onLoadMoreEvent: handleLoadMore,
    };

    return (
        <div className="products">

            <h1>Browse Products</h1>
            <Select {...configFilter} />
            <div className="productResults">
                {data.map((product, position)=>{
                    const { productThumbnail, productName, productPrice} = product;
                    
                    if (!productThumbnail || !productName || typeof productPrice === 'undefined') return null;
                    
                    const configProduct = {
                        ...product
                    }

                    return (
                        <Product {...configProduct}/>
                    )
                })}
            </div>
            {!isLastPage && (
                <LoadMore {...configLoadMore}/>
            )}
        </div>
    )
}

export default ProductResults;