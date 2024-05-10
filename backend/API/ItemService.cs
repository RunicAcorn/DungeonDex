using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API
{
  public class ItemService
  {
    private readonly ApplicationDbContext _context;

    public ItemService(ApplicationDbContext context)
    {
      _context = context;
    }

    public async Task<ItemDTO> GetItemAsync(int id)
    {
      var item = await _context.Items.Include(i => i.Campaign).FirstOrDefaultAsync(i => i.Id == id);
      if (item == null)
      {
        throw new ArgumentException("Item not found.");
      }

      var itemDTO = new ItemDTO
      {
        Id = item.Id,
        Name = item.Name,
        Description = item.Description,
        CampaignId = item.Campaign.CampaignId,
        Type = item.GetType().Name
        // Add additional properties as needed
      };

      return itemDTO;
    }

    public async Task<WeaponDTO> GetWeaponByIdAsync(int id)
    {
      var weapon = await _context.Items.OfType<Weapon>().Include(p => p.Campaign).FirstOrDefaultAsync(p => p.Id == id);
      if (weapon == null)
      {
        throw new ArgumentException("Weapon not found.");
      }

      var weaponDTO = new WeaponDTO
      {
        Id = weapon.Id,
        Name = weapon.Name,
        Description = weapon.Description,
        CampaignId = weapon.Campaign.CampaignId,
        DamageDice = weapon.DamageDice
      };

      return weaponDTO;
    }

    public async Task CreateItemAsync(ItemDTO itemDTO)
    {
     
      var item = new Item
      {
        Name = itemDTO.Name,
        Description = itemDTO.Description,
        Campaign = _context.Campaigns.Find(itemDTO.CampaignId)
      };

      _context.Items.Add(item);

      await _context.SaveChangesAsync();

    }



    public async Task<List<ItemDTO>> GetAllItemsAsync(int campaignId)
    {


      var items = await _context.Items.Include(i=> i.Campaign).Where(i => i.Campaign.CampaignId == campaignId).ToListAsync();

      var itemDTOs = items.Select(item => new ItemDTO
      {
        Id = item.Id,
        Name = item.Name,
        Description = item.Description,
        CampaignId = item.Campaign.CampaignId,
        Type = item.GetType().Name
        // Add additional properties as needed
      }).ToList();

      return itemDTOs;

    }

    public async Task<PotionDTO> GetPotionByIdAsync(int id)
    {
      var potion = await _context.Items.OfType<Potion>().Include(p => p.Campaign).FirstOrDefaultAsync(p => p.Id == id);
      if (potion == null)
      {
        throw new ArgumentException("Potion not found.");
      }

      var potionDTO = new PotionDTO
      {
        Id = potion.Id,
        Name = potion.Name,
        Description = potion.Description,
        CampaignId = potion.Campaign.CampaignId,
        Effect = potion.Effect
      };

      return potionDTO;
    }


    public async Task UpdateItemAsync(ItemDTO itemDTO)
        {
            var item = await _context.Items.FindAsync(itemDTO.Id);
            if (item == null)
            {
                throw new ArgumentException("Item not found.");
            }

            item.Name = itemDTO.Name;
            item.Description = itemDTO.Description;
            

            await _context.SaveChangesAsync();
        }

        public async Task UpdatePotionAsync(PotionDTO potionDTO)
        {
           var potion = await _context.Items.OfType<Potion>().FirstOrDefaultAsync(p => p.Id == potionDTO.Id);


           if (potion == null)
            {
              throw new ArgumentException("Potion not found.");
            }

          potion.Name = potionDTO.Name;
          potion.Description = potionDTO.Description;
          potion.Effect = potionDTO.Effect;

          await _context.SaveChangesAsync();
        }

        public async Task UpdateWeaponAsync(WeaponDTO weaponDTO)
        {
          var weapon = await _context.Items.OfType<Weapon>().FirstOrDefaultAsync(p => p.Id == weaponDTO.Id);


          if (weapon == null)
          {
            throw new ArgumentException("Potion not found.");
          }

          weapon.Name = weaponDTO.Name;
          weapon.Description = weaponDTO.Description;
          weapon.DamageDice = weaponDTO.DamageDice;

          await _context.SaveChangesAsync();
        }






    public async Task DeleteItemAsync(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                throw new ArgumentException("Item not found.");
            }

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();
        }

    public async Task CreateWeaponAsync(WeaponDTO weapon)
    {

      var newWeapon = new Weapon
      {
        Campaign = _context.Campaigns.Find(weapon.CampaignId),
        Name = weapon.Name,
        Description = weapon.Description,
        DamageDice = weapon.DamageDice,
      };

      _context.Items.Add(newWeapon);
      await _context.SaveChangesAsync();

    }
    public async Task CreatePotionAsync(PotionDTO potion)
    {
      var newPotion = new Potion
      {
        Campaign = _context.Campaigns.Find(potion.CampaignId),
        Name = potion.Name,
        Description = potion.Description,
        Effect = potion.Effect,
      };

      _context.Items.Add(newPotion);
      await _context.SaveChangesAsync();
    }


    }
}
