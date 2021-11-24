import { LightningElement, api, wire } from 'lwc';

import getProduct from '@salesforce/apex/ProductController.getProduct';

export default class Detail extends LightningElement {
    @api productId;

    @wire(getProduct, { productId: '$productId'} )
    product;

    handleClickToCompare() {
        this.dispatchEvent(new CustomEvent('addtocompare', {
            detail: this.productId
        }))
    }
    
    closeModal() {
        this.dispatchEvent(new CustomEvent('closemodal'));
    }
}