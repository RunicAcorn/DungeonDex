using Microsoft.EntityFrameworkCore;

namespace API
{
    public class MonsterService
    {
        private readonly ApplicationDbContext _context;

        public MonsterService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> AddNewMonsterAsync(string name, int campaignId, string type, string alignment, int hitPoints, int armorClass, int speed, int strength, int dexterity, int constitution, int intelligence, int wisdom, int charisma)
        {
            alignment = alignment.Replace(" ", "").Trim();
            bool success = Enum.TryParse(alignment, out Alignment alignmentEnum);
            if (success) 
            {
                var monster = new Monster
                {
                    Name = name,
                    Type = type,
                    Campaign = await _context.Campaigns.FirstOrDefaultAsync(c => c.CampaignId == campaignId),
                    Alignment = alignmentEnum,
                    HitPoints = hitPoints,
                    ArmorClass = armorClass,
                    Speed = speed,
                    Strength = strength,
                    Dexterity = dexterity,
                    Constitution = constitution,
                    Intelligence = intelligence,
                    Wisdom = wisdom,
                    Charisma = charisma
                };

                _context.Monsters.Add(monster);
                await _context.SaveChangesAsync();

                return monster.Id;

            }
            else
            {
                return -1;
            }


      
        }   

        public async Task<List<Monster>> GetMonstersAsync()
        {
            return await _context.Monsters.ToListAsync();
        }

        public async Task<List<Monster>> GetMonsterByCampaignIdAsync(int id)
        {
            return await _context.Monsters.Where(m => m.Campaign.CampaignId == id).ToListAsync();
        }
        public async Task<List<Monster>> GetMonsterByIdAsync(int id, string userId)
        {

            var camp = await _context.Campaigns.FirstOrDefaultAsync(c => c.User.Id == userId);
            var campaignId = camp.CampaignId;

            return await _context.Monsters.Where(m => m.Campaign.CampaignId == campaignId && m.Id == id).ToListAsync();

           
        }
        

        public async Task UpdateMonsterAsync(int id, string name, string type, Alignment alignment, int hitPoints, int armorClass, int speed, int strength, int dexterity, int constitution, int intelligence, int wisdom, int charisma)
        {
            var monster = await _context.Monsters.FirstOrDefaultAsync(m => m.Id == id);
          
            if (monster == null)
            {
                throw new ArgumentException("Monster not found");
            }

            monster.Name = name;
            monster.Type = type;
            monster.Alignment = alignment;
            monster.HitPoints = hitPoints;
            monster.ArmorClass = armorClass;
            monster.Speed = speed;
            monster.Strength = strength;
            monster.Dexterity = dexterity;
            monster.Constitution = constitution;
            monster.Intelligence = intelligence;
            monster.Wisdom = wisdom;
            monster.Charisma = charisma;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteMonsterAsync(int incomingMonsterId, string userId)
        {
            var monster = await _context.Monsters.FirstOrDefaultAsync(m => m.Id == incomingMonsterId);

            if (monster == null)
            {
                throw new ArgumentException("Monster not found");
            }

            _context.Monsters.Remove(monster);
            await _context.SaveChangesAsync();
        }

    }
}
