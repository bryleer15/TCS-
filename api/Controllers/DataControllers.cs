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
        public async Task<List<Data>> Get()
        {
            Database myDatabase = new();
            return await myDatabase.GetAllData();
        }
 
         // GET: api/recipe/{id}
        [HttpGet("{inventoryID}", Name = "Get")]
        public async Task<List<Data>> Get(int inventoryID)
        {
            Database myDatabase = new();
            return await myDatabase.GetData(inventoryID);
        }
 
        // POST: api/recipe
        [HttpPost]
        public async Task Post([FromBody] Data value)
        {
            Database myDatabase = new();
            await myDatabase.InsertData(value);
        }
 
        [HttpDelete("{inventoryID}")]
        public async Task Delete(int inventoryID)
        {
            Database myDatabase = new();
            await myDatabase.DeleteData(inventoryID);
         
        }
 
         [HttpPut("{inventoryID}")]
        public async Task Put(int inventoryID, [FromBody] Data value)
        {
            System.Console.WriteLine("Made it to put");
            Database myDatabase = new();
            await myDatabase.UpdateData(value, inventoryID);
        }
    }
}
 