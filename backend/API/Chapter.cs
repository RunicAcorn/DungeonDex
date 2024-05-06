using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Chapter
{
    [Key]
    public int ChapterId { get; set; }
    public string Title { get; set; }
    public int Order { get; set; }

    [ForeignKey("Campaign")]
    public int CampaignId { get; set; }
    public Campaign Campaign { get; set; }

    public ICollection<API.Scene> Scenes { get; set; }
}