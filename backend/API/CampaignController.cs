
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
public class CampaignController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly CampaignService _campaignService;

    public CampaignController(ApplicationDbContext context, CampaignService campaignService)
    {
        _context = context;
        _campaignService = campaignService;
    }

    public class CampaignUpdateDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        // Add any other properties you want to update
    }





    [HttpPost]
    public async Task<IActionResult> CreateCampaign([FromBody] CampaignDTO campaign)
    {
     

        if ( campaign == null || string.IsNullOrEmpty(campaign.Name) || string.IsNullOrEmpty(campaign.Description))
        {
          
               
            //TODO: change to switch statement
            if (campaign == null)
                {
                    return BadRequest("Invalid model");
                }
        
                else if (string.IsNullOrEmpty(campaign.Name))
                {
                    return BadRequest("Campaign name is required");
                }
                else if (string.IsNullOrEmpty(campaign.Description))
                {
                    return BadRequest("Campaign description is required");
                }
            
            return BadRequest("Invalid campaign data");
        }

     
        
        var campaignId = await _campaignService.CreateCampaignAsync(campaign);

        return Ok(campaignId);
    }

    public class UserIdDto
    {
        public string UserId { get; set; }
    }

    [HttpPost("Get")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> GetCampaigns([FromBody] UserIdDto userId)
    {

        if (userId == null)
        {
            return BadRequest("User ID claim not found.");
        }

        if (User?.Identity?.IsAuthenticated != true)
        {
            Unauthorized("User is not authenticated.");
        }

        var campaigns = await _campaignService.GetCampaignsAsync(userId.UserId);
        return Ok(campaigns);
       
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCampaign([FromRoute] int id)
    {
  
        try
        {
            var campaign = await _context.Campaigns.FindAsync(id);

            if (campaign == null)
            {
                return NotFound();
            }

            _context.Campaigns.Remove(campaign);
            await _context.SaveChangesAsync();

            return NoContent(); // 204 No Content
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }

    [HttpPut("{id}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> UpdateCampaign([FromRoute] int id, [FromBody] CampaignUpdateDto model)
    {

     


        if (User?.Identity?.IsAuthenticated != true)
        {
            return BadRequest("User not authenticated");
        }

        var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
       


         var campaign = await _context.Campaigns.FindAsync(id);
        if (campaign == null)
        {
            return NotFound();
        }

       
        campaign.Name = model.Name;
        campaign.Description = model.Description;
       
        /* TODO: Rewrite better model validation, this is expecting a chapters object
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        */

        try
        {
            _context.Campaigns.Update(campaign);
            await _context.SaveChangesAsync();
            return Ok(campaign);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }




}
