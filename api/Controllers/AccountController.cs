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
    public async Task<IActionResult> Put(int accountID, [FromBody] Account value){
    Console.WriteLine("Made it to PUT");

    if (value == null || string.IsNullOrEmpty(value.IsLoggedin))
    {
        return BadRequest("Invalid account data or missing isLoggedin status.");
    }

    Database myDatabase = new();
    await myDatabase.SignIn(accountID, value.IsLoggedin); 
    
    return Ok("Account login status updated successfully");
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
