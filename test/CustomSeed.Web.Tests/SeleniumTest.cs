#if NET451
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace CustomSeed.Web.Tests
{
    public class SeleniumTest : IClassFixture<KestrelServerFixture<CustomSeed.Web.Startup>>, IDisposable
    {
        private readonly KestrelServerFixture<CustomSeed.Web.Startup> _fixture;
        private readonly IWebDriver _driver = new ChromeDriver();

        public SeleniumTest(KestrelServerFixture<CustomSeed.Web.Startup> fixture)
        {
            this._fixture = fixture;
        }

        [Fact]
        public void Can_Read_DefaultPage()
        {
            _driver.Navigate().GoToUrl(_fixture.Url);

            Assert.Contains("Index page", _driver.PageSource);
        }

        public void Dispose()
        {
            _driver.Dispose();
        }
    }
}
#endif
