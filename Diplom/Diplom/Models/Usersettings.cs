namespace Diplom.Models
{
    public class Usersettings
    {
        public string Id { get; set; }

        public bool IsDarkmode { get; set; }
        public string Color { get; set; }
        public string Name { get; set; }
        public byte[]? Image { get; set; }

        public float Strompreis { get; set; }

        public Usersettings()
        {
            Id = "0";
            IsDarkmode = false;
            Color = "#B72626";
            Name = "User";
            Image = null ;
            Strompreis = 0;
        }

        public Usersettings(string Id, bool IsDarkmode, string Color, string Name, byte[]? Image, float Strompreis)
        {
            this.Id = Id;
            this.IsDarkmode = IsDarkmode;
            this.Color = Color;
            this.Name = Name;
            this.Image = Image;
            this.Strompreis = Strompreis;
        }
    }
}
