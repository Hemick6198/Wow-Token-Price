using Newtonsoft.Json;
using RestSharp;
using RestSharp.Authenticators;
using System;

namespace WoWTokenPrice
{
    class Program
    {
        static void Main(string[] args)
        {
            BlizzardApiClient Api = new BlizzardApiClient("replace_with_blizzard_api)client_id", "replace_with_blizzard_api_client_secret");

            string tokenPrice = Api.GetGoldPrice();

            Console.WriteLine($"The current WoW token price in the USA is {tokenPrice} gold!");
            Console.WriteLine("James Ives <iam@jamesiv.es> (https://jamesiv.es)");
        }
    }
 
    class BlizzardApiClient
    {
        private string clientId;
        private string clientSecret;
        private string accessToken;

        public class AccessTokenResponse
        {
            public string access_token { get; set; }
        }

        public class WowApiResponse
        {
            public int price { get; set; }
        }


        public BlizzardApiClient(string id, string secret)
        {
            clientId = id;
            clientSecret = secret;
            accessToken = GetOAuthToken();
        }

        private string GetOAuthToken()
        {
            var client = new RestClient("https://us.battle.net");
            client.Authenticator = new SimpleAuthenticator("client_id", clientId, "client_secret", clientSecret);

            var request = new RestRequest($"/oauth/token?grant_type=client_credentials", Method.GET);
            request.OnBeforeDeserialization = resp => { resp.ContentType = "application/json"; };
            IRestResponse response = client.Execute(request);
            var tokenResponse = JsonConvert.DeserializeObject<AccessTokenResponse>(response.Content);

            return tokenResponse.access_token;
        }

        public string GetGoldPrice()
        {
            var client = new RestClient("https://us.api.blizzard.com");
            var request = new RestRequest($"/data/wow/token/?namespace=dynamic-us&access_token={accessToken}", Method.GET);

            request.OnBeforeDeserialization = resp => { resp.ContentType = "application/json"; };
            IRestResponse response = client.Execute(request);
            var data = JsonConvert.DeserializeObject<WowApiResponse>(response.Content);

            return (data.price / 10000).ToString();
        }
    }
}