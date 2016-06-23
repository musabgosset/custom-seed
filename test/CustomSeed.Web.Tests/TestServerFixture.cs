using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace CustomSeed.Web.Tests
{
    public class TestServerFixture<TStartup> : IDisposable
    {
        private readonly TestServer _server;
        public HttpClient Client { get; }
        
        public TestServerFixture()
        {
            IWebHostBuilder builder = new WebHostBuilder()
                .UseStartup(typeof(TStartup));

            _server = new TestServer(builder);

            Client = _server.CreateClient();
            Client.BaseAddress = new Uri("http://localhost");
        }

        public void Dispose()
        {
            Client.Dispose();
            _server.Dispose();
        }
    }
}
