import { LightningElement } from 'lwc';

import getProducts from '@salesforce/apex/ProductController.getProducts';

const columns = [
    { type:'customImage', fixedWidth: 150,
        typeAttributes: {
            imageUrl: { fieldName: 'Image_URL__c' }
        } 
    },
    { label: 'Name', fieldName: 'Name' },
    { label: 'Description', fieldName: 'Description' },
    { label: 'Color', fieldName: 'Color__c' },
    { label: 'Dimension', fieldName: 'Dimension__c' },
    { label: 'Price', type: 'currency', fieldName: 'Price__c' } 
];

export default class Checkout extends LightningElement {
    products;
    totalPrice = 0;

    columns = columns;

    connectedCallback() {
        let cartProductIds = localStorage.getItem('cartProductIds');
        if (cartProductIds !== 'null') {
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
        localStorage.setItem('cartProductIds', null);
    }

    get isBuyDisabled() {
        return this.products === undefined;
    }
}