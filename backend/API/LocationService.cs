using Microsoft.EntityFrameworkCore;

namespace API
{
    public class LocationService
    {
        private readonly ApplicationDbContext _context;

        public LocationService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Location>> GetLocations(int campaignId)
        {
            
            return await _context.Locations.Where(l => l.Campaign.CampaignId == campaignId).ToListAsync();
        }

        public async Task<Location> AddLocation(int campaignId, string plane, string name, string description)
        {
            Location locale = new Location { 
                Description = description,
                Name = name, 
                Plane = plane,
                Campaign = await _context.Campaigns.FirstOrDefaultAsync(c => c.CampaignId == campaignId)
            };
            _context.Locations.Add(locale);
            await _context.SaveChangesAsync();
            return locale;
        }
        public async Task UpdateLocation(int id, string plane, string name, string description)
        {
            var location =  _context.Locations
                .Where(l => l.Id == id)
                .FirstOrDefault();


      

            location.Description = description;
            location.Name = name;
            location.Plane = plane;
           
            

            await _context.SaveChangesAsync();
           
        }

        public async Task DeleteLocation(int id)
        {
            var location = await _context.Locations.FirstOrDefaultAsync(l => l.Id == id);
            _context.Locations.Remove(location);
            await _context.SaveChangesAsync();
        }
    }


}
