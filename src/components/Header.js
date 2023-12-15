// Package imports
import { loadStripe } from '@stripe/stripe-js';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Other imports within each section (alphabetically ordered)
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


// don't remove this(super improtant)
const stripePromise = loadStripe(
    'pk_test_51MoJ19SD90OuzcFSudVpMsALtAA7mcQRp0LcvWCRNRLOqJQQEIK5lX8DMOnHALQb6C5RBuKpxtqKZdiMn1g21WAy00Nu9yFKHs'
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
        fetch('/api/checkout_sessions', {
            method: 'POST',
            body: JSON.stringify({ cartList }),
        })
            .then((res) => res.json())
            .then((data) => router.push(data?.url))
            .catch((err) => console.error('err', err));
    };

    function handleIncrement(item) {
        dispatch({ type: 'increment', payload: item });
    }

    function handleDecrement(item) {
        if (item?.amount - 1 === 0) {
            dispatch({ type: 'remove', payload: item });
        } else {
            dispatch({ type: 'decrement', payload: item });
        }
    }

    function handleOnRemove(item) {
        dispatch({ type: 'remove', payload: item });
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
        cartList &&
            cartList?.length > 0 &&
            cartList?.map((element) => {
                price += element?.amount * element?.price;
            });

        return price;
    }

    let navbar = document.getElementById('navbar');
    let sticky = navbar?.offsetTop;

    // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    window.onscroll = () => {
        if (window.pageYOffset >= sticky) {
            setStickyClass('sticky');
        } else {
            setStickyClass('');
        }
    };

    return (
        <header>
            <Link href={'/'}>
                <img
                    src="/logo.png"
                    alt="logo"
                    className="logo"
                />
            </Link>
        </header>
    );
};

export default Header;
