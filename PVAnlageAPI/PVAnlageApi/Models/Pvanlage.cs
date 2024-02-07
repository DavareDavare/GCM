namespace PVAnlageApi.Models
{
    public class Pvanlage
    {
        public int Id { get; set; }
        public float Rate { get; set; }
        public DateTime Timestamp { get; set; }
 

        public Pvanlage(float r, DateTime t)
        {
            Id = 0;
            Rate = r;
            Timestamp = t;
        }
        public Pvanlage()
        {
            Rate = 0;
            Timestamp = new DateTime(2000,1,1);
        }
    }
}
