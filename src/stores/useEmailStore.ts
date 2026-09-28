import {create} from 'zustand'; 

interface UseEmailStore {
    email: string;
    setEmail: () => void;
    setEmail2: (newEmail: string) => void;
}
export const useEmailStore = create<UseEmailStore>((set) => ({
    email: '',
    setEmail: () => set(() => ({email: 'arivianosumantri25@gmail.com'})),
    setEmail2: (newEmail) => set(() => ({email: newEmail}) ) 
}))