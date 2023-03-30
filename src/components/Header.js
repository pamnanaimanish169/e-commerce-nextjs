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
        fetch('/api/checkout_sessions', { method: 'POST', body: JSON.stringify({ cartList }) }).then((res) => res.json()).then((data) => router.push(data?.url)).catch((err) => console.error('err', err))
    }

    function handleIncrement(item) {
        dispatch({ type: "increment", payload: item });
    }

    function handleDecrement(item) {
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
                <div className={styles.topnav}>
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
                                        <div style={{display: `${show}`}} className={`${styles.dropdownContent} ${stickyClass === 'sticky' ? styles?.sticky : ''}`}>
                                            <ul className={styles.cartListWrapper}>
                                                {
                                                    cartList && cartList?.length > 0 && cartList.map((item) => (
                                                        <li key={item?.id}>
                                                            <a className={`d-flex justify-content-between ${styles.fillAvailable}`}>
                                                                <div className='d-flex justify-content-between'>
                                                                    <div><img src={item?.thumbnail} className={styles.itemThumbnail}/></div>

                                                                    <div className='px-2'>
                                                                        <div>{item?.title.slice(0, 20)}</div>
                                                                        <div className={styles?.itemPrice}>{'₹' + item?.price * item?.amount}</div>
                                                                    </div>
                                                                </div>

                                                                <div className={`d-flex flex-row ${styles.amountWrapper}`}>
                                                                    <div><p className={styles.amount}>{item?.amount}</p></div>
                                                                    <div className={`d-flex flex-column justify-content-center ${styles.incrementWrapper}`}>
                                                                        <p className={styles.incrementButton} onClick={() => handleIncrement(item)}>^</p>
                                                                        <p className={styles.decrementButton} onClick={() => handleDecrement(item)}>^</p>
                                                                    </div>
                                                                </div>
                                                                <div className='m-2' onClick={() => handleOnRemove(item)}><p> <img src="../delete.png" /> </p></div>
                                                            </a>
                                                        </li>
                                                    ))
                                                }
                                            </ul>

                                            <div className={styles.totalWrapper}>
                                                <div className={styles.totalContent}><b>Total {'₹' + getTotal()}</b></div>
                                                {/* Checkout */}
                                                <div>
                                                    <button
                                                        className={styles.handleCheckoutBtn}
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