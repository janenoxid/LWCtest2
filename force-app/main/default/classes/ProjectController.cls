public with sharing class ProjectController {
    @AuraEnabled(Cacheable=true)
    public static Opportunity[] getAllExhibitionVenues(){
        return [
            SELECT
                Id,
                Name,
                AccountId,
                Account.Name,
                Account.Location__c,
                EndDate_Formula__c,
                Exhibition__c, // not sure how to get the name of the Exhibition from here. There are multiple lookup fields on project/opportunity to other projects.
                OwnerId,
                StageName,
                StartDate_Formula__c,
                // Supervisor__r.Name  ------> keeping this here as a reminder of how custom relationships need to be set up.
            FROM Opportunity
            ORDER BY Name
            LIMIT 50 // this is okay to keep for tests, but will need to remove later.
        ];
    }
    
    // public ProjectController() {  ----> This was standard when I created the controller. Keeping it here in case I want to use it, butI'm not sure I will. 

    // }
}


// public with sharing class BearController {
    // @AuraEnabled(Cacheable=true)
    // public static Bear__c[] getAllBears() {
    //     return [
    //         SELECT
    //             Id,
    //             Name,
    //             Age__c,
    //             Sex__c,
    //             Height__c,
    //             Weight__c,
    //             Location__Latitude__s,
    //             Location__Longitude__s,
    //             Supervisor__r.Name
    //         FROM Bear__c
    //         ORDER BY Name
    //         LIMIT 50
    //     ];
    // }

//     @AuraEnabled(Cacheable=true)
//     public static Bear__c[] searchBears(String searchTerm) {
//         // Return all bears when no search term
//         searchTerm = searchTerm.trim();
//         if (searchTerm == '') {
//             return getAllBears();
//         }
//         // Prepare query paramters
//         searchTerm = '%' + searchTerm + '%';
//         // Execute search query
//         return [
//             SELECT
//                 Id,
//                 Name,
//                 Age__c,
//                 Sex__c,
//                 Height__c,
//                 Weight__c,
//                 Location__Latitude__s,
//                 Location__Longitude__s,
//                 Supervisor__r.Name
//             FROM Bear__c
//             WHERE Name LIKE :searchTerm
//             ORDER BY Name
//             LIMIT 50
//         ];
//     }
// }
    