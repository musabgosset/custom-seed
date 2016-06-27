#if NET451
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
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

            Assert.Contains("ng: active", _driver.PageSource);
        }

        [Theory(DisplayName = "Page accessible")]
        [InlineData("", "Index page")]
        [InlineData("#/login", "Login")]
        public void Page_Accessible(string url, string title)
        {
            _driver.Navigate().GoToUrl(_fixture.Url + url);
            string text = _driver.FindElement(By.TagName("body")).Text;

            Assert.Contains(title, text);
        }

        [Fact]
        public void Can_Read_Translation()
        {
            _driver.Navigate().GoToUrl(_fixture.Url);

            Assert.Contains("translated", _driver.PageSource);
        }

        [Fact]
        public void Can_Read_Component()
        {
            _driver.Navigate().GoToUrl(_fixture.Url);
            IWebElement firstComponent = _driver.FindElement(By.TagName("first-component"));

            WebDriverWait wait = new WebDriverWait(_driver, TimeSpan.FromSeconds(2));

            wait.Until(d => firstComponent.Text.Contains("First component (with transclusion)"));
        }

        [Fact]
        public void AngularJS_Is_Active()
        {
            _driver.Navigate().GoToUrl(_fixture.Url);

            Assert.Contains("ng: active", _driver.PageSource);
        }

        public void Dispose()
        {
            _driver.Dispose();
        }
    }
}
#endif
