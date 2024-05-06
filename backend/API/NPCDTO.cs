using System.ComponentModel.DataAnnotations;

namespace API
{
    public class NPCDTO
    {
   
        public int? Id { get; set; }
        public int campaignId { get; set; }
        public string Name { get; set; }
        public string Race { get; set; }
        public int Age { get; set; }
        public string? Description { get; set; }

        public string? Notes { get; set; }

    }
}
