// Package imports
import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web


const initialState = {
    cartList: [],
    total: 0
};

const rootReducers = (state = initialState, action) => {
    if (action.type === "add") {
        if (state?.cartList && state?.cartList.length > 0) {
            return {
                cartList: [...state?.cartList, { ...action?.payload, amount: 1 }],
            };
        } else {
            return {
                cartList: [{ ...action?.payload, amount: 1 }],
            };
        }
    }

    if (action.type === "update") {

        let updatedCart = state?.cartList.map((cartItem) =>
            cartItem?.id === action?.payload?.id
                ? {
                    ...cartItem,
                    amount: cartItem?.amount + 1,
                }
                : cartItem
        );
        return {
            cartList: updatedCart
        };
    }

    if (action?.type === "remove") {
        state?.cartList.splice(state?.cartList.indexOf(action.payload), 1);

        // important: direct slice will not work here, you have to map around array & then splice the array
        let updatedCart = state?.cartList.map((cartItem) => cartItem?.id === action?.payload?.id ? state?.cartList.splice(state?.cartList.indexOf(action?.payload), 1) : cartItem);

        return { cartList: updatedCart };

    }

    if (action.type === "increment") {
        let updatedCart = state?.cartList.map((cartItem) => cartItem?.id === action?.payload?.id ? { ...cartItem, amount: cartItem?.amount + 1 } : cartItem);

        return { cartList: updatedCart };
    }

    if (action.type === "decrement") {
        let updatedCart = state?.cartList.map((cartItem) =>
            cartItem?.id === action?.payload?.id && cartItem.amount > 0
                ? {
                    ...cartItem,
                    amount: cartItem?.amount - 1,
                }
                : cartItem
        );
        return {
            cartList: updatedCart
        };
    }
    if (action?.type === "empty") {
        return {};
    }

    return state;
};

const persistConfig = {
    key: 'root',
    storage
};
const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);