using api.Models;
using api;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api.DataBase;

namespace MyApp.Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {

        // GET: api/Account/{accountID}
        [HttpGet("{accountID}", Name = "GetAccountById")]
        public async Task<List<Account>> Get(int accountID)
        {
            Database myDatabase = new();
            return await myDatabase.GetLoggedIn(accountID);
        }


        // GET: api/Account
        [HttpGet(Name = "GetAllAccounts")]
        public async Task<List<Account>> Get()
        {
            Database myDatabase = new();
            return await myDatabase.GetAllAccounts();
        }

        // POST: api/Account
        [HttpPost]
        public async Task Post([FromBody] Account value)
        {
            System.Console.WriteLine(value.FName);
            Database myDatabase = new();
            await myDatabase.InsertAccount(value);
        }

        // PUT: api/Account/{accountID}
        [HttpPut("{accountID}")]
        public async Task Put(int accountID, [FromBody] Account value)
        {
            System.Console.WriteLine("Made it to put");
            Database myDatabase = new();
            await myDatabase.SignIn(accountID);
        }

        // DELETE: api/Account/{accountID}
        [HttpDelete("{accountID}")]
        public async Task Delete(int accountID)
        {
            Database myDatabase = new();
            await myDatabase.DeleteAccount(accountID);
        }
    }
}
