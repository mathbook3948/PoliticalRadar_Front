import {create} from "zustand/react";

interface News {
    id: number,
    issue: string,
    importance: string,
    severity : number,
    keyword: string,
    time: string,
    effects: string[]
}

interface Item {
    news: News | null;
    setNews: (by: News) => void;
}

export const useStore = create<Item>()((set) => ({
    news: null,
    setNews: (by: News) => set(() => ({ news: by }))
}))
