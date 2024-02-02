using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MinerAPI.Models;

namespace MinerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MinerController : ControllerBase
    {
        private static List<Miner> miners = new List<Miner>
        {
            new Miner { Id = 1, Ip = "192.168.2.5", Group = "Haus", AdminName = "Admin", AdminPassword = "123" },
            new Miner { Id = 2, Ip = "192.168.2.5", Group = "Haus", AdminName = "Admin", AdminPassword = "123" },
        };

        [HttpGet("GetMiner")]
        public ActionResult<IEnumerable<Miner>> Get()
        {
            return Ok(miners);
        }

        [HttpPost("AddMiner")]
        public ActionResult<Miner> AddMiner([FromBody] Miner newMiner)
        {
            try
            {
                // Use the updated constructor without the Id parameter
                var minerToAdd = new Miner(newMiner.Ip, newMiner.Group, newMiner.AdminName, newMiner.AdminPassword);

                // Simulate adding the new miner to the list
                minerToAdd.Id = miners.Count + 1;
                miners.Add(minerToAdd);

                // Return the newly added miner
                return CreatedAtAction(nameof(Get), new { id = minerToAdd.Id }, minerToAdd);
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
                    var minerToUpdate = miners.FirstOrDefault(m => m.Id == id);

                    if (minerToUpdate != null)
                    {
                        minerToUpdate.HashRate = updateRequest.HashRate;
                    }
                    else
                    {
                        return NotFound($"Miner with Id {id} not found.");
                    }
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
                foreach (int id in ids)
                {
                    var minerToRemove = miners.FirstOrDefault(m => m.Id == id);

                    if (minerToRemove != null)
                    {
                        miners.Remove(minerToRemove);
                    }
                    else
                    {
                        return NotFound($"Miner with Id {id} not found.");
                    }
                }

                return Ok("Miners deleted successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

    }

    public class HashrateUpdateRequest
    {
        public float HashRate { get; set; }
        public List<int> Ids { get; set; }
    }
}
