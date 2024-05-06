using System.ComponentModel.DataAnnotations;

namespace API
{
    public class Quest
    {
        [Key]
        public int Id { get; set; }

        public Campaign Campaign { get; set; }

        public NPC QuestGiver { get; set;}
        public string Name { get; set; }
        public string Objective { get; set; }
        public string Reward { get; set; }
        

        public Location StartLocation
        {
            get; set;
        }
    }
}
