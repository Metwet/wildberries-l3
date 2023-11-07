import localforage from "localforage";
import { ProductData } from "types";

const DB = '__wb-favourites';

class FavouritesService {
    init(){
        this._updFavouritesLink();
    }

    async get(): Promise<ProductData[]> {
        return (await localforage.getItem(DB)) || [];
    }

    async set(data: ProductData[]) {
        await localforage.setItem(DB, data);
        this._updFavouritesLink();
    }

    async addProduct(product: ProductData) {
        const products = await this.get();
        await this.set([...products, product]);
    }

    async removeProduct(product: ProductData) {
        const products = await this.get();
        await this.set(products.filter(({ id }) => id !== product.id));
    }

    async isInFavourites(product: ProductData): Promise<boolean> {
        const products = await this.get();
        return products.some(({ id }) => id === product.id);
    }

    private async _updFavouritesLink() {
        const products = await this.get();
        const favouritesLink = document.querySelector('.favourites');

        //@ts-ignore
        favouritesLink.style.display = (products.length)?'inline-block':'none';
    }
}

export const favouritesService = new FavouritesService();