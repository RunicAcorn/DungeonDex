using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API
{

  public class Statement
  {
    [Key]
    public int Id { get; set; }
    public string Speaker { get; set; }
    public string Text { get; set; }
    public int Order { get; set; }


    [ForeignKey("Dialogue")]
    public int DialogueId { get; set; }
    public Dialogue Dialogue { get; set; }

  }

  public class Dialogue : Scene
  {

    public List<Statement>? Statements { get; set; } = new List<Statement>();


  }
}
