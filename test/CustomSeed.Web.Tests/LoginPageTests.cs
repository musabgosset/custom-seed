using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace CustomSeed.Web.Tests
{
    public class LoginPageTests : IClassFixture<KestrelServerFixture<CustomSeed.Web.Startup>>, IDisposable
    {
        private readonly KestrelServerFixture<CustomSeed.Web.Startup> _fixture;
        private readonly WebDriverWait _wait;
        private readonly IWebDriver _driver;

        private const string resourceUrl = "#/resource";
        private const string loginUrl = "#/login";
        private const string homeUrl = "#/";
        private const string username = "Me";
        private const string validPassword = "MyPassword";
        private const string invalidPassword = "WrongPassword";

        private IWebElement UsernameInput => _driver.FindElement(By.Name("username"));
        private IWebElement PasswordInput => _driver.FindElement(By.Name("password"));
        private IWebElement SubmitButton => _driver.FindElement(By.CssSelector("button[type='submit']"));
        private void GoToUrl(string url) => _driver.Navigate().GoToUrl(_fixture.Url + url);
        private void WaitForUrl(string url) => _wait.Until(d => _driver.Url == _fixture.Url + url);
        
        public LoginPageTests(KestrelServerFixture<CustomSeed.Web.Startup> fixture)
        {
            this._fixture = fixture;
            this._driver = fixture.Driver;
            this._wait = new WebDriverWait(_driver, TimeSpan.FromSeconds(2));
        }

        [Fact(DisplayName = "Visitor can reach the login page")]
        public void AnonymousUser_CanReach()
        {
            GoToUrl(loginUrl);
            IWebElement page = _driver.FindElement(By.TagName("login-page"));

            _wait.Until(d => page.Text.Contains("Login"));
        }

        [Fact(DisplayName = "Visitor can sign in with valid credentials")]
        public void CanSignIn_WithValidCredentials()
        {
            GoToUrl(loginUrl);

            UsernameInput.SendKeys(username);
            PasswordInput.SendKeys(validPassword);
            SubmitButton.Click();

            WaitForUrl(homeUrl);
        }

        [Fact(DisplayName = "Visitor cannot sign in with invalid credentials")]
        public void CannotSignIn_WithInvalidCredentials()
        {
            GoToUrl(loginUrl);
            IWebElement page = _driver.FindElement(By.TagName("login-page"));

            UsernameInput.SendKeys(username);
            PasswordInput.SendKeys(invalidPassword);
            SubmitButton.Click();

            _wait.Until(d => page.Text.Contains("Nom d'utilisateur ou mot de passe incorrect"));
            Assert.Equal(_fixture.Url + loginUrl, _driver.Url);
        }

        [Fact(DisplayName = "User is redirected when a return URL is supplied")]
        public void OnSignIn_RedirectionIsPerformed()
        {
            GoToUrl(loginUrl + "?returnUrl=%2Fresource");

            UsernameInput.SendKeys(username);
            PasswordInput.SendKeys(validPassword);
            SubmitButton.Click();

            WaitForUrl(resourceUrl);
        }

        [Fact(DisplayName = "User is redirected if already logged")]
        public void User_IsRedirectedIfAlreadyLogged()
        {
            GoToUrl(loginUrl);

            UsernameInput.SendKeys(username);
            PasswordInput.SendKeys(validPassword);
            SubmitButton.Click();

            WaitForUrl(homeUrl);

            GoToUrl(loginUrl);

            WaitForUrl(homeUrl);
        }

        [Fact(DisplayName = "Visitor is redirected from secured page")]
        public void Visitor_IsRedirectedFromSecuredPage()
        {
            GoToUrl(resourceUrl);

            WaitForUrl(loginUrl + "?returnUrl=%2Fresource");
        }

        public void Dispose()
        {
            _driver.Manage().Cookies.DeleteAllCookies();
        }
    }
}
