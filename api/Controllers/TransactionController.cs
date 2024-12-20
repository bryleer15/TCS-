using api.Models;
using api;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api.DataBase;

namespace api.Controllers
{
     [Route("api/[controller]")]
        [ApiController]
    public class TransactionController : ControllerBase
    {

    [HttpGet]
    public async Task<List<Transaction>> Get(){
        Database myDatabase = new();
        return await myDatabase.GetAllTransactions();
    }
     [HttpGet("{accountID}")]
        public async Task<List<Transaction>> Get(int accountID)
        {
            Database myDatabase = new();
            return await myDatabase.GetAccountTransaction(accountID);
        }

        [HttpPost]
    public async Task<IActionResult> Post([FromBody] Transaction value){
    try
    {
        Database myDatabase = new();
        await myDatabase.InsertTransaction(value);
        return Ok(new { message = "Transaction successfully inserted." });
    }
    catch (Exception ex)
    {
        // Log the error (optional)
        Console.WriteLine($"Error: {ex.Message}");
        return StatusCode(500, new { message = "An error occurred while processing the transaction.", error = ex.Message });
    }
}

    }
}