namespace API
{
  public class Combat : Scene
  {
    public List<Monster> monstersToFight { get; set; }
    public List<Player> playersInCombat { get; set; }
    public List<string> combatLog { get; set; }

  }
}
