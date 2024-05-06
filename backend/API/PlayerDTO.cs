namespace API
{
    public class PlayerDTO
    {
       
        public int? Id { get; set; }
        public int CampaignId { get; set; } // Assuming Campaign has an Id property
        public string Name { get; set; }
    }
}
