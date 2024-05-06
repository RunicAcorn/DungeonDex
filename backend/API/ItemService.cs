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
        public async Task CreateItemAsync(ItemDTO itemDTO)
        {
            var item = new Item
            {
                Campaign = _context.Campaigns.Find(itemDTO.CampaignId),
                Name = itemDTO.Name,
                Description = itemDTO.Description
            };
            _context.Items.Add(item);
            await _context.SaveChangesAsync();
          
        }

        public async Task<List<Item>> GetAllItemsAsync(int campaignId)
        {
            return await _context.Items
                .Where(i => i.Campaign.CampaignId == campaignId)
                .ToListAsync();
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


    }
}
