using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace API


{
    public class Scene
    {

        public Scene()
        {
        }
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        public int Order { get; set; }

        [ForeignKey("Chapter")]
        public int ChapterId { get; set; }
        public Chapter Chapter { get; set; }
    }
}
