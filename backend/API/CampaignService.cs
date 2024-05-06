using Microsoft.EntityFrameworkCore;

namespace API
{
    public class CampaignService
    {
        private readonly ApplicationDbContext _context;

        public CampaignService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> CreateCampaignAsync(CampaignDTO campaignData)
        {


            ApplicationUser creator = _context.ApplicationUsers.Find(campaignData.UserId);

            var campaign = new Campaign
            {
               Name = campaignData.Name,
               Description = campaignData.Description,
               User = creator

            };

            _context.Campaigns.Add(campaign);
            await _context.SaveChangesAsync();

            return campaign.CampaignId;

        }
   
    
        public async Task<List<Campaign>> GetCampaignsAsync(string userId)
        {
            return await _context.Campaigns.ToListAsync();
        }   
    }
}
