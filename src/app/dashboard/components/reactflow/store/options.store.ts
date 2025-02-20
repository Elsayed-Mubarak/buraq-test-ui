import {create} from "zustand";

type OptionsStore = {
    branchesNames: string[];
    setBranchesNames: (branches: string[]) => void;
    
}

const useOptionsStore = create((set, get) => ({

}))