import { makeRequest, domain, check_in_urls } from 'util/Api';

export default {
    fetchElders(token) {
        const url = [domain, check_in_urls.members_account];
        return makeRequest(url, 'GET', null, token);
    },
    fetchMembers(token) {
        const url = [domain, check_in_urls.fetchMembers];
        return makeRequest(url, 'GET', null, token);
    },
    cancelCheckIn() {

    },
    updateCheckIn() {
        
    },
    fetchCheckIn(id, token) {
        const url = [domain, check_in_urls.fetchCheckIn + id];
        return makeRequest(url, 'GET', null, token);
    },
    createCheckIn(payload, token) {
        const url = [domain, check_in_urls.postCheckIn];
        return makeRequest(url, 'POST', payload, token);
    }
}