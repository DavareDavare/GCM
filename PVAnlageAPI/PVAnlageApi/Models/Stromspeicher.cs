namespace PVAnlageApi.Models
{
    public class Stromspeicher
    {
        public int Id { get; set; }
        public float PercentValue { get; set; }
        public float Value { get; set; }
        public DateTime Timestamp { get; set; }


        public Stromspeicher(float p, float v, DateTime t)
        {
            Id = 0;
            PercentValue = p;
            Value = v;
            Timestamp = t;
        }
        public Stromspeicher()
        {
            PercentValue = 0;
            Value = 0;
            Timestamp = new DateTime(2000, 1, 1);
        }

    }
}
