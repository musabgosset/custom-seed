
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace CustomSeed.Web.Tests
{
    public class TestServerTest : IClassFixture<TestServerFixture<CustomSeed.Web.Startup>>
    {
        private readonly TestServerFixture<CustomSeed.Web.Startup> _fixture;

        public TestServerTest(TestServerFixture<CustomSeed.Web.Startup> fixture)
        {
            this._fixture = fixture;
        }

        [Fact]
        public async Task Can_Read_DefaultPage()
        {
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, _fixture.Url);
            HttpResponseMessage response = await _fixture.Client.SendAsync(request);
            string responseContent = await response.Content.ReadAsStringAsync();

            response.EnsureSuccessStatusCode();
            Assert.Contains("Index page", responseContent);
        }

        [Fact]
        public async Task Can_Read_Values()
        {
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, _fixture.Url + "api/Value");
            HttpResponseMessage response = await _fixture.Client.SendAsync(request);
            JArray responseContent = JArray.Parse(await response.Content.ReadAsStringAsync());
            
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("application/json", response.Content.Headers.ContentType.MediaType);
            Assert.Equal(new JArray("A", "B", "C"), responseContent);
        }
    }
}
