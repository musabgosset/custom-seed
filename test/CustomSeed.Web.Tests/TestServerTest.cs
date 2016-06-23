
using System;
using System.Collections.Generic;
using System.Linq;
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
        public async Task HttpClientTest()
        {
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, "http://localhost/");

            HttpResponseMessage response = await _fixture.Client.SendAsync(request);

            response.EnsureSuccessStatusCode();
            Assert.Contains("Hello World!", response.Content.ReadAsStringAsync().Result);
        }
    }
}
