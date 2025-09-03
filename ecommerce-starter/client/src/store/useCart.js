
import { create } from "zustand";

const useCart = create((set, get) => ({
  items: [],
  add: (p, qty=1) => {
    const items = [...get().items];
    const i = items.findIndex(x => x._id === p._id);
    if (i >= 0) items[i] = { ...items[i], qty: items[i].qty + qty };
    else items.push({ ...p, qty });
    set({ items });
  },
  inc: (id) => set({ items: get().items.map(i => i._id===id?{...i, qty:i.qty+1}:i) }),
  dec: (id) => set({ items: get().items.map(i => i._id===id?{...i, qty:Math.max(1,i.qty-1)}:i) }),
  remove: (id) => set({ items: get().items.filter(i => i._id !== id) }),
  clear: () => set({ items: [] }),
  total: () => get().items.reduce((s,i)=>s+i.price*i.qty,0)
}));

export default useCart;
