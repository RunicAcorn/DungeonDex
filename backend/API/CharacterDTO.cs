namespace API
{
    public class CharacterDTO
    {
        public int Id { get; set; }
        public int CampaignId { get; set; } // Assuming Campaign has an Id property
        public string Name { get; set; }
        public string Race { get; set; }
        public string Class { get; set; }
        public Alignment Alignment { get; set; }
        public int Level { get; set; }
        public int Strength { get; set; }
        public int Dexterity { get; set; }
        public int Constitution { get; set; }
        public int Intelligence { get; set; }
        public int Wisdom { get; set; }
        public int Charisma { get; set; }
        public int HitPoints { get; set; }
    }
}
