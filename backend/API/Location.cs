using System.ComponentModel.DataAnnotations;

namespace API
{
    public class Location
    {
        [Key]
        public int Id { get; set; }

        public Campaign Campaign { get; set; }
        public List<Quest> Quests { get; set; }
        public string Plane { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }

    }
}
