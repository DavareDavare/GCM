using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using PVAnlageApi.Models;

namespace PVAnlageApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StromspeicherController : ControllerBase
    {
        private IMongoCollection<Stromspeicher> _mongoCollection;
        public StromspeicherController()
        {
            string connectionString = "mongodb://localhost:27017";

            // Create a MongoDB client
            var client = new MongoClient(connectionString);

            // Get a reference to the database and collection
            var database = client.GetDatabase("Speicher");
            _mongoCollection = database.GetCollection<Stromspeicher>("SpeicherCollection");
        }

        [HttpGet("GetSpeicher")]
        public ActionResult<IEnumerable<Stromspeicher>> Get()
        {
            var miners = _mongoCollection.Find(_ => true).ToList();
            return Ok(miners);
        }

        [HttpPost("AddSpeicher")]
        public ActionResult<Stromspeicher> Add([FromBody] Stromspeicher speicher)
        {
            try
            {
                var last = _mongoCollection.Find(_ => true).SortByDescending(m => m.Id).FirstOrDefault();

                if (last != null)
                {
                    speicher.Id = last.Id + 1;
                }
                else
                {
                    // If there are no existing miners, set the ID to 1 or any default starting value.
                    speicher.Id = 1;
                }

                _mongoCollection.InsertOne(speicher);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }
    }
}
