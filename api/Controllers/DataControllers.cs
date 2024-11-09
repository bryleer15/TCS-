using api.Models;
using api;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api.DataBase;
 
namespace MyApp.Namespace
{



[Route("api/[controller]")]

[ApiController]

    public class DataController : ControllerBase
    {

    // GET: api/data

    [HttpGet]
    public async Task<List<Data>> Get(){
        Database myDatabase = new();
        return await myDatabase.GetAllData();
    }
 
    [HttpGet("{inventoryID}", Name = "Get")]
public async Task<ActionResult<Data>> Get(int inventoryID)
{
    Database myDatabase = new();
    try
    {
        var result = await myDatabase.GetData(inventoryID);
        if (result == null)
        {
            return NotFound();
        }
        return Ok(result);
    }
    catch (Exception ex)
    {
        // Log the error if a logging system is in place
        return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database.");
    }
}


 
    [HttpPost]
        public async Task Post([FromBody] Account value)
        {
            System.Console.WriteLine(value.FName);
            Database myDatabase = new();
            await myDatabase.InsertAccount(value);
        }
 


    [HttpPut("{inventoryID}")]
    public async Task<IActionResult> Put(int inventoryID, [FromForm] Data value){
 
        Database myDatabase = new();
        await myDatabase.UpdateData(value, inventoryID);
        return Ok();

    }
 

    [HttpDelete("{inventoryID}")]
    public async Task<IActionResult> Delete(int inventoryID){
        Database myDatabase = new();
        await myDatabase.DeleteData(inventoryID);
        return Ok();
    }

}
}