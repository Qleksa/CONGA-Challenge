@isTest
private class ProductControllerTest {
    @TestSetup
    static void makeData() {
        List<Product2> testProducts = new List<Product2>();
        for (Integer i = 0; i < 50; i++) {
            testProducts.add(new Product2(Name = 'Test' + i));
        }
        insert testProducts;
    }

    @isTest
    static void testGetAllProducts() {
        List<Product2> retrievedProducts = ProductController.getAllProducts();
        System.assertEquals(50, retrievedProducts.size());
    }

    @isTest
    static void testGetProduct() {
        Id testProductId = [SELECT Id FROM Product2 LIMIT 1].Id;
        Product2 retrievedProduct = ProductController.getProduct(testProductId);
        System.assertEquals('Test0', retrievedProduct.Name); 
    }

    @isTest
    static void testGetProducts() {
        Map<Id, Product2> testProducts = new Map<Id, Product2>([SELECT Id FROM Product2 LIMIT 5]);
        List<Id> testIds = new List<Id>(testProducts.keySet());
        List<Product2> retrievedProducts = ProductController.getProducts(testIds);
        System.assertEquals(5, retrievedProducts.size());
    }
}
