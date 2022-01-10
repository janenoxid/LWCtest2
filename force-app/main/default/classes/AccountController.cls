public with sharing class AccountController {
    @AuraEnabled(Cacheable=true)
    public static Account[] getAllAccounts(){
        return [
            SELECT
                Id,
                Name,
                Location__c,
                Tax_Exempt_State__c
            FROM Account
            ORDER BY Name
            LIMIT 50 // this is okay to keep for tests, but will need to remove later.
        ];
    // public AccountController() {

    // }
}
