import { LightningElement, track, api } from 'lwc';

import getProducts from '@salesforce/apex/ProductController.getProducts';

import { removeFromLocalStorage } from 'c/storageUtils';

export default class Compare extends LightningElement {
    @track productsToCompare;
    @api allProducts;

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

    handleClickOnRemove(event) {
        const productIdToRemove = event.currentTarget.dataset.productId;
        this.removeProductFromComparingProducts(productIdToRemove);
    }

    removeProductFromComparingProducts(productId) {
        removeFromLocalStorage('compareProductIds', productId);
        this.productsToCompare = this.productsToCompare.filter(product => product.Id !== productId);
        if (this.productsToCompare.length === 0)
            this.closeModal();
    }
}