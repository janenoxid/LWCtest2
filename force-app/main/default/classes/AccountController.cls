public with sharing class AccountController {
    @AuraEnabled(Cacheable=true)
    public static Account[] getAllAccounts(){
        return [
            SELECT
                Id,
                Name,
                Location__c,
                Tax_Exempt_State__c, 
                Partner_Status__c, 
                Date_of_Partnership__c,
                Region__c
            FROM Account
            ORDER BY Name
            LIMIT 20 // this is okay to keep for tests, but will need to remove later.
        ];

    }

    @AuraEnabled(Cacheable=true)
    public static Account[] getAllPartners(){
        return [
            SELECT
                Id,
                Name,
                Location__c,
                Tax_Exempt_State__c, 
                Date_of_Partnership__c,
                Region__c
            FROM Account
            WHERE Partner_Status__c = 'Partner'
            ORDER BY Name
            LIMIT 20 // this is okay to keep for tests, but will need to remove later.
        ];

    }
}