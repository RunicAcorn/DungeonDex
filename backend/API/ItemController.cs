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
        
        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

        public async Task<IActionResult> GetItem([FromRoute] int id)
        {
            var item = await _itemService.GetItemAsync(id);
            return Ok(item);
        }
        
        
        [HttpGet("{id}/all")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

        public async Task<IActionResult> GetAllItems([FromRoute] int id)
        {
            var item = await _itemService.GetAllItemsAsync(id);
            return Ok(item);
        }

    [HttpGet]
    [Route("potion/{id}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    public async Task<IActionResult> GetPotion([FromRoute] int id)
    {
      var potion = await _itemService.GetPotionByIdAsync(id);
      return Ok(potion);
    }
    [HttpGet]
    [Route("weapon/{id}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    public async Task<IActionResult> GetWeapon([FromRoute] int id)
    {
      var weapon = await _itemService.GetWeaponByIdAsync(id);
      return Ok(weapon);
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
    
    [HttpPost]
    [Route("weapon/add")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    public async Task<IActionResult> AddWeapon([FromBody] WeaponDTO weapon)
    {
      try
      {
        await _itemService.CreateWeaponAsync(weapon);
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
    [HttpPost]
    [Route("potion/add")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    public async Task<IActionResult> AddPotion([FromBody] PotionDTO potion)
    {
      try
      {
        await _itemService.CreatePotionAsync(potion);
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

    [HttpPut]
    [Route("weapon/update")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> UpdateWeapon([FromBody] WeaponDTO weapon)
    {
      try
      {
        await _itemService.UpdateWeaponAsync(weapon);
        return Ok();
      } catch (ArgumentException ex)
      {
        return BadRequest(ex.Message);
      } catch
      {
        return BadRequest("An error occurred while updating the weapon.");
      }
    }
    [HttpPut]
    [Route("potion/update")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> UpdatePotion([FromBody] PotionDTO potion)
    {
      try
      {
        await _itemService.UpdatePotionAsync(potion);
        return Ok();
      }
      catch (ArgumentException ex)
      {
        return BadRequest(ex.Message);
      }
      catch
      {
        return BadRequest("An error occurred while updating the potion.");
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
