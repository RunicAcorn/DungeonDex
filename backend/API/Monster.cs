using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API
{
    public class Monster
    {
        [Key]
        public int Id { get; set; }    
        public Campaign Campaign { get; set; }
        public string Name { get; set; }
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
