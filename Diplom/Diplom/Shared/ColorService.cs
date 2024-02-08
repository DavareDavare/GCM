
using Microsoft.AspNetCore.Components;
using Newtonsoft.Json;
using System.Text;

namespace Diplom.Shared
{
    public class ColorService
    {
        //HTTPClient für HTTPRequests
        HttpClient client = new HttpClient();

        //Das Event
        public event Action<string> ColorChanged;
        //Action ist ein Typ eines Events
        //Wenn Event getriggered wird, werden alle abonnierten Methoden aufgerufen

        //Die benötigte Variable
        public string SelectedColor = "";

        public async Task SetColorAsync(string color)
        {
            SelectedColor = color;
            try
            {
                //Zusammenbau des Bodies für PutRequest
                string json = "{\"color\":\"" + color + "\"}";
                //Put Request
                var response = await client.PutAsync("https://localhost:7294/api/User/UpdateColor", new StringContent(json, Encoding.UTF8, "application/json"));
                //Triggert Event und informiert alle Event Subscriber
                ColorChanged?.Invoke(SelectedColor); 
            }
            catch (Exception ex)
            {
                // Handle any errors
                Console.WriteLine(ex.Message);
            }
        }

        public async Task<string> getColorAsync()
        {
            //Überprüfung ob Farbe bereits geladen ist
            if (SelectedColor.Equals(""))
            {
                //Holt Farbe aus DB
                await initialColorAsync();
            }
            return SelectedColor;
        }

        public async Task initialColorAsync()
        {
            try
            {
                await Task.Delay(500);
                var s = await client.GetStringAsync("https://localhost:7294/api/User/GetColor");

                // Deserialize the JSON array using Newtonsoft.Json
                string[] colors = JsonConvert.DeserializeObject<string[]>(s);

                // Extract the color value from the array
                SelectedColor = colors[0];

                // Print the selected color
                await Console.Out.WriteLineAsync("Selected Color: " + SelectedColor);
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
            }

        }

    }
}
