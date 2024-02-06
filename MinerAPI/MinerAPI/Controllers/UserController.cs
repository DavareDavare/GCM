using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MinerAPI.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;

namespace MinerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMongoCollection<Usersettings> _userController;

        public UserController()
        {
            // Set up your MongoDB connection string
            string connectionString = "mongodb://localhost:27017";

            // Create a MongoDB client
            var client = new MongoClient(connectionString);

            // Get a reference to the database and collection
            var database = client.GetDatabase("Miners");
            _userController = database.GetCollection<Usersettings>("UsersettingsCollection");
        }

        [HttpGet("GetSettings")]
        public ActionResult<IEnumerable<Usersettings>> Get()
        {
            var settings = _userController.Find(_ => true).ToList();
            return Ok(settings);
        }

        [HttpGet("GetImage")]
        public ActionResult<IEnumerable<byte[]>> GetImage()
        {
            IEnumerable<byte[]> images = _userController.Find(u => true).ToList().Select(user => user.Image);
            return Ok(images);
        }

        [HttpGet("GetColor")]
        public ActionResult<IEnumerable<byte[]>> GetColor()
        {
            IEnumerable<string> color = _userController.Find(u => true).ToList().Select(user => user.Color);
            return Ok(color);
        }

        [HttpGet("GetIsDarkmode")]
        public ActionResult<IEnumerable<bool>> GetIsDarkmode()
        {
            IEnumerable<bool> isDarkmode = _userController.Find(u => true).ToList().Select(user => user.IsDarkmode);
            return Ok(isDarkmode);
        }

        [HttpGet("GetStrompreis")]
        public ActionResult<IEnumerable<float>> GetStrompreis()
        {
            IEnumerable<float> strompreis = _userController.Find(u => true).ToList().Select(user => user.Strompreis);
            return Ok(strompreis);
        }

        [HttpGet("GetName")]
        public ActionResult<IEnumerable<string>> GetName()
        {
            IEnumerable<string> name = _userController.Find(u => true).ToList().Select(user => user.Name);
            return Ok(name);
        }

        [HttpPost("CreateInitial")]
        public ActionResult<IEnumerable<string>> Initial()
        {
            try
            {
                var settings = new Usersettings();
                _userController.InsertOne(settings);
                return CreatedAtAction(nameof(Get), settings);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpPut("UpdateColor")]
        public ActionResult UpdateColor([FromBody] ColorUpdateRequest request)
        {
            var settings = _userController.Find(_ => true).ToList();
            try
            {
                var filter = Builders<Usersettings>.Filter.Eq(s => s.Id, settings[0].Id);
                var update = Builders<Usersettings>.Update.Set(s => s.Color, request.Color);

                _userController.UpdateOne(filter, update);

                return Ok("Color updated successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpPut("UpdateIsDarkmode")]
        public ActionResult UpdateIsDarkmode([FromBody] bool isDarkmode)
        {
            var settings = _userController.Find(_ => true).ToList();
            try
            {
                var filter = Builders<Usersettings>.Filter.Eq(s => s.Id, settings[0].Id);
                var update = Builders<Usersettings>.Update.Set(s => s.IsDarkmode, isDarkmode);

                _userController.UpdateOne(filter, update);

                return Ok("IsDarkmode updated successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpPut("UpdateStrompreis")]
        public ActionResult UpdateStrompreis([FromBody] float strompreis)
        {
            var settings = _userController.Find(_ => true).ToList();
            try
            {
                var filter = Builders<Usersettings>.Filter.Eq(s => s.Id, settings[0].Id);
                var update = Builders<Usersettings>.Update.Set(s => s.Strompreis, strompreis);

                _userController.UpdateOne(filter, update);

                return Ok("Strompreis updated successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpPut("UpdateName")]
        public ActionResult UpdateName([FromBody] string name)
        {
            var settings = _userController.Find(_ => true).ToList();
            try
            {
                var filter = Builders<Usersettings>.Filter.Eq(s => s.Id, settings[0].Id);
                var update = Builders<Usersettings>.Update.Set(s => s.Name, name);

                _userController.UpdateOne(filter, update);

                return Ok("Name updated successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpPut("UpdateImage")]
        public ActionResult UpdateImage([FromBody] string image)
        {
            try
            {
                var settings = _userController.Find(_ => true).FirstOrDefault();

                if (settings == null)
                {
                    return NotFound("User settings not found.");
                }

                // Convert base64 string to byte array
                byte[] imageData = Convert.FromBase64String(image);

                var filter = Builders<Usersettings>.Filter.Eq(s => s.Id, settings.Id);
                var update = Builders<Usersettings>.Update.Set(s => s.Image, imageData);

                _userController.UpdateOne(filter, update);

                return Ok("Image updated successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }


        public class ColorUpdateRequest
        {
            public string Color { get; set; }
        }

    }

}
