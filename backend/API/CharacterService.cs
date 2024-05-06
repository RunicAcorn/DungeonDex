using Microsoft.EntityFrameworkCore;

namespace API
{
    public class CharacterService
    {
        private readonly ApplicationDbContext _context;
        private readonly CharacterService _charServ;

        public CharacterService(ApplicationDbContext context)
        {
            _context = context;
            
        }

        public async Task<Character[]> GetCharactersAsync(int campaignId)
        {
            return await _context.Characters.Where(c => c.Campaign.CampaignId == campaignId).ToArrayAsync();
        }

        public async Task<Character> CreateCharacter(CharacterDTO character)
        {

            bool success = Enum.TryParse(character.Alignment, out Alignment alignmentEnum);
            Character createdCharacer = new()
            {
                Campaign = _context.Campaigns.Find(character.CampaignId),
                Name = character.Name,
                Race = character.Race,
                Class = character.Class,
                Level = character.Level,
                Strength = character.Strength,
                Dexterity = character.Dexterity,
                Constitution = character.Constitution,
                Intelligence = character.Intelligence,
                Wisdom = character.Wisdom,
                Charisma = character.Charisma,
                HitPoints = character.HitPoints,
                Alignment = alignmentEnum
            };
            _context.Characters.Add(createdCharacer);
            await _context.SaveChangesAsync();
            return createdCharacer;
        }

        public async Task<bool> UpdateCharacter(CharacterDTO character)
        {
            character.Alignment = character.Alignment.Replace(" ", "");
            
            bool success = Enum.TryParse(character.Alignment, out Alignment alignmentEnum);
            if(!success)
            {
                return false;
            }

        Character charToUpdate = await _context.Characters.FirstOrDefaultAsync(c => c.Id == character.Id);

            if(charToUpdate == null)
            {
            return false;
            }

            charToUpdate.Name = character.Name;
            charToUpdate.Race = character.Race;
            charToUpdate.Class = character.Class;
            charToUpdate.Level = character.Level;
            charToUpdate.Strength = character.Strength;
            charToUpdate.Dexterity = character.Dexterity;
            charToUpdate.Constitution = character.Constitution;
            charToUpdate.Intelligence = character.Intelligence;
            charToUpdate.Wisdom = character.Wisdom;
            charToUpdate.Charisma = character.Charisma;
            charToUpdate.HitPoints = character.HitPoints;
            charToUpdate.Alignment = alignmentEnum;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteCharacter(int id)
        {
            Character charToDelete = await _context.Characters.FirstOrDefaultAsync(c => c.Id == id);

            if(charToDelete == null)
            {
                return false;
            }

            _context.Characters.Remove(charToDelete);
            await _context.SaveChangesAsync();

            return true;
        }   
    }

}
