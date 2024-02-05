using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MinerAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MinerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MinerController : ControllerBase
    {
        private IMongoCollection<Miner> _minerCollection;

        public MinerController()
        {
            // Set up your MongoDB connection string
            string connectionString = "mongodb://localhost:27017";

            // Create a MongoDB client
            var client = new MongoClient(connectionString);

            // Get a reference to the database and collection
            var database = client.GetDatabase("Miners");
            _minerCollection = database.GetCollection<Miner>("MinerCollection");
        }

        [HttpGet("GetMiner")]
        public ActionResult<IEnumerable<Miner>> Get()
        {
            var miners = _minerCollection.Find(_ => true).ToList();
            return Ok(miners);
        }

        [HttpPost("AddMiner")]
        public ActionResult<Miner> AddMiner([FromBody] Miner newMiner)
        {
            try
            {
                var lastMiner = _minerCollection.Find(_ => true).SortByDescending(m => m.Id).FirstOrDefault();

                if (lastMiner != null)
                {
                    newMiner.Id = lastMiner.Id + 1;
                }
                else
                {
                    // If there are no existing miners, set the ID to 1 or any default starting value.
                    newMiner.Id = 1;
                }

                _minerCollection.InsertOne(newMiner);
                return CreatedAtAction(nameof(Get), new { id = newMiner.Id }, newMiner);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }


        [HttpPut("UpdateHashrate")]
        public ActionResult UpdateHashrate([FromBody] HashrateUpdateRequest updateRequest)
        {
            try
            {
                foreach (int id in updateRequest.Ids)
                {
                    var filter = Builders<Miner>.Filter.Eq(m => m.Id, id);
                    var update = Builders<Miner>.Update.Set(m => m.HashRate, updateRequest.HashRate);

                    _minerCollection.UpdateOne(filter, update);
                }

                return Ok("Hashrates updated successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpPut("UpdateAllHashrates")]
        public ActionResult UpdateAllHashrates([FromBody] float hashrate)
        {
            var miners = _minerCollection.Find(_ => true).ToList();
            try
            {
                foreach (Miner miner in miners)
                {
                    var filter = Builders<Miner>.Filter.Eq(m => m.Id, miner.Id);
                    var update = Builders<Miner>.Update.Set(m => m.HashRate, hashrate);

                    _minerCollection.UpdateOne(filter, update);
                }

                return Ok("Hashrates updated successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }



        [HttpDelete("DeleteMiners")]
        public ActionResult DeleteMiners([FromBody] List<int> ids)
        {
            try
            {
                var filter = Builders<Miner>.Filter.In(m => m.Id, ids);
                _minerCollection.DeleteMany(filter);

                return Ok("Miners deleted successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }
    }
}




public class HashrateUpdateRequest
    {
        public float HashRate { get; set; }
        public List<int> Ids { get; set; }
    }
