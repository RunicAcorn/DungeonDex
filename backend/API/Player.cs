using System.ComponentModel.DataAnnotations;

namespace API
{
    public class Player
    {
        [Key]
        public int Id { get; set; }
        public Campaign Campaign { get; set; }
        public Character? CurrentCharacter { get; set; }
        public string Name { get; set; }
        
    }
}
