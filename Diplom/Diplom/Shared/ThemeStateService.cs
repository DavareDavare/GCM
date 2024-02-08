using Microsoft.AspNetCore.Components;
using System;
using System.Text;

public class ThemeStateService
{
    //HTTPClient für HTTPRequests
    private static readonly HttpClient client = new HttpClient();

    //Die benötigte Variable
    public bool UseDarkTheme { get; set; }

    //Das Event
    public event Action OnChange;

    public async Task ToggleThemeAsync()
    {
        try
        {
            //Theme Switch
            UseDarkTheme = !UseDarkTheme;
            
            //Datenbank Update
            var response = await client.PutAsync("https://localhost:7294/api/User/UpdateIsDarkmode", new StringContent(UseDarkTheme.ToString().ToLower(), Encoding.UTF8, "application/json"));
            
            //Event Aufruf
            NotifyStateChanged();
        }
        catch (Exception ex)
        {
            await Console.Out.WriteLineAsync(ex.Message);
        }
        
    }

    public async Task Initialize()
    {
        try
        {
            var responseString = await client.GetStringAsync("https://localhost:7294/api/User/GetIsDarkMode");
            await Console.Out.WriteLineAsync(responseString);

            if (responseString.Contains("true"))
            {
                UseDarkTheme = true;
            }
            else
            {
                UseDarkTheme = false;
            }

            NotifyStateChanged();
            await Console.Out.WriteLineAsync("AUSGABE: " + UseDarkTheme);
        }
        catch (Exception ex)
        {
            await Console.Out.WriteLineAsync(ex.Message);
        }
        
    }

    //Triggert Event und informiert alle Event Subscriber
    public void NotifyStateChanged() => OnChange?.Invoke();
    // Null Check mit '?' benötigt, falls es keine Subs. gibt
}
