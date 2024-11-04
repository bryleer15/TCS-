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

 
    // POST: api/data
    [HttpPost]
    public async Task<IActionResult> Post([FromForm] Data value, IFormFile imageFile){

        if (imageFile != null){
            using var ms = new MemoryStream();
            await imageFile.CopyToAsync(ms);
        }
 
        Database myDatabase = new();
        await myDatabase.InsertData(value);
        return Ok();
    }
 
    // PUT: api/data/{inventoryID}

    [HttpPut("{inventoryID}")]
    public async Task<IActionResult> Put(int inventoryID, [FromForm] Data value){
 
        Database myDatabase = new();
        await myDatabase.UpdateData(value, inventoryID);
        return Ok();

    }
 
    // DELETE: api/data/{inventoryID}

    [HttpDelete("{inventoryID}")]
    public async Task<IActionResult> Delete(int inventoryID){
        Database myDatabase = new();
        await myDatabase.DeleteData(inventoryID);
        return Ok();
    }

}
}