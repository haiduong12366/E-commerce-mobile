import { create } from 'zustand'

const userInfo = create((set)=>({
    user: null,
    setUser:(user)=> set({user}),
    cartItem: [],
    setCartItem:(cartItem)=> set({cartItem}),
}))

export default userInfo