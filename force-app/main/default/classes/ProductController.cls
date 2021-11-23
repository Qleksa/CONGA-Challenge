public with sharing class ProductController {

    @AuraEnabled(cacheable=true)
    public static List<Product2> getAllProducts() {
        try {
            List<Product2> products = [SELECT Id, Name, Description, Image_URL__c FROM Product2];
            return products;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Product2> getProducts(List<Id> productIds) {
        try {
            System.debug(productIds);
            return [SELECT Name, Description, Price__c, Color__c, Dimension__c, Image_URL__c FROM Product2 WHERE Id IN :productIds];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static Product2 getProduct(Id productId) {
        try {
            return [SELECT Name, Description, Image__c, Color__c, Dimension__c, Price__c FROM Product2 WHERE Id = :productId LIMIT 1];
        } catch(Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
