import { LightningElement, track, wire } from 'lwc';

import getAllProducts from '@salesforce/apex/ProductController.getAllProducts';

import {ShowToastEvent} from 'lightning/platformShowToastEvent';

const actions = [
    { label: 'Price compare', name: 'priceCompare' },
    { label: 'Buy', name: 'buy' }
];

const columns = [
    {
        type: 'button-icon',
        initialWidth: 75,
        typeAttributes: {
            iconName: 'action:preview',
            title: 'Preview',
            variant: 'border-filled',
            alternativeText: 'View'
        }
    },
    { type:'customImage', fixedWidth: 150,
        typeAttributes: {
            imageUrl: { fieldName: 'Image_URL__c' }
        } 
    },
    { label: 'Name', fieldName: 'Name' },
    { label: 'Description', fieldName: 'Description' },
    { type: 'action', typeAttributes: { rowActions: actions } }
];

export default class List extends LightningElement {
    //@wire(getAllProducts)
    @track productList;
    productIdToShowDetailFor;
    isDetailModalOpen = false;
    
    isCheckoutModalOpen = false;

    isPriceCompareModalOpen = false;

    columns = columns;

    

    connectedCallback() {
        this.callGetAllProducts();
    }

    callGetAllProducts() {
        getAllProducts()
        .then((data) => {
            console.log(data);
            this.productList = data;
        })
        .catch((e) => {
            console.log(e);
        })
    }

    handleRowAction(event) {
        const selectedProduct = event.detail.row;
        const actionName = event.detail.action.name;
        
        if (actionName === 'priceCompare') {
            this.addToCompare(selectedProduct.Id);
        } else if (actionName === 'buy') {
            this.addToCart(selectedProduct)
        } else {
            this.openDetailModal(selectedProduct.Id);
        }
    }

    handleClickOnCheckout() {
        this.openCheckoutModal();
    }

    addToCompare(productId) {
        this.addToLocalStorage('compareProductIds', productId);
        this.openPriceCompareModal();
    }

    addToCart(product) {
        this.addToLocalStorage('cartProductIds', product.Id);

        this.dispatchEvent( new ShowToastEvent({
            title: 'Added to cart!',
            message: `Product ${product.Name} has been added to the cart.`,
            variant: 'success'
        }));
    }

    addToLocalStorage(itemToAddTo, value) {
        let item = localStorage.getItem(itemToAddTo);
        if (item) {
            item = JSON.parse(item);
            item.push(value)
            localStorage.setItem(itemToAddTo, JSON.stringify(item));
        } else {
            localStorage.setItem(itemToAddTo, JSON.stringify([value]));
        }
    }

    openDetailModal(productId) {
        console.log('view detail for: ' + productId);
        this.isDetailModalOpen = true;
        this.productIdToShowDetailFor = productId;
    }

    closeDetailModal() {
        this.isDetailModalOpen = false;
    }

    openCheckoutModal() {
        this.isCheckoutModalOpen = true;
    }

    closeCheckoutModal() {
        this.isCheckoutModalOpen = false;
    }

    openPriceCompareModal() {
        this.isPriceCompareModalOpen = true;
    }

    closePriceCompareModal() {
        this.isPriceCompareModalOpen = false;
    }
}