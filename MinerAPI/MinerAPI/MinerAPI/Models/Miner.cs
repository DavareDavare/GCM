namespace MinerAPI.Models
{
    public class Miner
    {
        public int Id { get; set; }
        public string Ip { get; set; }
        public string Group { get; set; }
        public string AdminName { get; set; }
        public string AdminPassword { get; set; }
        public float HashRate { get; set; }

        // Constructor with parameters
        public Miner(string ip, string group, string adminName, string adminPassword)
        {
            Id = 0; // The server will assign an Id
            Ip = ip;
            Group = group;
            AdminName = adminName;
            AdminPassword = adminPassword;
            HashRate = 0;
        }

        // Default constructor
        public Miner()
        {
            // Default values if needed
            Id = 0;
            Ip = "";
            Group = "";
            AdminName = "";
            AdminPassword = "";
            HashRate = 0;
        }

    }

}
