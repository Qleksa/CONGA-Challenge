import { LightningElement, api} from 'lwc';

export default class ProductTile extends LightningElement {
    @api product;

    get backgroundImage() {
        console.log(JSON.stringify(this.product));
        return `background-image: url(${this.product.Image_URL__c})`;
    }

    handleClick() {
        console.log('tile clicked');
        this.dispatchEvent(new CustomEvent('opendetails', {
            detail: this.product.Id
        }));
    }

    handleClickOnCompare() {
        this.dispatchEvent(new CustomEvent('addtocompare', {
            detail: this.product.Id
        }));
    }

    handleClickOnBuy() {
        this.dispatchEvent(new CustomEvent('addtocart', {
            detail: this.product
        }));
    }
}