namespace API;

using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using static System.Formats.Asn1.AsnWriter;


    public class SceneService
    {
        private readonly ApplicationDbContext _context;

        public SceneService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> AddNewSceneAsync(int chapterId, string title, string description, int order)
        {
            var chapterExists = await _context.Chapters.AnyAsync(c => c.ChapterId == chapterId);

        if (!chapterExists)
        {
                throw new ArgumentException("The specified chapter does not exist.");
        }

    switch (description.ToUpper())
    {
      default:
        throw new ArgumentException("Invalid type");
      case "NARRATIVE":
        var narrative = new Narrative
        {
          Chapter = await _context.Chapters.FindAsync(chapterId),
          ChapterId = chapterId,
          Title = title,
          Description = description,
          Order = order
        };
        _context.Scenes.Add(narrative);
        await _context.SaveChangesAsync();
        return narrative.Id;
        
      case "DIALOGUE":
        var dialogue = new Dialogue
        {
          Chapter = await _context.Chapters.FindAsync(chapterId),
          ChapterId = chapterId,
          Title = title,
          Description = description,
          Order = order

        };
        _context.Scenes.Add(dialogue);
        await _context.SaveChangesAsync();

        return dialogue.Id;


        case "COMBAT":
        var combat = new Combat
        {
          Chapter = await _context.Chapters.FindAsync(chapterId),
          ChapterId = chapterId,
          Title = title,
          Description = description,
          Order = order
        };
        _context.Scenes.Add(combat);
        await _context.SaveChangesAsync();
        return combat.Id;



    }
   

          
        }

    public async Task<List<Scene>> GetScenesByChapterIdAsync(int chapterId)
    {
    var scenes = await _context.Scenes.OfType<Scene>().ToListAsync();
    Console.WriteLine(scenes);
    return scenes;
  }

    public async Task<int?> GetNextSceneOrder(int chapterId)
    {
        var nextSceneId = await _context.Scenes
            .Where(scene => scene.ChapterId == chapterId)
            .OrderByDescending(scene => scene.Order)
            .Select(scene => scene.Order)
            .FirstOrDefaultAsync();

        return nextSceneId + 1;
    }

    public async Task<Scene> GetSceneByIdAsync(int sceneId)
    {
        var scene = await _context.Scenes.FindAsync(sceneId);

        return scene;
    }

  public async Task UpdateNarrative(Narrative scene, string incomingEvent)
  {

    scene.Events.Add(incomingEvent);
      await _context.SaveChangesAsync();
    }

  public async Task UpdateDialogue(Dialogue scene, Statement[] incomingEvent)
  {
    scene.Statements.AddRange(incomingEvent);
    await _context.SaveChangesAsync();
  }


    public async Task DeleteSceneById(int chapterId, int sceneId)
    {

        var scene = await _context.Scenes.FindAsync(sceneId);

        if (scene == null)
        {
            throw new ArgumentException("The specified scene does not exist.");
        }

        if (scene.ChapterId != chapterId)
        {
            throw new ArgumentException("The specified scene does not belong to the specified chapter.");
        }

        _context.Scenes.Remove(scene);
        await _context.SaveChangesAsync();
    }
    
}
