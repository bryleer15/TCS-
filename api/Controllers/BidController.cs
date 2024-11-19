using api.Models;
using api;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api.DataBase;

namespace api.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class BidController : ControllerBase
    {


          [HttpPut("{inventoryID}")]
    public async Task Put(int inventoryID, [FromBody] Bid value){
        System.Console.WriteLine("made to put");
        Database myDatabase = new();
        await myDatabase.UpdateBid(value, inventoryID);
    }



    [HttpPost]
        public async Task Post([FromBody] Bid value)
        {
          
            Database myDatabase = new();
            await myDatabase.InsertBid(value);
        }


    }
}