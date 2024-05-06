using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace API
{
    [Route("api/[controller]")]
    [ApiController]
    public class MonsterController : ControllerBase
    {
        private readonly MonsterService _monsterService;
        private readonly ApplicationDbContext _context;

        public MonsterController(MonsterService monsterService, ApplicationDbContext context)
        {
            _monsterService = monsterService;
            _context = context;

        }

        public class MonsterModel
        {
            public string Name { get; set; }
            public int CampaignId { get; set; }
            public string Type { get; set; }
            public string Alignment { get; set; }
            public int HitPoints { get; set; }
            public int ArmorClass { get; set; }
            public int Speed { get; set; }
            public int Strength { get; set; }
            public int Dexterity { get; set; }
            public int Constitution { get; set; }
            public int Intelligence { get; set; }
            public int Wisdom { get; set; }
            public int Charisma { get; set; }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        public async Task<IActionResult> AddMonster([FromBody] MonsterModel model)
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
                    var monsterId = await _monsterService.AddNewMonsterAsync(model.Name, model.CampaignId, model.Type, model.Alignment, model.HitPoints, model.ArmorClass, model.Speed, model.Strength, model.Dexterity, model.Constitution, model.Intelligence, model.Wisdom, model.Charisma);
                    return Ok(new { message = "Monster added successfully.", id = monsterId });
                }
                catch (ArgumentException ex)
                {
                    return BadRequest(ex.Message);
                }
                catch
                {
                    return BadRequest("An error occurred while adding the monster.");
                }
            }
            else
            {
                return BadRequest("User Not authenticated");
            }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet]
        public async Task<IActionResult> GetMonsters()
        {
            if (User?.Identity?.IsAuthenticated == true)
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                //Auth checking
                if (string.IsNullOrEmpty(userId))
                {
                    return BadRequest("User Not authenticated");
                }

                var monsters = await _monsterService.GetMonstersAsync();
                return Ok(monsters);
            }

            else
            {
                return BadRequest("User Not authenticated");
            }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMonsterByCampaignId([FromRoute] int id)
        {
            if (User?.Identity?.IsAuthenticated == true)
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                //Auth checking
                if (string.IsNullOrEmpty(userId))
                {
                    return BadRequest("User Not authenticated");
                }

                var monster = await _monsterService.GetMonsterByCampaignIdAsync(id);
                return Ok(monster);
            }

            else
            {
                return BadRequest("User Not authenticated");
            }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("select/{id}")]
        public async Task<IActionResult> GetMonsterById([FromRoute] int id)
        {
            if (User?.Identity?.IsAuthenticated == true)
            {
                string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value.ToString();
                //Auth checking
                if (string.IsNullOrEmpty(userId))
                {
                    return BadRequest("User id is null");

                }

                try
                {
                    var monster = await _monsterService.GetMonsterByIdAsync(id, userId);
                    return Ok(monster);
                }
                catch (ArgumentException ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            else
            {
                return BadRequest("User Not authenticated");
            }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut()]
        public async Task<IActionResult> UpdateMonster( [FromBody] Monster model)
        {
            if (User?.Identity?.IsAuthenticated == true)
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                //Auth checking
                if (string.IsNullOrEmpty(userId))
                {
                    return BadRequest("User Not authenticated");
                }
                // Need to check that the monster belongs to the user. 
                //Since I have the user id, I can check if the monster belongs to the user by checking the campaign id of the monster.
                
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState +"model is invalid");
                }

                try
                {
                    await _monsterService.UpdateMonsterAsync(model.Id, model.Name, model.Type, model.Alignment, model.HitPoints, model.ArmorClass, model.Speed, model.Strength, model.Dexterity, model.Constitution, model.Intelligence, model.Wisdom, model.Charisma);
                    return Ok(new { message = "Monster updated successfully." });
                }
                catch (ArgumentException ex)
                {
                    return BadRequest(ex.Message);
                }
                catch
                {
                    return BadRequest("An error occurred while updating the monster.");
                }
            }
            else
            {
                return BadRequest("User Not authenticated");
            }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMonster([FromRoute] int id)
        {
            if (User?.Identity?.IsAuthenticated == true)
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                //Auth checking
                if (string.IsNullOrEmpty(userId))
                {
                    return BadRequest("User Not authenticated");
                }

                try
                {
                    await _monsterService.DeleteMonsterAsync(id, userId);
                    return Ok(new { message = "Monster deleted successfully." });
                }
                catch (ArgumentException ex)
                {
                    return BadRequest(ex.Message);
                }
                catch
                {
                    return BadRequest("An error occurred while deleting the monster.");
                }
            }
            else
            {
                return BadRequest("User Not authenticated");
            }
        }   

    }

}
