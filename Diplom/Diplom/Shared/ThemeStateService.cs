using Microsoft.AspNetCore.Components;
using System;
using System.Text;

public class ThemeStateService
{
    private static readonly HttpClient client = new HttpClient();
    public bool UseDarkTheme { get; set; }

    public event Action OnChange;

    public async Task ToggleThemeAsync()
    {
        try
        {
            UseDarkTheme = !UseDarkTheme;
            var response = await client.PutAsync("https://localhost:7294/api/User/UpdateIsDarkmode", new StringContent(UseDarkTheme.ToString().ToLower(), Encoding.UTF8, "application/json"));
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
                NotifyStateChanged();
            }
            else
            {
                UseDarkTheme = false;
                NotifyStateChanged();
            }

            await Console.Out.WriteLineAsync("AUSGABE: " + UseDarkTheme);
        }
        catch (Exception ex)
        {
            await Console.Out.WriteLineAsync(ex.Message);
        }
        
    }

    public void NotifyStateChanged() => OnChange?.Invoke();
}
