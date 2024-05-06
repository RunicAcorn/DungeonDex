using Microsoft.EntityFrameworkCore;

namespace API
{
    public class PlayerService
    {
        private readonly ApplicationDbContext _context;

        public PlayerService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> CreatePlayerAsync(PlayerDTO playerData)
        {


            var player = new Player
            {
                Name = playerData.Name,
                Campaign = await _context.Campaigns.FirstOrDefaultAsync(c => c.CampaignId == playerData.CampaignId),
                CurrentCharacter = null

            };

            _context.Players.Add(player);
            await _context.SaveChangesAsync();

            return player.Id;

        }

        public async Task<List<Player>> GetPlayersAsync(int id)
        {
            return await _context.Players.Where(p => p.Campaign.CampaignId == id).ToListAsync();
           
        }
        public async Task<bool> UpdatePlayerAsync(PlayerDTO player)
        {
            Player playerToUpdate = await _context.Players.FirstOrDefaultAsync(p => p.Id == player.Id);

            if(playerToUpdate == null)
            {
                return false;
            }

            playerToUpdate.Name = player.Name;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeletePlayerAsync(int id)
        {
            Player player = await _context.Players.FirstOrDefaultAsync(p => p.Id == id);

            if(player == null)
            {
                return false;
            }

            _context.Players.Remove(player);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}