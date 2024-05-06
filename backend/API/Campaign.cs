using API;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


public class Campaign
{
    [Key]
    public int CampaignId { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }
  
    public ApplicationUser User { get; set; }

    public ICollection<Player> Players { get; set; }
    public ICollection<Chapter> Chapters { get; set; }
    public ICollection<Monster> Monsters { get; set; }
    public ICollection<NPC> NPCs { get; set; }

    public ICollection<Quest> Quests { get; set; }
    public ICollection<Location> Locations { get; set; }
    // Default constructor (optional if no initialization logic is needed)
    public Campaign()
    {
        // Initialization logic here (if needed)
    }
}
