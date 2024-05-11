namespace API
{
  public class MonsterDTO
  {
    public string Name { get; set; }
    public int CampaignId { get; set; }
    public int? Id { get; set; }
    public string Type { get; set; }
    public Alignment Alignment { get; set; }
    public int HitPoints { get; set; }
    public int ArmorClass { get; set; }
    public int Speed { get; set; }
    public int Strength { get; set; }
    public int Dexterity { get; set; }
    public int Constitution { get; set; }
    public int Intelligence { get; set; }
    public int Wisdom { get; set; }
    public int Charisma { get; set; }
  }
}
