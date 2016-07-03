using Microsoft.AspNetCore.Hosting;
using Microsoft.DotNet.ProjectModel.Resolution;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CustomSeed.Web.Tests
{
    public class KestrelServerFixture<TStartup> : IDisposable
    {
        private readonly CancellationTokenSource source = new CancellationTokenSource();

        public IWebHost WebHost { get; }
        public string Url { get; } = "http://localhost:5000/";
        public IWebDriver Driver { get; }

        public KestrelServerFixture()
        {
            IWebHostBuilder builder = new WebHostBuilder()
                .UseContentRoot("../../../../../../src/CustomSeed.Web")
                .UseKestrel()
                .UseStartup(typeof(TStartup));

            WebHost = builder.Build();

            Task.Run(() => WebHost.Run(source.Token));

            Driver = new ChromeDriver();
        }

        public void Dispose()
        {
            source.Cancel();

            Driver.Dispose();
        }
    }
}
