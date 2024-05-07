import axios from 'axios';
import users from './users.js';


const orgId = 'YOUR_ORG_ID'; 
const userIds = users; 
const apiKey = process.env.APPLITOOLS_API_KEY;
const baseUrl = 'https://eyes.applitools.com';  // Update baseUrl if private cloud


// Run `node deleteUsers.js` when all variables are set and you are ready to run the script

async function deleteUser(orgId, userIds, apiKey) {
    
    const failures = [];

    for (const userId of userIds) {
        const url = `${baseUrl}/api/Admin/orgs/${orgId}/users/${userId}?apiKey=${apiKey}`;
        
        try {
            const response = await axios.delete(url);
            
            if (response.status !== 200) {
                console.log(userId, 'returned status code: ', response.status);
                failures.push(userId);
            }

            console.log(userId, "successfully removed.");

        } catch (error) {
            console.log(userId, "failed due to error:", error.response.status, error.response.statusText);
            failures.push(userId);
        }

    }

    if (failures.length > 0) {
        console.log(`The following users failed to delete: ${failures.join(', ')}`);
    } else {
        console.log('All users deleted successfully.');
    }
}


deleteUser(orgId, userIds, apiKey);
