import { ProductData } from "types";
import { Component } from "../component";
import html from './searchHints.tpl.html';

class SearchHints extends Component {

    async render() {
        const productsResp = await fetch('./api/getPopularProducts');
        const products = await productsResp.json();

        if(!products.length){
            this.view.hint1.innerText = 'чехол iphone 13 pro';
            this.view.hint2.innerText = 'коляски agex';
            this.view.hint3.innerText = 'яндекс станция 2';
        }
        
        const hints = this._makeThreeHints(products);
        
        this.view.hint1.innerText = hints[0];
        this.view.hint2.innerText = hints[1];
        this.view.hint3.innerText = hints[2];
    }

    private _makeThreeHints(products: ProductData[]): string[] {
        const randomThreeProducts = [...products].sort(() => Math.random() - 0.5).slice(0, 3);
        return randomThreeProducts.map(product=>this._getFirstTwoWords(product.name.toLowerCase()))
    }

    private _getFirstTwoWords(str: string): string{
        const words = str.split(' ');
        return words.slice(0, 2).join(' ');
    }

}

export const searchHints = new SearchHints(html);