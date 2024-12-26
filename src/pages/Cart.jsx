import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cartItems, updateQuantity, addNewAddress, notification, removeItemFromCart }) => {
    const navigate = useNavigate();
    const [selectedAddress, setSelectedAddress] = useState('');
    const [newAddress, setNewAddress] = useState({
        name: '',
        mobile: '',
        pincode: '',
        city: '',
        district: '',
        state: '',
        landmark: ''
    });
    const [error, setError] = useState({});
    const [savedAddress, setSavedAddress] = useState(false);

    // GST rate
    const gstRate = 0.18; // 18% GST

    const fetchCityAndDistrict = async (pincode) => {
        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            const data = await response.json();
            if (data && data[0].Status === "Success") {
                const details = data[0].PostOffice[0];
                setNewAddress((prevAddress) => ({
                    ...prevAddress,
                    city: details.Block,
                    district: details.District,
                    state: details.State
                }));
            } else {
                notification("Invalid Pincode or not found!");
            }
        } catch (error) {
            console.error("Error fetching city and district", error);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!newAddress.name) errors.name = "Name is required";
        if (!newAddress.mobile) errors.mobile = "Phone number is required";
        if (!newAddress.pincode) errors.pincode = "Pincode is required";
        if (!newAddress.city) errors.city = "City is required";
        if (!newAddress.district) errors.district = "District is required";
        if (!newAddress.state) errors.state = "State is required";
        if (!newAddress.landmark) errors.landmark = "Landmark is required";
        setError(errors);
        return Object.keys(errors).length === 0;
    };

    const handleNewAddressChange = (e) => {
        const { name, value } = e.target;
        setNewAddress({
            ...newAddress,
            [name]: value
        });

        if (name === "pincode" && value.length === 6) {
            fetchCityAndDistrict(value);
        }
    };

    const handleSubmitNewAddress = () => {
        if (validateForm()) {
            addNewAddress(newAddress);
            setSavedAddress(true);
            setSelectedAddress(newAddress);
            setNewAddress({
                name: '',
                mobile: '',
                pincode: '',
                city: '',
                district: '',
                state: '',
                landmark: ''
            });
        }
    };

    const handleBuyNow = () => {
        if (!selectedAddress.name) {
            alert("Please fill in and select your address before proceeding.");
        } else {
            alert("Processing your order...");
        }
    };

    // Calculate totals with GST and shipping charge (15% of subtotal)
    const calculateTotal = () => {
        const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const gstAmount = subTotal * gstRate;
        const shippingCharge = subTotal * 0.15; // 15% of subtotal as shipping charge
        const total = subTotal + gstAmount + shippingCharge;
        return {
            subTotal,
            gstAmount,
            shippingCharge,
            total
        };
    };

    const { subTotal, gstAmount, shippingCharge, total } = calculateTotal();

    return (
        <div className="cart-container">
            <h2 className="cart-title">Your Cart</h2>
            {cartItems.length === 0 ? (
                <p className='yourcart'>Your cart is empty. Go to <button onClick={() => navigate('/course')}>Courses</button></p>
            ) : (
                <table className="cart-list">
                    <thead>
                        <tr>
                            <th>Course</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td className="item-quantity">
                                    <button className="quantity-button" onClick={() => updateQuantity(item.id, -1)}>-</button>
                                    {item.quantity}
                                    <button className="quantity-button" onClick={() => updateQuantity(item.id, 1)}>+</button>
                                </td>
                                <td className="item-price">{item.price} Rs</td>
                                <td className="item-total">{(item.price * item.quantity).toFixed(2)} Rs</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <hr />
            <p>Subtotal: ₹{subTotal.toFixed(2)}</p>
            <p>GST (18%): ₹{gstAmount.toFixed(2)}</p>
            <p>Shipping Charge: ₹{shippingCharge.toFixed(2)}</p> {/* Only shows shipping charge, not the percentage */}
            <h3>Total: ₹{total.toFixed(2)}</h3>
            <hr />
            <h3 className="address-title">Shipping Address</h3>
            <div className="address-section">
                {savedAddress && (
                    <div className="saved-address">
                        <h4>Saved Address</h4>
                        <p>
                            {selectedAddress.name} - {selectedAddress.mobile} <br />
                            {selectedAddress.city}, {selectedAddress.district}, {selectedAddress.state} <br />
                            Landmark: {selectedAddress.landmark}, Pincode: {selectedAddress.pincode}
                        </p>
                    </div>
                )}
                <h4>Add New Address</h4>
                <form className="address-form">
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={newAddress.name}
                            onChange={handleNewAddressChange}
                        />
                        {error.name && <span className="error">{error.name}</span>}
                    </div>
                    <div>
                        <input
                            type="text"
                            name="mobile"
                            placeholder="Phone No"
                            value={newAddress.mobile}
                            onChange={handleNewAddressChange}
                        />
                        {error.mobile && <span className="error">{error.mobile}</span>}
                    </div>
                    <div>
                        <input
                            type="text"
                            name="pincode"
                            placeholder="Pincode"
                            value={newAddress.pincode}
                            onChange={handleNewAddressChange}
                        />
                        {error.pincode && <span className="error">{error.pincode}</span>}
                    </div>
                    <div>
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={newAddress.city}
                            readOnly
                        />
                        {error.city && <span className="error">{error.city}</span>}
                    </div>
                    <div>
                        <input
                            type="text"
                            name="district"
                            placeholder="District"
                            value={newAddress.district}
                            readOnly
                        />
                        {error.district && <span className="error">{error.district}</span>}
                    </div>
                    <div>
                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            value={newAddress.state}
                            readOnly
                        />
                        {error.state && <span className="error">{error.state}</span>}
                    </div>
                    <div>
                        <input
                            type="text"
                            name="landmark"
                            placeholder="Landmark"
                            value={newAddress.landmark}
                            onChange={handleNewAddressChange}
                        />
                        {error.landmark && <span className="error">{error.landmark}</span>}
                    </div>
                    <button type="button" className="add-address-button" onClick={handleSubmitNewAddress}>Add Address</button>
                </form>
            </div>
            <button className="buy-now-button" onClick={handleBuyNow}>Buy Now</button>
        </div>
    );
};

export default Cart;
