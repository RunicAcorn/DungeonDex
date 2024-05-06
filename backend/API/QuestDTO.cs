namespace API
{
    public class QuestDTO
    {
        public int? Id { get; set; }
        public int CampaignId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Objective { get; set; }
        public string StartLocation { get; set; }
    }
}
