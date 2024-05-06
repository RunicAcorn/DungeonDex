using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestController : ControllerBase
    {
        private readonly QuestService _questService;
        private readonly ApplicationDbContext _context;

        public QuestController(QuestService questService, ApplicationDbContext context)
        {
            _questService = questService;
            _context = context;
        }

        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

        public async Task<IActionResult> GetQuest([FromRoute] int id)
        {
            var quest = await _questService.GetQuestAsync(id);
            return Ok(quest);
        }
        [HttpGet("{id}/all")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

        public async Task<IActionResult> GetAllQuests([FromRoute] int id)
        {
            var quest = await _questService.GetAllQuestsAsync(id);
            return Ok(quest);
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

        public async Task<IActionResult> AddQuest([FromBody] QuestDTO quest)
        {
            try
            {
                var questId = await _questService.AddQuestAsync(quest);
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch
            {
                return BadRequest("An error occurred while creating the quest.");
            }
        }

        [HttpPut]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

        public async Task<IActionResult> UpdateQuest([FromBody] QuestDTO quest)
        {
            try
            {
                await _questService.UpdateQuestAsync(quest);
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch
            {
                return BadRequest("An error occurred while updating the quest.");
            }
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

        public async Task<IActionResult> DeleteQuest([FromRoute] int id)
        {
            try
            {
                await _questService.DeleteQuestAsync(id);
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch
            {
                return BadRequest("An error occurred while deleting the quest.");
            }
        }
    }
}
