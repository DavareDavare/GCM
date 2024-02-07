using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using PVAnlageApi.Models;

namespace PVAnlageApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PvanlageController : Controller
    {
        private IMongoCollection<Pvanlage> _mongoCollection;


        public PvanlageController() {
            string connectionString = "mongodb://localhost:27017";
            var client = new MongoClient(connectionString);

            var database = client.GetDatabase("PV");
            _mongoCollection = database.GetCollection<Pvanlage>("PVCollection");

        }
        [HttpGet("GetPv")]
        public ActionResult<IEnumerable<Pvanlage>> Get()
        {
            var pv = _mongoCollection.Find(_ => true).ToList();
            return Ok(pv);
        }

        [HttpPost("AddPv")]
        public ActionResult<Pvanlage> Add([FromBody] Pvanlage pv)
        {
            try
            {
                var last = _mongoCollection.Find(_ => true).SortByDescending(m => m.Id).FirstOrDefault();

                if (last != null)
                {
                    pv.Id = last.Id + 1;
                }
                else
                {
                    // If there are no existing miners, set the ID to 1 or any default starting value.
                    pv.Id = 1;
                }

                _mongoCollection.InsertOne(pv);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }


    }
}
