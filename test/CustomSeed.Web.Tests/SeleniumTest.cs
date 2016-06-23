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
    public class FirstTest2 : IClassFixture<KestrelServerFixture<CustomSeed.Web.Startup>>
    {
        private readonly KestrelServerFixture<CustomSeed.Web.Startup> _fixture;

        public FirstTest2(KestrelServerFixture<CustomSeed.Web.Startup> fixture)
        {
            this._fixture = fixture;
        }

        [Fact]
        public void SeleniumTest()
        {
            using (IWebDriver driver = new ChromeDriver())
            {
                driver.Navigate().GoToUrl(_fixture.Url);
                Assert.Contains("Hello World!", driver.PageSource);
            }
        }
    }
}
#endif
