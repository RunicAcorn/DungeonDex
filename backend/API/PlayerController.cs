using Microsoft.AspNetCore.Mvc;

namespace API
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayerController : ControllerBase
    {

        private readonly PlayerService _playerService;
        private readonly ApplicationDbContext _context;

        public PlayerController(PlayerService playerService, ApplicationDbContext context)
        {
            _playerService = playerService;
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlayer([FromRoute] int id)
        {
            var player = await _playerService.GetPlayersAsync(id);
            return Ok(player);
        }
       

        [HttpPost]
        public async Task<IActionResult> AddPlayer([FromBody] PlayerDTO player)
        {
            try
            {
                var playerId = await _playerService.CreatePlayerAsync(player);
                return Ok(playerId);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch
            {
                return BadRequest("An error occurred while creating the player.");
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdatePlayer([FromBody] PlayerDTO player)
        {
            try
            {
                await _playerService.UpdatePlayerAsync(player);
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch
            {
                return BadRequest("An error occurred while updating the player.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlayer([FromRoute] int id)
        {
            try
            {
                await _playerService.DeletePlayerAsync(id);
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch
            {
                return BadRequest("An error occurred while deleting the player.");
            }
        }
    }
}
