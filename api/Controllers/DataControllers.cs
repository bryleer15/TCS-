using api.Models;
using api;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
 
namespace MyApp.Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private static List<Data> MyData = [];
 
        // GET: api/todo
        [HttpGet]
        public List<Data> Get()
        {
            DataFileHandler myDataFileHandler = new DataFileHandler();
            return myDataFileHandler.GetAllData();
        }
 
        // POST: api/toDo
        [HttpPost]
        public void Post([FromBody] Data myData)
        {
            System.Console.WriteLine(myData.FirstName);
        }
    }
}
 