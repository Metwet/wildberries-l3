import { Component } from "../component";
import html from "./favourites.tpl.html";
import { favouritesService } from "../../services/favourites.service";
import { ProductList } from "../productList/productList";

class Favourites extends Component {
    favouritesProducts: ProductList;

    constructor(props:any){
        super(props);

        this.favouritesProducts = new ProductList;
        this.favouritesProducts.attach(this.view.favourites);
    }

    async render() {
        const products = await favouritesService.get();
        if(products.length){
            this.favouritesProducts.update(products);
        } else {
            this.view.favourites.innerHTML = '<p>В избранном ничего нет. Искать товары <a href="/catalog">в каталоге</a></p>'
        }
    }
}

export const favouritesComp = new Favourites(html);