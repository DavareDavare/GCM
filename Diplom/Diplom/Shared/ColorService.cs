
using Newtonsoft.Json;
using System.Text;

namespace Diplom.Shared
{
    public class ColorService
    {
        HttpClient client = new HttpClient();
        public event Action<string> ColorChanged;

        public string SelectedColor = ""; // Default color

        public async Task SetColorAsync(string color)
        {
            SelectedColor = color;
            try
            {
                // Send the new color to the API
                string json = "{\"color\":\"" + color + "\"}";
                Console.WriteLine(json);
                var response = await client.PutAsync("https://localhost:7294/api/User/UpdateColor", new StringContent(json, Encoding.UTF8, "application/json"));
                response.EnsureSuccessStatusCode(); // Ensure the API call is successful
                ColorChanged?.Invoke(SelectedColor); // Notify subscribers that the color has changed
            }
            catch (Exception ex)
            {
                // Handle any errors
                Console.WriteLine(ex.Message);
            }
        }

        public string getColor()
        {
            return SelectedColor;
        }

        public async Task initialColorAsync()
        {
            var s = await client.GetStringAsync("https://localhost:7294/api/User/GetColor");

            // Deserialize the JSON array using Newtonsoft.Json
            string[] colors = JsonConvert.DeserializeObject<string[]>(s);

            // Extract the color value from the array
            SelectedColor = colors[0];

            // Print the selected color
            await Console.Out.WriteLineAsync("Selected Color: " + SelectedColor);
        }

    }
}
