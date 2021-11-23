import { LightningElement } from 'lwc';

import getProducts from '@salesforce/apex/ProductController.getProducts';

export default class Checkout extends LightningElement {
    products;
    totalPrice = 0;

    connectedCallback() {
        let cartProductIds = localStorage.getItem('cartProductIds');
        if (cartProductIds) {
            cartProductIds = JSON.parse(cartProductIds);
            getProducts({productIds: cartProductIds})
            .then(products => {
                this.products = products;
                this.products.forEach(product => {
                    if(product.Price__c) {
                        this.totalPrice += product.Price__c;
                    }
                });
            })
            .catch(e => {
                console.log(e);
            });
        }
    }

    closeModal() {
        this.dispatchEvent(new CustomEvent('closemodal'));
    }

    handleClickToBuy() {
        this.buyItems();
        this.closeModal();   
    }

    buyItems() {
        localStorage.clear();
    }
}