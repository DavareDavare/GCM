using Microsoft.AspNetCore.Mvc;


namespace HardwareSimulationAPI.Controllers
{
    public class StromspeicherSimulationController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        // muss hier noch Werte generieren
        [HttpGet("GetSimulation")]
        public IActionResult GetStromSimulation()
        {
            var simulatedValue = "";

            Random random = new Random();
            float generatedValue = 0.0f + (float)random.NextDouble() * (10000.0f - 0.0f);
            
            float percentValue =100/10000.0f * generatedValue;


            simulatedValue+= "[{\"value\":"+generatedValue+ " ,\"percentValue\":"+percentValue+" }]";

            return Ok(simulatedValue);
        }
    }
}
