namespace Diplom.Models
{
    public class Miner
    {
        public string Ip { get; set; }
        public string Group { get; set; }
        public int Id { get; set; }
        public string AdminName { get; set; }
        public string AdminPassword { get; set; }
        public float Hashrate { get; set; }
        public bool IsChecked { get; set; }

        public Miner(string ip, string group, int id, string Username, string Password)
        {
            this.Ip = ip;
            this.Group = group;
            this.Id = id;
            this.AdminName = Username;
            this.AdminPassword = Password;
            this.Hashrate = 0;
        }
    }
}
