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

    //       [HttpGet]
    // public async Task<List<Data>> Get(){
    //     Database myDatabase = new();
    //     return await myDatabase.GetAllData();
    // }

         

    [HttpPost]
        public async Task Post([FromBody] Bid value)
        {
          
            Database myDatabase = new();
            await myDatabase.InsertBid(value);
        }




    }
}