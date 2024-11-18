using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Controllers
{

     [Route("api/[controller]")]
    [ApiController]

    public class BidController
    {

          [HttpGet]
    public async Task<List<Data>> Get(){
        Database myDatabase = new();
        return await myDatabase.GetAllData();
    }

    

    }
}