import { LightningElement } from 'lwc';

import getProducts from '@salesforce/apex/ProductController.getProducts';

export default class Compare extends LightningElement {
    productsToCompare;

    connectedCallback() {
        let compareProductIds = localStorage.getItem('compareProductIds');
        if (compareProductIds) {
            compareProductIds = JSON.parse(compareProductIds);
            getProducts({productIds: compareProductIds})
            .then(products => {
                this.productsToCompare = products;
            })
            .catch(e => {
                console.log(e);
            });
        }
    }

    closeModal() {
        this.dispatchEvent(new CustomEvent('closemodal'));
    }

    handleClickOnRemove() {

    }
}