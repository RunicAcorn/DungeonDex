using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API
{
  public class ItemService
  {
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public ItemService(ApplicationDbContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }
    public async Task CreateItemAsync(ItemDTO itemDTO)
    {
      // Map from ItemDTO to Item
      var item = _mapper.Map<Item>(itemDTO);

      //TODO: This is a hack to get the campaign. We should use a resolver.
      item.Campaign = await _context.Campaigns.FindAsync(itemDTO.CampaignId);

      _context.Items.Add(item);

      await _context.SaveChangesAsync();

    }
  
        

    public async Task<List<ItemDTO>> GetAllItemsAsync(int campaignId)
    {
      var items = await _context.Items
          .Where(i => i.Campaign.CampaignId == campaignId)
          .ToListAsync();

      var itemDTOs = _mapper.Map<List<ItemDTO>>(items);

      return itemDTOs;
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
