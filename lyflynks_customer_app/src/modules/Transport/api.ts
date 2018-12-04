import { domain, activities, makeRequest, toQueryString } from 'util/Api';

const base = domain + activities.root;
const LYFY_CLIENT_TOKEN = "n0DPnsjy+UH3rJU3FqXP1ri1hKMZihmaY1axzskI73SelcHmFillvjASI15WojgYsZNlz2p3JoxaHCttjRarjupSag+FuSggyWYrPWaUXd1yf4nI/KN0Mxc=";

export default {
    async requestTransportation(params, token) {
      return makeRequest([base, activities.requestTransportation], 'POST', params, token);
    },

    async getHouseholdAddressApiCall(token) {
      return makeRequest([domain, '/household/address'], 'GET', null, token);
    },

    getLyftEstimate(origin, destination) {
      var lyft = require('node-lyft');
      var defaultClient = lyft.ApiClient.instance;
      defaultClient.authentications['Client Authentication'].accessToken = LYFY_CLIENT_TOKEN;
      var lyftPublicApi = new lyft.PublicApi()

      let opts = {
        'rideType': "lyft",
        'endLat': destination.latitude,
        'endLng': destination.longitude
      };

      return lyftPublicApi.getCost(origin.latitude, origin.longitude, opts).then((data) => {
        let estimate = data.cost_estimates[0];

        if(!estimate.is_valid_estimate) {
          return "Unavailable";
        } else {
          return (estimate.estimated_cost_cents_max / 100).toLocaleString("en-US", {style:"currency", currency:"USD"});
        }
      }, (error) => {
        console.error(error);
      });
    }
}
