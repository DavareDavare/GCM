using Microsoft.AspNetCore.Mvc;


namespace HardwareSimulationAPI.Controllers
{
    public class StromspeicherSimulationController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        // generiert random Werte für die Felder Value und Prozentvalue -> ausgegangen wird von einem maximalen Value von 10.000, das muss auf das Wirkliche angepasst werden
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

        // generiert random Werte für das Feld Rate -> ausgegangen wird von einer maximalen Rate von 500, das muss auf das Wirkliche angepasst werden
        [HttpGet("GetSimulationPv")]
        public IActionResult GetPvSimulation()
        {
            var simulatedRate = "";

            Random random = new Random();
            float generatedrate = 0.0f + (float)random.NextDouble() * (500.0f - 0.0f);



            simulatedRate += "[{\"rate\":" + generatedrate +" }]";

            return Ok(simulatedRate);
        }
    }
}
