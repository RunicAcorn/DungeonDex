using System.ComponentModel.DataAnnotations;

namespace API
{

  public class Statement
  {
    [Key]
    public int Id { get; set; }
    public string Speaker { get; set; }
    public string Text { get; set; }
    public int Order { get; set; }

  }

  public class Dialogue : Scene
  {

    public List<Statement>? Statements { get; set; } = new List<Statement>();


  }
}
