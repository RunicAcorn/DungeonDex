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

        public async Task<int> AddNewMonsterAsync(string name, int campaignId, string type, Alignment alignment, int hitPoints, int armorClass, int speed, int strength, int dexterity, int constitution, int intelligence, int wisdom, int charisma)
        {
           
        
                var monster = new Monster
                {
                    Name = name,
                    Type = type,
                    Campaign = await _context.Campaigns.FirstOrDefaultAsync(c => c.CampaignId == campaignId),
                    Alignment = alignment,
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
     

      
           

        public async Task<List<Monster>> GetMonstersAsync()
        {
            return await _context.Monsters.ToListAsync();
        }

        public async Task<List<Monster>> GetMonsterByCampaignIdAsync(int id)
        {
            return await _context.Monsters.Where(m => m.Campaign.CampaignId == id).ToListAsync();
        }
        public async Task<MonsterDTO> GetMonsterByIdAsync(int id, string userId)
        {

     

         Monster monster = await _context.Monsters.Include(c => c.Campaign).FirstOrDefaultAsync(m => m.Id == id);


         MonsterDTO returnMonster = new MonsterDTO
          {
            Name= monster.Name,
            Type = monster.Type,
            Alignment = monster.Alignment,
            HitPoints = monster.HitPoints,
            ArmorClass = monster.ArmorClass,
            Speed = monster.Speed,
            Strength = monster.Strength,
            Dexterity = monster.Dexterity,
            Constitution = monster.Constitution,
            Intelligence = monster.Intelligence,
            Wisdom = monster.Wisdom,
            Charisma = monster.Charisma,
            CampaignId = monster.Campaign.CampaignId
            };

               return returnMonster;

          }

           
        
        

        public async Task UpdateMonsterAsync(MonsterDTO incomingMonsterData)
        {
            var monster = await _context.Monsters.FirstOrDefaultAsync(m => m.Id == incomingMonsterData.Id);
          
            if (monster == null)
            {
                throw new ArgumentException("Monster not found");
            }

          monster.Name = incomingMonsterData.Name;
          monster.Type = incomingMonsterData.Type;
          monster.Alignment = incomingMonsterData.Alignment;
          monster.HitPoints = incomingMonsterData.HitPoints;
          monster.ArmorClass = incomingMonsterData.ArmorClass;
          monster.Speed = incomingMonsterData.Speed;
          monster.Strength = incomingMonsterData.Strength;
          monster.Dexterity = incomingMonsterData.Dexterity;
          monster.Constitution = incomingMonsterData.Constitution;
          monster.Intelligence = incomingMonsterData.Intelligence;
          monster.Wisdom = incomingMonsterData.Wisdom;
          monster.Charisma = incomingMonsterData.Charisma;

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
