using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using API;

[Route("api/[controller]")]
[ApiController]
public class ChapterController : ControllerBase
{
    private readonly ChapterService _chapterService;
    private readonly ApplicationDbContext _context;

    public ChapterController(ChapterService chapterService, ApplicationDbContext context)
    {
        _chapterService = chapterService;
        _context = context; // Initialize _context here
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpPost]
    public async Task<IActionResult> AddChapter([FromBody] ChapterModel model)
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

            var campaignBelongsToUser = await _context.Campaigns.AnyAsync(c => c.CampaignId == model.CampaignId && c.User.Id == userId);

            if (campaignBelongsToUser)
            {
                try
                {
                    var chapterId = await _chapterService.AddNewChapterAsync(model.CampaignId, model.Title, model.Order);
                    return Ok(new { message = "Chapter added successfully.", id = chapterId });
                }
                catch (ArgumentException ex)
                {
                    return BadRequest(ex.Message);
                }
                catch
                {
                    return StatusCode(500, "An error occurred while adding the chapter.");
                }
            }
        } 
        else
        {
            return BadRequest("User not authenticated.");
        }

        return BadRequest();
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpGet("{campaignId}")]
    public async Task<ActionResult<List<Chapter>>> GetChaptersByCampaign(int campaignId)
    {

        if (User?.Identity?.IsAuthenticated == true)
        {

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User Not authenticated");
            }

            var campaignBelongsToUser = await _context.Campaigns.AnyAsync(c => c.CampaignId == campaignId && c.User.Id == userId);


            if (!campaignBelongsToUser)
            {
                return Forbid(); // Return 403 Forbidden if the campaign doesn't belong to the user
            }


            var chapters = await _chapterService.GetChaptersByCampaignIdAsync(campaignId);


            if (chapters == null || !chapters.Any())
            {
                return NotFound();
            }
            return chapters;
        }
        else
        {
            return BadRequest("User not authenticated.");
        }
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpGet("{campaignId}/latest")]
    public async Task<ActionResult<int>> GetLatestChaptersByCampaign(int campaignId)
    {

        if (User?.Identity?.IsAuthenticated == true)
        {

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User Not authenticated");
            }

            var campaignBelongsToUser = await _context.Campaigns.AnyAsync(c => c.CampaignId == campaignId && c.User.Id == userId);


            if (!campaignBelongsToUser)
            {
                return Forbid(); // Return 403 Forbidden if the campaign doesn't belong to the user
            }


            var lastestChapterNumber = await _chapterService.GetNextChapterOrder(campaignId);

            if (lastestChapterNumber == null )
            {
                
            }
            return Ok(lastestChapterNumber);
        }
        else
        {
            return BadRequest("User not authenticated.");
        }
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpDelete("{campaignId}/{chapterId}")]
    public async Task<IActionResult> DeleteChapter(int campaignId, int chapterId)
    {
        if (User?.Identity?.IsAuthenticated == true)
        {

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;


            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User Not authenticated");
            }

            var campaignBelongsToUser = await _context.Campaigns.AnyAsync(c => c.CampaignId == campaignId && c.User.Id == userId);

            if (!campaignBelongsToUser) { return NotFound(); }
            else
            {


                try
                {
                    await _chapterService.DeleteChapterAsync(campaignId, chapterId);
                    return Ok(new { message = "Chapter deleted successfully." });
                }
                catch (ArgumentException ex)
                {
                    return BadRequest(ex.Message);
                }
                catch
                {
                    return StatusCode(500, "An error occurred while deleting the chapter.");
                }
            }
        } else
        {
            return BadRequest("User not authenticated");
        }
    }
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpPut("{chapterId}")]
    public async Task<IActionResult> UpdateChapter(int chapterId, [FromBody] ChapterModel model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            await _chapterService.UpdateChapterAsync(chapterId, model.Title, model.Order);
            return Ok(new { message = "Chapter updated successfully." });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch
        {
            return StatusCode(500, "An error occurred while updating the chapter.");
        }
    }


}

public class ChapterModel
{
    public int CampaignId { get; set; }
    public string Title { get; set; }
    public int Order { get; set; }
}
