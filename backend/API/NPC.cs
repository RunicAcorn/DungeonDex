using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



namespace API
{
    public class NPC
    {

        public Campaign Campaign { get; set; }

        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Race { get; set; }
        public int Age { get; set; }
        public string? Description { get; set; }

        public string? Notes { get; set; }


    }
}
