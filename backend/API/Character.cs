using System.ComponentModel.DataAnnotations;

namespace API
{
    public class Character
    {
        [Key]
        public int Id { get; set; }
        public Campaign Campaign { get; set; }
        
        public Player? OwnedBy  { get; set; }
        public int? OwnedById { get; set; } // This is a nullable foreign key property

        public required string Name { get; set; }
        public required string Race { get; set; }
        public string? Class { get; set; }
        public int Level { get; set; }
        public int Strength { get; set; }
        public int Dexterity { get; set; }
        public int Constitution { get; set; }
        public int Intelligence { get; set; }
        public int Wisdom { get; set; }
        public int Charisma { get; set; }
        public int HitPoints { get; set; }
        public required Alignment Alignment { get; set; }
        public List<string>? Equipment { get; set; }
        public List<string>? Spells { get; set; }

    }
}
