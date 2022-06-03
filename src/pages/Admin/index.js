import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductStart, fetchProductsStart, deleteProductStart } from '../../redux/Products/products.actions';
import Modal from './../../components/Modal';
import Input from './../../components/Forms/Input';
import Select from './../../components/Forms/Select';
import Button from './../../components/Forms/Button';
import './styles.scss';

const mapState = ({ productData }) => ({
    products: productData.products
})

const Admin = props => {
    const { products } = useSelector(mapState);
    const [hideModal, setHideModal] = useState(true);
    const [productCategory, setProductCategory] = useState('food');
    const [productName, setProductName] = useState('');
    const [productThumbnail, setProductThumbnail] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const toggleModal = () => setHideModal(!hideModal);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductsStart());
    }, []);

    const configModal = {
        hideModal,
        toggleModal
    };
    
    const resetForm = () => {
        setProductCategory('food');
        setProductName('');
        setProductThumbnail('');
        setProductPrice(0);
        setHideModal(true);
    }
    const handleSubmit = event => {
        event.preventDefault();
        
        dispatch(addProductStart({productCategory, productName, productThumbnail, productPrice}))
        resetForm();
    }
    
    return (
        <div className="admin">
            <div className="callToActions">
                <ul>
                    <li>
                        <Button onClick={() => toggleModal()}>
                        Add new product
                        </Button>
                    </li>
                </ul>
            </div> 


            <Modal {...configModal}>
                <div className="addNewProductForm">
                    <form onSubmit={handleSubmit}>

                        <h2>
                        Add new product
                        </h2>

                        <Select
                        label="Category"
                        options={[{
                            value: "food",
                            name: "Food"
                        }, {
                            value: "merch",
                            name: "Merch"
                        }]}
                        handleChange={e => setProductCategory(e.target.value)}
                        />

                        <Input
                        label="Name"
                        type="text"
                        value={productName}
                        handleChange={e => setProductName(e.target.value)}
                        />

                        <Input
                        label="Image URL"
                        type="url"
                        value={productThumbnail}
                        handleChange={e => setProductThumbnail(e.target.value)}
                        />

                        <Input
                        label="Price"
                        type="number"
                        min="0.00"
                        max="10000.00"
                        step="0.01"
                        value={productPrice}
                        handleChange={e => setProductPrice(e.target.value)}
                        />

                        <Button type="submit">
                        Add product
                        </Button>

                    </form>
                </div>
            </Modal>
            <div className="manageProducts">
                <table border="0" cellPadding="0" cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>
                                <h1>Manage Product</h1>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <table className="results" border="0" cellPadding="10" cellSpacing="0">
                                    <tbody>
                                        {products.map((product, index) => {
                                            const {
                                                productName,
                                                productThumbnail,
                                                productPrice,
                                                documentID
                                            } = product;
                                            return (
                                                <tr key={index} className="productRow">
                                                    <td>
                                                        <img className="thumb" src={productThumbnail} />
                                                    </td>
                                                    <td>{productName}</td>
                                                    <td>${productPrice}</td>
                                                    <td>
                                                        <Button onClick={() => dispatch(deleteProductStart(documentID))}>Delete</Button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>  
    );
}

export default Admin;      
