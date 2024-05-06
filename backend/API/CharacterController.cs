using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore; // Add this using directive
using System.Threading.Tasks;
using API; // Add this using directive



[Route("api/[controller]")]
[ApiController]

 public class CharacterController : ControllerBase
{


    private readonly CharacterService _characterService;
   

    public CharacterController(CharacterService characterService, ApplicationDbContext context)
    {
        _characterService = characterService;
   
    }
    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetCharacters([FromRoute] int id)
    {
        var characters = await _characterService.GetCharactersAsync(id);
        return Ok(characters);
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpPost]
    public async Task<IActionResult> AddCharacter([FromBody] CharacterDTO character)
    {
        string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userId))
        {
            return BadRequest("User Not authenticated");
        }


        try
        {
            var characterId = await _characterService.CreateCharacter(character);
            return Ok(characterId);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch
        {
            return StatusCode(500, "An error occurred while adding the character.");
        }
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpPut]
    public async Task<IActionResult> UpdateCharacter([FromBody] CharacterDTO character)
    {
        string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userId))
        {
            return BadRequest("User Not authenticated");
        }

        if (character == null)
        {
            return BadRequest("Invalid character data");
        }

        try
        {
            bool characterUpdated = await _characterService.UpdateCharacter(character);
            if (characterUpdated)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch
        {
            return StatusCode(500, "An error occurred while updating the character.");
        }
    }


    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCharacter([FromRoute] int id)
    {
        string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userId))
        {
            return BadRequest("User Not authenticated");
        }

        try
        {
            bool characterDeleted = await _characterService.DeleteCharacter(id);
            if (characterDeleted)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch
        {
            return StatusCode(500, "An error occurred while deleting the character.");
        }
    }
}
    
    

