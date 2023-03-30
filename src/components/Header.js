import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';

// don't remove this(super improtant)
const stripePromise = loadStripe(
    "pk_test_51MoJ19SD90OuzcFSudVpMsALtAA7mcQRp0LcvWCRNRLOqJQQEIK5lX8DMOnHALQb6C5RBuKpxtqKZdiMn1g21WAy00Nu9yFKHs"
);

const Header = () => {
    let router = useRouter();

    let price = 0;

    const dispatch = useDispatch();
    const cartList = useSelector((state) => state?.cartList || []);
    const [show, setShow] = useState('none');
    const [stickyClass, setStickyClass] = useState('');

    const handleCheckout = () => {
        event.preventDefault();
        fetch('/api/checkout_sessions', { method: 'POST', body: JSON.stringify({ cartList }) }).then((res) => res.json()).then((data) => router.push(data?.url)).catch((err) => console.log('err', err))
    }

    function myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }

    function handleIncrement(item) {
        dispatch({ type: "increment", payload: item });
    }

    function handleDecrement(item) {
        console.log('item', item?.amount - 1);

        if (item?.amount - 1 === 0) {
            dispatch({ type: "remove", payload: item });
        } else {
            dispatch({ type: "decrement", payload: item });
        }
    }

    function handleOnRemove(item) {
        dispatch({ type: "remove", payload: item });
    }

    function handleToggle() {
        if (show === 'block') {
            setShow('none');
        }
        if (show === 'none') {
            setShow('block');
        }
    }

    function handleDropdown() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    function getTotal() {
        cartList && cartList?.length > 0 && cartList?.map((element) => {
            price += element?.amount * element?.price;
        });

        return price;
    }

    let navbar = document.getElementById("navbar");

    let sticky = navbar?.offsetTop;

    // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    window.onscroll = () => {
        if (window.pageYOffset >= sticky) {
            setStickyClass('sticky');
        } else {
            setStickyClass('');
        }
    }

    return (
        <>
            {/* <!-- Header --> */}
            <div>
                <div className={styles.topnav} id="myTopnav">
                    <div className={styles.topnavWrapper}>
                        <div>
                            <img onClick={() => router.push('/')} src="../logo.svg" alt="logo" />
                        </div>
                        <div>
                            <div>
                                {
                                    cartList.length > 0 &&
                                    <div className={styles.dropdown}>
                                        <button onClick={handleToggle} className={styles.dropbtn}>{cartList?.length}</button>
                                        <div style={{
                                            display: `${show}`,
                                            position: "fixed",
                                            top: "60px",
                                            right: "-10px",
                                            background: "white",
                                            borderRadius : "10px",
                                            boxShadow : "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                                        }} className={`styles.dropdownContent ${stickyClass === 'sticky' ? styles?.sticky : ''}`}
                                            id="navbar"
                                        >
                                            <ul
                                                style={{
                                                    position: "relative",
                                                    overflow: "auto",
                                                    height: "290px",
                                                    paddingLeft: "0px"
                                                }}
                                                id="cartList"
                                            >
                                                {
                                                    cartList && cartList?.length > 0 && cartList.map((item) => (
                                                        <li key={item?.id}>
                                                            <a href='#' style={{ display: 'flex', width: "-webkit-fill-available", justifyContent: "space-between" }}>
                                                                <div
                                                                    style={{
                                                                        display: "flex",
                                                                        justifyContent: "space-between",
                                                                    }}
                                                                >
                                                                    <div><img src={item?.thumbnail} style={{
                                                                        width: "75px",
                                                                        fontFamily: "Poppins",
                                                                        verticalAlign: "middle",
                                                                        display: "table-cell",
                                                                        height: "60px",
                                                                        objectFit: "cover",
                                                                        marginRight: "20px",
                                                                        borderRradius: "10px"
                                                                    }} /></div>

                                                                    <div style={{
                                                                        fontFamily: 'Poppins',
                                                                        paddingRight: "5px"
                                                                    }}>
                                                                        <div>{item?.title.slice(0, 20)}</div>
                                                                        <div
                                                                            style={{
                                                                                color: 'grey'
                                                                            }}
                                                                        >{'₹' + item?.price * item?.amount}</div>
                                                                    </div>
                                                                </div>

                                                                <div style={{
                                                                    display: "flex",
                                                                    flexDirection: "row",
                                                                    border: "solid #DCDCDC 1px"
                                                                }}>
                                                                    <div><p
                                                                        style={{
                                                                            fontFamily: 'Poppins',
                                                                            paddingLeft: "5px",
                                                                            paddingRight: "5px",
                                                                            display: "table-cell",
                                                                            verticalAlign: "middle",
                                                                            height: "50px"
                                                                        }}
                                                                    >{item?.amount}</p></div>
                                                                    <div
                                                                        style={{
                                                                            display: "flex",
                                                                            flexDirection: "column",
                                                                            justifyContent: 'center',
                                                                            borderLeft: "solid #DCDCDC 1px"
                                                                        }}
                                                                    >
                                                                        <p
                                                                            style={{
                                                                                border: "none",
                                                                                color: "black",
                                                                                fontSize: "small",
                                                                                margin: "0",
                                                                                paddingLeft: "10px",
                                                                                paddingRight: "10px",
                                                                                borderBottom: "solid #DCDCDC 1px"
                                                                            }}
                                                                            onClick={() => handleIncrement(item)}>^</p>

                                                                        <p
                                                                            style={{
                                                                                border: "none",
                                                                                color: "black",
                                                                                fontSize: "small",
                                                                                transform: 'rotate(180deg)',
                                                                                margin: "0",
                                                                                paddingLeft: "10px",
                                                                                paddingRight: "10px"
                                                                            }}
                                                                            onClick={() => handleDecrement(item)}>^</p>
                                                                    </div>
                                                                </div>
                                                                <div className='m-2' style={{
                                                                    fontFamily: 'Poppins'
                                                                }} onClick={() => handleOnRemove(item)}><p> <img src="../delete.png" /> </p></div>
                                                            </a>
                                                        </li>
                                                    ))
                                                }
                                            </ul>

                                            <div className={styles.totalWrapper}>
                                                <div style={{
                                                    paddingTop: "10px",
                                                    fontFamily: 'Poppins'
                                                }}><b>Total {'₹' + getTotal()}</b></div>
                                                {/* Checkout */}
                                                <div>
                                                    <button
                                                        style={{
                                                            background: "black",
                                                            color: "white",
                                                            border: "none",
                                                            borderRadius: "10px",
                                                            paddingLeft: "15px",
                                                            paddingRight: "15px",
                                                            paddingTop: "10px",
                                                            paddingBottom: "10px",
                                                            fontFamily: 'Poppins',
                                                        }}
                                                        type="submit" role="link" onClick={handleCheckout}>
                                                        Checkout
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Header --> */}
        </>
    )
}

export default Header;