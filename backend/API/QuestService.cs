using Microsoft.EntityFrameworkCore;

namespace API
{
    public class QuestService
    {
        private readonly ApplicationDbContext _context;

        public QuestService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Quest>> GetAllQuestsAsync(int campaignId)
        {
            return await _context.Quests.Where(q => q.Campaign.CampaignId == campaignId).ToListAsync();
        }


        public async Task<int> AddQuestAsync(QuestDTO questData)
        {
            

            var quest = new Quest
            {
                Campaign = _context.Campaigns.Find(questData.CampaignId),
                Name = questData.Name,
                Objective = questData.Objective,
                
            };

            _context.Quests.Add(quest);
            await _context.SaveChangesAsync();

            return quest.Id;
        }

        public async Task<Quest> GetQuestAsync(int questId)
        {
            var quest = await _context.Quests.FindAsync(questId);
            if (quest == null)
            {
                throw new ArgumentException("Quest not found.");
            }

            return quest;

        }

        public async Task UpdateQuestAsync(QuestDTO questData)
        {
            var quest = await _context.Quests.FindAsync(questData.Id);
            if (quest == null)
            {
                throw new ArgumentException("Quest not found.");
            }


           

            quest.Name = questData.Name;
            quest.Objective = questData.Objective;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteQuestAsync(int questId)
        {
            var quest = await _context.Quests.FindAsync(questId);
            if (quest == null)
            {
                throw new ArgumentException("Quest not found.");
            }

            _context.Quests.Remove(quest);
            await _context.SaveChangesAsync();
        }

        
    }
}
