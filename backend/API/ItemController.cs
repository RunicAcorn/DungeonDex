using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemController : ControllerBase
    {
        private readonly ItemService _itemService;
        private readonly ApplicationDbContext _context;

        public ItemController(ItemService itemService, ApplicationDbContext context)
        {
            _itemService = itemService;
            _context = context;
        }
        /*
        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

        public async Task<IActionResult> GetItem([FromRoute] int id)
        {
            var item = await _itemService.GetItemAsync(id);
            return Ok(item);
        }
        */
        
        [HttpGet("{id}/all")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

        public async Task<IActionResult> GetAllItems([FromRoute] int id)
        {
            var item = await _itemService.GetAllItemsAsync(id);
            return Ok(item);
        }
        

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

        public async Task<IActionResult> AddItem([FromBody] ItemDTO item)
        {
            try
            {
                await _itemService.CreateItemAsync(item);
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch
            {
                return BadRequest("An error occurred while creating the item.");
            }
        }
        
        [HttpPut]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

        public async Task<IActionResult> UpdateItem([FromBody] ItemDTO item)
        {
            try
            {
                await _itemService.UpdateItemAsync(item);
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch
            {
                return BadRequest("An error occurred while updating the item.");
            }
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

        public async Task<IActionResult> DeleteItem([FromRoute] int id)
        {
            try
            {
                await _itemService.DeleteItemAsync(id);
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch
            {
                return BadRequest("An error occurred while deleting the item.");
            }
        }
        
    }
}
