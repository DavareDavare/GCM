using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using SharpCompress.Common;

namespace MinerAPI.Models
{
    public class Usersettings
    {

        [BsonId]
        [BsonIgnoreIfDefault]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public bool IsDarkmode { get; set; }
        public string Color { get; set; }
        public string Name { get; set; }
        public byte[]? Image { get; set; }

        public float Strompreis { get; set; }

        public Usersettings()
        {
            IsDarkmode = false;
            Color = "#B72626";
            Name = "User";
            Image = File.ReadAllBytes("./baseicon.png"); ;
            Strompreis = 0;
        }

        public Usersettings(bool IsDarkmode, string Color, string Name, byte[]? Image, float Strompreis)
        {
            this.IsDarkmode = IsDarkmode;
            this.Color = Color;
            this.Name = Name;
            this.Image = Image;
            this.Strompreis = Strompreis;
        }
    }
}
