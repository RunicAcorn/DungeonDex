using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace API
{

    [Route("api/[controller]")]
    [ApiController]
    public class SceneController : ControllerBase
    {
        private readonly SceneService _sceneService;
        private readonly ApplicationDbContext _context;

        public SceneController(SceneService sceneService, ApplicationDbContext context)
        {
            _sceneService = sceneService;
            _context = context; // Initialize _context here
        }

        public class SceneModel
        {
            public int ChapterId { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public int Order { get; set; }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        public async Task<IActionResult> AddScene([FromBody] SceneModel model)
        {

            if (User?.Identity?.IsAuthenticated == true)
            {

                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                //Auth checking
                if (string.IsNullOrEmpty(userId))
                {
                    return BadRequest("User Not authenticated");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                try
                {
                    var sceneId = await _sceneService.AddNewSceneAsync(model.ChapterId, model.Title, model.Description, model.Order);
                    return Ok(new { message = "Scene added successfully.", id = sceneId });
                }
                catch (ArgumentException ex)
                {
                    return BadRequest(ex.Message);
                }
                catch
                {
                    return StatusCode(500, "An error occurred while adding the scene.");
                }
                
            }
            else
            {
                return BadRequest("User Not authenticated");
            }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("{chapterId}/latest")]
        public async Task<ActionResult<int>> GetLatestChaptersByCampaign(int chapterId)
        {

            if (User?.Identity?.IsAuthenticated == true)
            {

                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(userId))
                {
                    return BadRequest("User Not authenticated");
                }

                var sceneBelongsToChapter = await _context.Chapters.AnyAsync(c => c.ChapterId == chapterId);


                if (!sceneBelongsToChapter)
                {
                    return Forbid(); // Return 403 Forbidden if the campaign doesn't belong to the user
                }


                var lastestSceneNumber = await _sceneService.GetNextSceneOrder(chapterId);

                if (lastestSceneNumber == null)
                {
                    return NotFound();
                }
                return Ok(lastestSceneNumber);
            }
            else
            {
                return BadRequest("User not authenticated.");
            }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("{chapterId}")]
        public async Task<ActionResult<List<Scene>>> GetScenesByChapter(int chapterId)
        {

            if (User?.Identity?.IsAuthenticated == true)
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var chapterBelongsToUser = await _context.Chapters.AnyAsync(c => c.ChapterId == chapterId && c.Campaign.User.Id == userId);

                if (chapterBelongsToUser)
                {
                    var scenes = await _sceneService.GetScenesByChapterIdAsync(chapterId);
                    return Ok(scenes);
                }
                else
                {
                    return BadRequest("Chapter does not belong to user.");
                }
            }
            else
            {
                return BadRequest("User not authenticated.");
            }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("scene/{sceneId}")]
        public async Task<ActionResult<Scene>> GetSceneById(int sceneId)
        {
            if (User?.Identity?.IsAuthenticated == true)
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var scene = await _context.Scenes.FindAsync(sceneId);
                if (scene == null)
                {
                    return NotFound("Scene not found.");
                }

                var campId = await _context.Chapters.Where(c => c.ChapterId == scene.ChapterId).Select(c => c.CampaignId).FirstOrDefaultAsync();
                var sceneBelongsToUser = await _context.Campaigns.AnyAsync(c => c.CampaignId == campId && c.User.Id == userId);
               

                if (sceneBelongsToUser)
                {
                    return Ok(scene);
                }
                else
                {
                    return BadRequest("Scene does not belong to user.");
                }
            }
            else
            {
                return BadRequest("User not authenticated.");
            }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("{chapterId}/{sceneId}")]
        public async Task<IActionResult> DeleteScene(int chapterId, int sceneId)
        {
            if (User?.Identity?.IsAuthenticated == true)
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                var chapterBelongsToUser = await _context.Chapters
                    .Include(c => c.Campaign) // Include the related Campaign data
                    .AnyAsync(c => c.ChapterId == chapterId && c.Campaign.User.Id == userId);

                if (chapterBelongsToUser)
                {
                    try
                    {
                        await _sceneService.DeleteSceneById(chapterId, sceneId);
                        return Ok( new { message = "Scene deleted successfully." });
                    }
                    catch (ArgumentException ex)
                    {
                        return BadRequest(ex.Message);
                    }
                    catch
                    {
                        return StatusCode(500, "An error occurred while deleting the scene.");
                    }
                }
                else
                {
                    return BadRequest("Chapter does not belong to user.");
                }
            }
            else
            {
                return BadRequest("User not authenticated.");
            }
        }

    }
}
