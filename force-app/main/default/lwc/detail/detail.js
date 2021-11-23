import { LightningElement, api, wire } from 'lwc';

import getProduct from '@salesforce/apex/ProductController.getProduct';

export default class Detail extends LightningElement {
    @api productId;

    @wire(getProduct, { productId: '$productId'} )
    product;

    handleClickToCompare() {
        console.log('compare');
    }
    
    closeModal() {
        this.dispatchEvent(new CustomEvent('closemodal'));
    }
}