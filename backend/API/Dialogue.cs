namespace API
{

  public class Statement
  {
    public string Speaker { get; set; }
    public string Text { get; set; }
  }

  public class Dialogue : Scene
  {

    public List<Statement> Statements { get; set; }


  }
}
