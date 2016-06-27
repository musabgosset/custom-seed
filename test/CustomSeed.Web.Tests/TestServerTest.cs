
using CustomSeed.Web.Controllers;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace CustomSeed.Web.Tests
{
    public class TestServerTest : IClassFixture<TestServerFixture<CustomSeed.Web.Startup>>
    {
        private const string username = "Me";
        private const string password = "MyPassword";

        private readonly TestServerFixture<CustomSeed.Web.Startup> _fixture;

        public TestServerTest(TestServerFixture<CustomSeed.Web.Startup> fixture)
        {
            this._fixture = fixture;
        }

        private async Task<HttpResponseMessage> GetSignInResponse(string username, string password)
        {
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, _fixture.Url + "api/User/SignIn");
            LoginViewModel viewModel = new LoginViewModel { Username = username, Password = password };
            request.Content = new StringContent(JsonConvert.SerializeObject(viewModel), Encoding.UTF8, "application/json");

            HttpResponseMessage response = await _fixture.Client.SendAsync(request);

            return response;
        }
        private async Task<HttpResponseMessage> GetSignOutResponse()
        {
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, _fixture.Url + "api/User/SignOut");

            HttpResponseMessage response = await _fixture.Client.SendAsync(request);

            return response;
        }
        private async Task SignIn(string username, string password)
        {
            HttpResponseMessage response = await GetSignInResponse(username, password);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            SetCookieHeaderValue setCookieHeader = SetCookieHeaderValue.ParseList(response.Headers.GetValues("Set-Cookie").ToList()).First();

            CookieHeaderValue cookieHeader = new CookieHeaderValue(setCookieHeader.Name, setCookieHeader.Value);
            _fixture.Client.DefaultRequestHeaders.Add(HeaderNames.Cookie, cookieHeader.ToString());
        }
        private async Task SignOut()
        {
            HttpResponseMessage response = await GetSignOutResponse();

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            SetCookieHeaderValue setCookieHeader = SetCookieHeaderValue.ParseList(response.Headers.GetValues("Set-Cookie").ToList()).First();

            Assert.True(setCookieHeader.Expires < DateTime.Now);

            _fixture.Client.DefaultRequestHeaders.Clear();
        }

        [Fact]
        public async Task Cannot_Read_Values_Before_Sign_In()
        {
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, _fixture.Url + "api/Value");

            HttpResponseMessage response = await _fixture.Client.SendAsync(request);

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task Can_Sign_In()
        {
            await SignIn(TestServerTest.username, TestServerTest.password);
        }

        [Fact]
        public async Task Cannot_Sign_In_With_Wrong_Credentials()
        {
            HttpResponseMessage reponse = await GetSignInResponse("Wrong", "Wrong");

            Assert.Equal(HttpStatusCode.BadRequest, reponse.StatusCode);
        }
        
        [Fact]
        public async Task Can_Sign_Out()
        {
            await SignIn(TestServerTest.username, TestServerTest.password);
            await SignOut();
        }

        [Fact]
        public async Task Can_Read_Values_After_Sign_In()
        {
            await SignIn(TestServerTest.username, TestServerTest.password);

            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, _fixture.Url + "api/Value");
            
            HttpResponseMessage response = await _fixture.Client.SendAsync(request);
            
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            JArray responseContent = JArray.Parse(await response.Content.ReadAsStringAsync());

            Assert.Equal("application/json", response.Content.Headers.ContentType.MediaType);
            Assert.Equal(new JArray("A", "B", "C"), responseContent);
        }

        

        [Fact]
        public async Task Cannot_Read_Values_After_Sign_Out()
        {
            await SignIn(TestServerTest.username, TestServerTest.password);
            await SignOut();

            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, _fixture.Url + "api/Value");

            HttpResponseMessage response = await _fixture.Client.SendAsync(request);

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

    }
}
