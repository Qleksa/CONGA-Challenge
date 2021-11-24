import { LightningElement, track, wire } from 'lwc';

import getAllProducts from '@salesforce/apex/ProductController.getAllProducts';

import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import { addToLocalStorage } from 'c/storageUtils';

// const actions = [
//     { label: 'Price compare', name: 'priceCompare' },
//     { label: 'Buy', name: 'buy' }
// ];

// const columns = [
//     {
//         type: 'button-icon',
//         initialWidth: 75,
//         typeAttributes: {
//             iconName: 'action:preview',
//             title: 'Preview',
//             variant: 'border-filled',
//             alternativeText: 'View'
//         }
//     },
//     { type:'customImage', fixedWidth: 150,
//         typeAttributes: {
//             imageUrl: { fieldName: 'Image_URL__c' }
//         } 
//     },
//     { label: 'Name', fieldName: 'Name' },
//     { label: 'Description', fieldName: 'Description' },
//     { type: 'action', typeAttributes: { rowActions: actions } }
// ];

export default class List extends LightningElement {
    //@wire(getAllProducts)
    @track productList;
    productIdToShowDetailFor;

    isDetailModalOpen = false;
    isCheckoutModalOpen = false;
    isPriceCompareModalOpen = false;

    //columns = columns;

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

    // handleRowAction(event) {
    //     const selectedProduct = event.detail.row;
    //     const actionName = event.detail.action.name;
        
    //     if (actionName === 'priceCompare') {
    //         this.addToCompare(selectedProduct.Id);
    //     } else if (actionName === 'buy') {
    //         this.addToCart(selectedProduct)
    //     } else {
    //         this.openDetailModal(selectedProduct.Id);
    //     }
    // }

    handleClickOnCheckout() {
        this.openCheckoutModal();
    }

    handleOpenDetails(event) {
        const productId = event.detail;
        this.openDetailModal(productId);
    }

    handleAddToCart(event) {
        const product = event.detail;
        this.addToCart(product);
    }

    handleAddToCompare(event) {
        const productIdToCompare = event.detail;
        this.closeDetailModal();
        this.addToCompare(productIdToCompare);
    }

    handleKeyUp({ code }) {
        if (code === 'Escape') {
            this.isCheckoutModalOpen = false;
            this.isDetailModalOpen = false;
            this.isPriceCompareModalOpen = false;
            this.enableGlobalScroll();
        }
    }

    addToCompare(productId) {
        addToLocalStorage('compareProductIds', productId, 3);
        this.openPriceCompareModal();
    }

    addToCart(product) {
        addToLocalStorage('cartProductIds', product.Id);

        this.dispatchEvent( new ShowToastEvent({
            title: 'Added to cart!',
            message: `Product ${product.Name} has been added to the cart.`,
            variant: 'success'
        }));
    }

    openDetailModal(productId) {
        this.isDetailModalOpen = true;
        this.productIdToShowDetailFor = productId;
        this.disableGlobalScroll();
    }

    closeDetailModal() {
        this.isDetailModalOpen = false;
        this.enableGlobalScroll();
    }

    openCheckoutModal() {
        this.isCheckoutModalOpen = true;
        this.disableGlobalScroll();
    }

    closeCheckoutModal() {
        this.isCheckoutModalOpen = false;
        this.enableGlobalScroll();
    }

    openPriceCompareModal() {
        this.isPriceCompareModalOpen = true;
        this.disableGlobalScroll();
    }

    closePriceCompareModal() {
        this.isPriceCompareModalOpen = false;
        this.enableGlobalScroll();
    }
    
    enableGlobalScroll() {
        document.body.style.overflow = 'visible';
    }

    disableGlobalScroll() {
        document.body.style.overflow = 'hidden';
    }
}