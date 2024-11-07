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

    // GET: api/Account

    [HttpGet]
        public async Task<List<Account>> Get()
        {
            Database myDatabase = new();
            return await myDatabase.GetLoggedIn();
        }



    [HttpPost]
        public async Task Post([FromBody] Account value)
        {
            System.Console.WriteLine(value.FName);
            Database myDatabase = new();
            await myDatabase.InsertAccount(value);
        }
 


    // [HttpPut]
    // public async Task<IActionResult> Put(int inventoryID, [FromForm] Data value){
 
    //     Database myDatabase = new();
    //     await myDatabase.UpdateData(value, inventoryID);
    //     return Ok();

    // }


    // [HttpDelete]
    // public async Task<IActionResult> Delete(int inventoryID){
    //     Database myDatabase = new();
    //     await myDatabase.DeleteData(inventoryID);
    //     return Ok();
    // }

}
}