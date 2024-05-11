using Microsoft.AspNetCore.Mvc;

namespace API
{
    [ApiController]
    [Route("api/[controller]")]
    public class NPCController : ControllerBase
    {
        private readonly NPCService _npcService;
        private readonly ApplicationDbContext _context;

        public NPCController(NPCService npcService, ApplicationDbContext context)
        {
            _npcService = npcService;
            _context = context;
        }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetNPC([FromRoute] int id)
    {
      var npc = await _npcService.GetNPCAsync(id);
      return Ok(npc);
    }

        [HttpGet("all/{id}")]
        public async Task<IActionResult> GetNPCs([FromRoute] int id)
        {
            var npc = await _npcService.GetNPCsAsync(id);
            return Ok(npc);
        }

        [HttpPost]
        
        public async Task<IActionResult> AddNPC([FromBody] NPCDTO npc)
        {
            try
            {
                var npcId = await _npcService.AddNPCAsync(npc);
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch
            {
                return BadRequest("An error occurred while creating the NPC.");
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateNPC([FromBody] NPCDTO npc)
        {
            try
            {
                await _npcService.UpdateNPCAsync(npc);
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch
            {
                return BadRequest("An error occurred while updating the NPC.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNPC([FromRoute] int id)
        {
            try
            {
                await _npcService.DeleteNPCAsync(id);
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch
            {
                return BadRequest("An error occurred while deleting the NPC.");
            }
        }
    }
}
