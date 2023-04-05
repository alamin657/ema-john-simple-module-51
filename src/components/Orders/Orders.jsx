import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import './Orders.css';
import ReviewItem from '../ReviewItem/ReviewItem';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
const Orders = () => {
    const savedCart = useLoaderData()
    const [cart, setCart] = useState(savedCart);
    const handleRemoveFromCart = (id) => {
        const remaining = cart.filter(product => product.id !== id);
        setCart(remaining);
        removeFromDb(id);
    }

    const handleClearCart = () => {
        setCart([])
        deleteShoppingCart()
    }

    return (
        <div className='shop-container'>
            <div className="review-container">
                {
                    cart.map(product => <ReviewItem
                        product={product}
                        handleRemoveFromCart={handleRemoveFromCart}
                        key={product.id}></ReviewItem>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}
                    handleClearCart={handleClearCart}>
                    <Link className='proceed-link' to="/checkout">
                        <button className='btn-proceed'>Proceed Checkout</button>
                    </Link>
                </Cart>

            </div>

        </div>
    );
};

export default Orders;