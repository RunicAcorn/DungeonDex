using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API
{

  public class Chapter
  {
    [Key]
    public int ChapterId { get; set; }
    public string Title { get; set; }
    public int Order { get; set; }

    [ForeignKey("Campaign")]
    public int CampaignId { get; set; }
    public Campaign Campaign { get; set; }

    public ICollection<Scene> Scenes { get; set; }
  }
}
